import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Crimson_Text } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "Geministics - Writing Page",
  description: "Personal writing space by Kaustubh Mishra",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${crimson.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
