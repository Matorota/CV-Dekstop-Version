// Updated to test the latest deployment
const API_URL = "https://backend-9bbxaljia-matorotas-projects.vercel.app";

async function testAPI() {
  try {
    console.log("Testing latest deployment...");
    console.log("API URL:", API_URL);

    // Test hello endpoint first
    console.log("\n1. Testing hello endpoint...");
    const helloResponse = await fetch(`${API_URL}/api/hello`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Hello status:", helloResponse.status);
    console.log("Hello headers:", [...helloResponse.headers.entries()]);

    if (!helloResponse.ok) {
      const errorText = await helloResponse.text();
      console.error("Hello endpoint failed:");
      console.error("Response:", errorText.substring(0, 500));

      if (errorText.includes("Authentication Required")) {
        console.error("\n🔒 DEPLOYMENT PROTECTION IS STILL ENABLED!");
        console.error("Please disable it in Vercel Dashboard");
        return;
      }
      return;
    }

    // Check content type to see if we got JSON or HTML
    const contentType = helloResponse.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (contentType && contentType.includes("application/json")) {
      try {
        const helloData = await helloResponse.json();
        console.log("Hello response:", helloData);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError.message);
        return;
      }
    } else {
      // If it's HTML, it means we're hitting a static file or error page
      const text = await helloResponse.text();
      console.log(
        "Got HTML response instead of JSON. This suggests the endpoint doesn't exist."
      );
      console.log("Response preview:", text.substring(0, 200) + "...");
      return;
    }

    // Test health check
    console.log("\n2. Testing health check...");
    const healthResponse = await fetch(`${API_URL}/api/check`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Health check status:", healthResponse.status);

    if (!healthResponse.ok) {
      const errorText = await healthResponse.text();
      console.error("Health check failed:", errorText.substring(0, 200));
      return;
    }

    const healthContentType = healthResponse.headers.get("content-type");
    if (healthContentType && healthContentType.includes("application/json")) {
      const healthData = await healthResponse.json();
      console.log("Health check result:", healthData);
    } else {
      console.log("Health check returned non-JSON response");
      return;
    }

    // Test OPTIONS preflight
    console.log("\n3. Testing OPTIONS preflight...");
    const optionsResponse = await fetch(`${API_URL}/api/send-email`, {
      method: "OPTIONS",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
        Origin: "https://cv-dekstop-version.vercel.app",
      },
    });

    console.log("OPTIONS status:", optionsResponse.status);
    console.log("CORS headers:", [...optionsResponse.headers.entries()]);

    // Test email sending
    console.log("\n4. Testing email sending...");
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

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Email error:", errorText.substring(0, 300));
      return;
    }

    const emailContentType = emailResponse.headers.get("content-type");
    if (emailContentType && emailContentType.includes("application/json")) {
      const emailData = await emailResponse.json();
      console.log("Email test result:", emailData);
    } else {
      console.log("Email endpoint returned non-JSON response");
      return;
    }

    console.log("\n✅ All tests passed!");
  } catch (error) {
    console.error("Test failed:", error.message);
    console.error("Stack:", error.stack);
  }
}

testAPI();
