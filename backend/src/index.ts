import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow all origins for simplicity
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set in environment variables");
}
const resend = new Resend(resendApiKey);

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    const result = await resend.emails.send({
      from: "CV Contact <onboarding@resend.dev>",
      to: ["matasmatasp@gmail.com"],
      subject: `CV Contact from ${name}`,
      html: `<div>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>`,
      text: `From: ${name} <${email}>\n\n${message}`,
      reply_to: email,
    });

    if (result && result.error) {
      console.error("Email send error:", result.error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/api/hello", async (_req, res) => {
  try {
    return res.json({ message: "Hello from TypeScript backend!" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
