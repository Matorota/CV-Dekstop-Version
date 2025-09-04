import { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers immediately
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");

  console.log(`${req.method} ${req.url}`);
  console.log("Request body:", req.body);

  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight");
    return res.status(200).end();
  }

  try {
    const { method } = req;

    const path = req.url?.split("?")[0] || "";
    console.log("Processing path:", path);

    if ((path === "/api/check" || path === "/check") && method === "GET") {
      console.log("Health check endpoint hit");

      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
        return res.status(200).json({
          ok: true,
          message: "Email service is ready",
          timestamp: new Date().toISOString(),
          config: {
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPass: !!process.env.EMAIL_PASS,
            emailUser: process.env.EMAIL_USER
              ? process.env.EMAIL_USER.substring(0, 3) + "***"
              : "not set",
          },
        });
      } catch (verifyError) {
        console.log("Email transporter verification failed:", verifyError);
        return res.status(500).json({
          ok: false,
          message: "Email service configuration error",
          error:
            verifyError instanceof Error
              ? verifyError.message
              : String(verifyError),
        });
      }
    }

    // Send email endpoint - handle both /api/send-email and /send-email
    if (
      (path === "/api/send-email" || path === "/send-email") &&
      method === "POST"
    ) {
      console.log("Email send request received");
      console.log("Request body:", req.body);

      const { name, email, message } = req.body;

      // Validate required fields
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        console.log("Validation failed: Missing required fields");
        return res.status(400).json({
          success: false,
          error:
            "Missing required fields: name, email, and message are required",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("Validation failed: Invalid email format");
        return res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
      }

      console.log("Validation passed, preparing email");

      const mailOptions = {
        from: `"CV Contact Form" <${process.env.EMAIL_USER}>`,
        to: "matasmatasp@gmail.com",
        replyTo: email,
        subject: `CV Contact from ${name}`,
        text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">New Contact Form Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Sent at: ${new Date().toISOString()}<br>
              From: CV Contact Form
            </p>
          </div>
        `,
      };

      try {
        console.log("Attempting to send email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);

        return res.status(200).json({
          success: true,
          messageId: info.messageId,
          message: "Email sent successfully!",
          timestamp: new Date().toISOString(),
        });
      } catch (emailError) {
        console.log("Email sending failed:", emailError);
        return res.status(500).json({
          success: false,
          error: "Failed to send email",
          details:
            emailError instanceof Error
              ? emailError.message
              : String(emailError),
          timestamp: new Date().toISOString(),
        });
      }
    }

    console.log("Endpoint not found for path:", path);
    return res.status(404).json({
      success: false,
      error: "Endpoint not found",
      path: path,
      availableEndpoints: ["GET /api/check", "POST /api/send-email"],
    });
  } catch (error) {
    console.log("Unhandled API error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
  }
}
