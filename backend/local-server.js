const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

console.log("Environment variables loaded:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set");
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "Set (length: " + process.env.EMAIL_PASS.length + ")"
    : "Not set"
);

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

// Test the transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email configuration error:", error);
    console.log("Please check your Gmail app password");
  } else {
    console.log("Email transporter is ready");
  }
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/check", (req, res) => {
  res.status(200).json({ ok: true, message: "Email service is ready" });
});

app.post("/api/send-email", async (req, res) => {
  try {
    console.log("Received email request:", req.body);
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Email service configured for: ${process.env.EMAIL_USER}`);
});
