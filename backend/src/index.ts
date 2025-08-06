import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Add more detailed CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Debug middleware to log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  console.log("Request body:", req.body);
  next();
});

// Create email transporter
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

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Health check endpoint
app.get("/check", (req: Request, res: Response) => {
  res.json({ ok: true, message: "Email service is ready" });
});

// Email sending endpoint - Fixed typing
app.post("/send-email", (req: Request, res: Response) => {
  const handleEmail = async () => {
    try {
      console.log("Received email request:", req.body);
      const { name, email, message } = req.body;

      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: "Missing required fields" });
      }

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
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);

      return res.json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("Failed to send email:", error);
      return res.status(500).json({
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  };

  handleEmail().catch((error) => {
    console.error("Unhandled error:", error);
    res.status(500).json({ error: "Internal server error" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Email service configured for: ${process.env.EMAIL_USER}`);
});
