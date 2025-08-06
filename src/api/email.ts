export interface EmailForm {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(form: EmailForm) {
  try {
    console.log("Sending email:", form);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("Email API Error:", error);
    throw error;
  }
}

export async function checkEmailService() {
  try {
    const res = await fetch("/api/check");
    console.log("Check service status:", res.status);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Email service check failed");
    }

    return data;
  } catch (error) {
    console.error("Check API Error:", error);
    throw error;
  }
}
