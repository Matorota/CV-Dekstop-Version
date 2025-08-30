const API_BASE = "https://backend-9bbxaljia-matorotas-projects.vercel.app";

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

const log = (message: string, data?: any) => {
  console.log(`[EMAIL-API] ${message}`, data || "");
};

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    log("Starting email send request", data);

    const url = `${API_BASE}/api/send-email`;
    log("Making request to:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    log("Response received:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        log("Error response data:", errorData);
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        log("Failed to parse error response");
        const errorText = await response.text();
        log("Error response text:", errorText);
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    log("Success response:", result);
    return result;
  } catch (error) {
    log("Email send failed with error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const checkEmailService = async (): Promise<boolean> => {
  try {
    log("Checking email service health");

    const response = await fetch(`${API_BASE}/api/check`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    log("Health check response:", {
      status: response.status,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      log("Health check failed with status:", response.status);
      return false;
    }

    const result = await response.json();
    log("Health check result:", result);
    return result.ok === true;
  } catch (error) {
    log("Health check failed with error:", error);
    return false;
  }
};
