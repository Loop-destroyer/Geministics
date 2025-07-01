// Email service configuration for production use

export interface EmailConfig {
  to: string
  subject: string
  text: string
  html?: string
}

export class EmailService {
  private static instance: EmailService
  private apiKey: string | undefined

  private constructor() {
    this.apiKey = process.env.EMAIL_API_KEY
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(config: EmailConfig): Promise<boolean> {
    try {
      // Example implementation with Resend
      if (process.env.RESEND_API_KEY) {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "feedback@geministics.com",
            to: config.to,
            subject: config.subject,
            text: config.text,
            html: config.html,
          }),
        })

        return response.ok
      }

      // Example implementation with SendGrid
      if (process.env.SENDGRID_API_KEY) {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: config.to }],
                subject: config.subject,
              },
            ],
            from: { email: "feedback@geministics.com" },
            content: [
              {
                type: "text/plain",
                value: config.text,
              },
              ...(config.html
                ? [
                    {
                      type: "text/html",
                      value: config.html,
                    },
                  ]
                : []),
            ],
          }),
        })

        return response.ok
      }

      // Fallback: log to console (development)
      console.log("📧 Email would be sent:", config)
      return true
    } catch (error) {
      console.error("Email sending failed:", error)
      return false
    }
  }

  async sendFeedback(feedback: string, userEmail?: string): Promise<boolean> {
    const timestamp = new Date().toLocaleString()

    const emailConfig: EmailConfig = {
      to: "Kaustubhmishra05@yahoo.com",
      subject: "New Feedback from Geministics Website",
      text: `
New feedback received from Geministics website:

Timestamp: ${timestamp}
User Email: ${userEmail || "Not provided"}

Feedback:
${feedback}

---
Sent from Geministics Website Feedback Form
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Feedback from Geministics</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>User Email:</strong> ${userEmail || "Not provided"}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="margin-top: 0;">Feedback:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${feedback}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Sent from Geministics Website Feedback Form
          </p>
        </div>
      `,
    }

    return this.sendEmail(emailConfig)
  }
}
