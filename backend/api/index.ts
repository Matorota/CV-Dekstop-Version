import { VercelRequest, VercelResponse } from '@vercel/node';
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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.url === '/api/check' && req.method === 'GET') {
      return res.status(200).json({ ok: true, message: "Email service is ready" });
    }

    if (req.url === '/api/send-email' && req.method === 'POST') {
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

      return res.status(200).json({ success: true, messageId: info.messageId });
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
