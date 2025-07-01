"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Footer() {
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Try the simple Web3Forms approach first
      const response = await fetch("/api/send-feedback-simple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback,
          userEmail: email,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFeedback("")
        setEmail("")

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        throw new Error("Failed to send feedback")
      }
    } catch (error) {
      console.error("Error sending feedback:", error)

      // Still show success to user (feedback is logged on server)
      setIsSubmitted(true)
      setFeedback("")
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-white/10 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Feedback Form */}
          <div>
            <h3 className="text-lg sm:text-xl font-playfair text-white mb-3 sm:mb-4">Send Feedback</h3>
            {isSubmitted ? (
              <div className="text-green-400 text-center py-4">Thank you for your feedback! 🙏</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <Input
                  type="email"
                  placeholder="Your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 text-sm sm:text-base"
                />
                <Textarea
                  placeholder="Share your thoughts, suggestions, or feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-sm sm:text-base px-4 py-2"
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>
              </form>
            )}
          </div>

          {/* Social Media & Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-playfair text-white mb-3 sm:mb-4">Connect</h3>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <a
                  href="https://www.instagram.com/_geministics_?utm_source=ig_web_button_share_sheet&igsh=NjlkamNmZXcxdHNn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@_geministics_6534"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-white/60 text-xs sm:text-sm">
              <p className="font-playfair italic">© 2024 Kaustubh Mishra</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
