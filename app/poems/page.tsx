"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { ContentBlock } from "@/components/content-block"
import { ContentModal } from "@/components/content-modal"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { contentStore, type ContentItem } from "@/lib/content-store"

export default function PoemsPage() {
  const [poems, setPoems] = useState<ContentItem[]>([])
  const [selectedPoem, setSelectedPoem] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = contentStore.subscribe(() => {
      setPoems(contentStore.getByType("poem"))
    })
    setPoems(contentStore.getByType("poem"))
    return unsubscribe
  }, [])

  const handlePoemClick = (poem: ContentItem) => {
    setSelectedPoem(poem)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPoem(null), 300) // Delay to allow exit animation
  }

  return (
    <div className="min-h-screen bg-[#1a0933] relative overflow-hidden">
      {/* Large gradient blob matching the reference image */}
      <div className="absolute inset-0 z-0">
        {/* Main orange-pink gradient blob */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[600px] rounded-[40%] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 opacity-80 blur-3xl transform rotate-12 animate-pulse-slow"></div>

        {/* Secondary smaller blob for depth */}
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] rounded-[50%] bg-gradient-to-br from-pink-400 to-orange-500 opacity-40 blur-2xl animate-float"></div>

        {/* Subtle accent blob */}
        <div className="absolute top-2/3 right-1/3 w-[300px] h-[200px] rounded-[60%] bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-xl animate-float-delay"></div>
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
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl font-playfair font-light text-white mb-4">Poems</h1>
            <p className="text-xl md:text-2xl text-white/80 font-light">Kaustubh Mishra</p>
          </motion.div>

          {/* Poems */}
          <div className="space-y-16">
            {poems.map((poem, index) => (
              <ContentBlock
                key={poem.id}
                item={poem}
                index={index}
                showTitle={true}
                onClick={() => handlePoemClick(poem)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <ContentModal item={selectedPoem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
