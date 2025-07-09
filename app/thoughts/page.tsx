"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { ContentBlock } from "@/components/content-block"
import { ContentModal } from "@/components/content-modal"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { contentStore, type ContentItem } from "@/lib/content-store"

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<ContentItem[]>([])
  const [selectedThought, setSelectedThought] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = contentStore.subscribe(() => {
      setThoughts(contentStore.getByType("thought"))
    })
    setThoughts(contentStore.getByType("thought"))
    return unsubscribe
  }, [])

  const handleThoughtClick = (thought: ContentItem) => {
    setSelectedThought(thought)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedThought(null), 300) // Delay to allow exit animation
  }

  return (
    <div className="min-h-screen bg-[#1a0933] relative overflow-hidden">
      {/* Large gradient blob matching the reference image */}
      <div className="absolute inset-0 z-0">
        {/* Main cream/yellow gradient blob */}
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[500px] rounded-[45%] bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-300 opacity-70 blur-3xl transform -rotate-12 animate-pulse-slow"></div>

        {/* Secondary purple accent */}
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] rounded-[50%] bg-gradient-to-br from-purple-600 to-purple-800 opacity-30 blur-2xl animate-float"></div>

        {/* Small accent blob */}
        <div className="absolute top-1/2 left-1/4 w-[250px] h-[200px] rounded-[60%] bg-gradient-to-br from-pink-300 to-purple-400 opacity-20 blur-xl animate-float-delay"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Back button */}
        <motion.div
          className="absolute top-8 left-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </motion.div>

        {/* Admin button */}
        <motion.div
          className="absolute top-8 right-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/admin" className="text-white/50 hover:text-white/80 transition-colors text-sm">
            Admin
          </Link>
        </motion.div>

        <main className="flex-1 px-8 py-20">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl font-playfair font-light text-white mb-4">Thoughts</h1>
            <p className="text-xl md:text-2xl text-white/80 font-light">Kaustubh Mishra</p>
          </motion.div>

          {/* Thoughts */}
          <div className="max-w-4xl mx-auto space-y-16">
            {thoughts.map((thought, index) => (
              <ContentBlock
                key={thought.id}
                item={thought}
                index={index}
                showTitle={false}
                onClick={() => handleThoughtClick(thought)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <ContentModal item={selectedThought} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
