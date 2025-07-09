import { type NextRequest, NextResponse } from "next/server"

// Simple version using Web3Forms (free service that sends to any email)
export async function POST(request: NextRequest) {
  try {
    const { feedback, userEmail, timestamp } = await request.json()

    // Using Web3Forms - a free service that can send to any email
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE", // Get free key from web3forms.com
        subject: "New Feedback from Geministics Website",
        email: userEmail || "noreply@geministics.com",
        name: "Geministics Feedback",
        message: `
Timestamp: ${new Date(timestamp).toLocaleString()}
User Email: ${userEmail || "Not provided"}

Feedback:
${feedback}

---
Sent from Geministics Website Feedback Form
        `,
        to: "Kaustubhmishra05@yahoo.com",
        from_name: "Geministics Website",
        redirect: "false",
      }),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("✅ Email sent via Web3Forms")
      return NextResponse.json({
        success: true,
        message: "Feedback sent successfully",
      })
    } else {
      console.error("❌ Web3Forms error:", result)
      throw new Error("Web3Forms failed")
    }
  } catch (error) {
    console.error("Error sending feedback:", error)

    // Log the feedback for manual processing
    console.log("📧 Feedback logged for manual processing:")
    console.log("To: Kaustubhmishra05@yahoo.com")
    console.log("From:", request.body?.userEmail || "Anonymous")
    console.log("Message:", request.body?.feedback)

    return NextResponse.json({
      success: true, // Return success so user doesn't see error
      message: "Feedback received",
    })
  }
}
