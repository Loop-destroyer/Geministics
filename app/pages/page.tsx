"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { ContentBlock } from "@/components/content-block"
import { ContentModal } from "@/components/content-modal"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { contentStore, type ContentItem } from "@/lib/content-store"

export default function PagesPage() {
  const [pages, setPages] = useState<ContentItem[]>([])
  const [selectedPage, setSelectedPage] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = contentStore.subscribe(() => {
      setPages(contentStore.getByType("page"))
    })
    setPages(contentStore.getByType("page"))
    return unsubscribe
  }, [])

  const handlePageClick = (page: ContentItem) => {
    setSelectedPage(page)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPage(null), 300) // Delay to allow exit animation
  }

  return (
    <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      {/* Unique gradient for pages - more muted/professional */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-[50%] bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 opacity-40 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[350px] rounded-[40%] bg-gradient-to-br from-gray-600 to-slate-600 opacity-30 blur-2xl animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-[300px] h-[250px] rounded-[60%] bg-gradient-to-br from-slate-500 to-gray-700 opacity-20 blur-xl animate-float-delay"></div>
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
            <h1 className="text-6xl md:text-8xl font-playfair font-light text-white mb-4">Pages</h1>
            <p className="text-xl md:text-2xl text-white/80 font-light">Kaustubh Mishra</p>
          </motion.div>

          {/* Pages Content */}
          {pages.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-16">
              {pages.map((page, index) => (
                <ContentBlock
                  key={page.id}
                  item={page}
                  index={index}
                  showTitle={false}
                  onClick={() => handlePageClick(page)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.p
                className="text-2xl md:text-3xl text-white/60 font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Coming Soon
              </motion.p>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <ContentModal item={selectedPage} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
