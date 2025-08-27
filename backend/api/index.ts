import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

// Enhanced logging function
const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

// Create transporter with detailed logging
const createTransporter = () => {
  log('Creating email transporter with config:', {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    hasUser: !!process.env.EMAIL_USER,
    hasPass: !!process.env.EMAIL_PASS,
    passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
  });

  return nodemailer.createTransport({
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
    debug: true, // Enable debug mode
    logger: true, // Enable logging
  });
};

const transporter = createTransporter();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log incoming request
  log('Incoming request:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    headers: req.headers
  });

  // Enhanced CORS configuration - Allow your specific domains
  const allowedOrigins = [
    'https://cv-dekstop-version.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173'
  ];

  const origin = req.headers.origin;
  log('Request origin:', origin);
  log('Allowed origins:', allowedOrigins);

  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    log('CORS: Origin allowed', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    log('CORS: Using wildcard origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    log('Handling OPTIONS preflight request');
    res.status(200).end();
    return;
  }

  try {
    const { method, url } = req;
    log('Processing request:', { method, url });

    // Health check endpoint
    if (url === '/api/check' && method === 'GET') {
      log('Health check requested');
      
      // Test email configuration
      try {
        await transporter.verify();
        log('Email transporter verified successfully');
        return res.status(200).json({ 
          ok: true, 
          message: "Email service is ready",
          timestamp: new Date().toISOString(),
          config: {
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPass: !!process.env.EMAIL_PASS,
            emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '***' : 'not set'
          }
        });
      } catch (verifyError) {
        log('Email transporter verification failed:', verifyError);
        return res.status(500).json({ 
          ok: false, 
          message: "Email service configuration error",
          error: verifyError instanceof Error ? verifyError.message : String(verifyError)
        });
      }
    }

    // Send email endpoint
    if (url === '/api/send-email' && method === 'POST') {
      log('Email send request received');
      log('Request body:', req.body);

      const { name, email, message } = req.body;

      // Validate required fields
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        log('Validation failed: Missing required fields', { name: !!name, email: !!email, message: !!message });
        return res.status(400).json({ 
          success: false,
          error: "Missing required fields: name, email, and message are required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        log('Validation failed: Invalid email format', email);
        return res.status(400).json({ 
          success: false,
          error: "Invalid email format" 
        });
      }

      log('Validation passed, preparing email');

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

      log('Mail options prepared:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        replyTo: mailOptions.replyTo
      });

      try {
        log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        log('Email sent successfully:', {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response
        });

        return res.status(200).json({ 
          success: true, 
          messageId: info.messageId,
          message: "Email sent successfully!",
          timestamp: new Date().toISOString()
        });
      } catch (emailError) {
        log('Email sending failed:', {
          error: emailError instanceof Error ? emailError.message : String(emailError),
          stack: emailError instanceof Error ? emailError.stack : undefined
        });

        return res.status(500).json({
          success: false,
          error: "Failed to send email",
          details: emailError instanceof Error ? emailError.message : String(emailError),
          timestamp: new Date().toISOString()
        });
      }
    }

    log('Endpoint not found:', { method, url });
    return res.status(404).json({ 
      success: false,
      error: "Endpoint not found",
      availableEndpoints: [
        'GET /api/check',
        'POST /api/send-email'
      ]
    });

  } catch (error) {
    log('Unhandled API error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    });
  }
}
