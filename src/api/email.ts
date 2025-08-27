// Replace with your actual Vercel backend URL from deployment output
const API_BASE = "https://backend-4tiqzvp9v-matorotas-projects.vercel.app";

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const checkEmailService = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/api/check`);
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error("Email service check failed:", error);
    return false;
  }
};
