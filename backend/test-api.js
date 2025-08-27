const API_URL = "https://backend-ft7yhcnn1-matorotas-projects.vercel.app";

async function testAPI() {
  try {
    console.log("Testing health check...");

    const response = await fetch(`${API_URL}/api/check`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    if (!response.ok) {
      console.error("Health check failed:", response.status);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return;
    }

    const healthData = await response.json();
    console.log("Health check result:", healthData);

    // Test OPTIONS request first
    console.log("\nTesting OPTIONS preflight...");
    const optionsResponse = await fetch(`${API_URL}/api/send-email`, {
      method: "OPTIONS",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
        Origin: "https://cv-dekstop-version.vercel.app",
      },
    });

    console.log("OPTIONS status:", optionsResponse.status);
    console.log("OPTIONS headers:", [...optionsResponse.headers.entries()]);

    // Test actual email request
    console.log("\nTesting email sending...");
    const emailResponse = await fetch(`${API_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://cv-dekstop-version.vercel.app",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message from the API test script.",
      }),
    });

    console.log("Email response status:", emailResponse.status);
    console.log("Email response headers:", [
      ...emailResponse.headers.entries(),
    ]);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Email error response:", errorText);
      return;
    }

    const emailData = await emailResponse.json();
    console.log("Email test result:", emailData);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testAPI();
