"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ContentItem } from "@/lib/content-store"

interface ContentModalProps {
  item: ContentItem | null
  isOpen: boolean
  onClose: () => void
}

export function ContentModal({ item, isOpen, onClose }: ContentModalProps) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/30">
                    <span className="text-purple-300 text-sm font-medium capitalize">{item.type}</span>
                  </div>
                  <span className="text-white/60 text-sm">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h1>
              </div>

              {/* Image */}
              {item.image && (
                <div className="mb-8">
                  <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-white/90 text-lg sm:text-xl leading-relaxed font-crimson whitespace-pre-line">
                  {item.content}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">
                    <p className="font-playfair italic">© 2024 Kaustubh Mishra</p>
                  </div>
                  <div className="text-white/40 text-sm">{item.content.length} characters</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
