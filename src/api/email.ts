// Use proxy in development, direct URL in production
const API_BASE = import.meta.env.DEV
  ? ""
  : "https://backend-4tiqzvp9v-matorotas-projects.vercel.app";

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  message?: string;
  error?: string;
  details?: string;
  timestamp?: string;
}

// Enhanced logging function
const log = (message: string, data?: any) => {
  console.log(`[EMAIL-API] ${message}`, data || "");
};

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    log("Starting email send request", data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors" as RequestMode,
    };

    log("Request options:", {
      method: requestOptions.method,
      headers: requestOptions.headers,
      mode: requestOptions.mode,
      bodyLength: requestOptions.body.length,
    });

    const url = `${API_BASE}/api/send-email`;
    log("Making request to:", url);

    const response = await fetch(url, requestOptions);

    log("Response received:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let errorDetails = "";

      try {
        const errorData = await response.json();
        log("Error response data:", errorData);
        errorMessage = errorData.error || errorMessage;
        errorDetails = errorData.details || "";
      } catch (parseError) {
        log("Failed to parse error response as JSON, trying text");
        try {
          const responseText = await response.text();
          log("Error response text:", responseText);
          errorDetails = responseText;
        } catch (textError) {
          log("Failed to parse error response as text:", textError);
        }
      }

      throw new Error(
        `${errorMessage}${errorDetails ? ` - ${errorDetails}` : ""}`
      );
    }

    const result = await response.json();
    log("Success response:", result);
    return result;
  } catch (error) {
    log("Email send failed with error:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString(),
    };
  }
};

export const checkEmailService = async (): Promise<boolean> => {
  try {
    log("Checking email service health");

    const url = `${API_BASE}/api/check`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors" as RequestMode,
    });

    log("Health check response:", {
      status: response.status,
      ok: response.ok,
    });

    if (!response.ok) {
      log("Health check failed with status:", response.status);
      return false;
    }

    const result = await response.json();
    log("Health check result:", result);
    return result.ok === true;
  } catch (error) {
    log("Health check failed with error:", {
      message: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
};
