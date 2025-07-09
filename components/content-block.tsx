"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ContentItem } from "@/lib/content-store"

interface ContentBlockProps {
  item: ContentItem
  index: number
  showTitle?: boolean
  onClick?: () => void
}

export function ContentBlock({ item, index, showTitle = true, onClick }: ContentBlockProps) {
  return (
    <motion.div
      className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
    >
      {/* Title Section */}
      {showTitle && (
        <div className="lg:col-span-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light text-white/90 mb-4 leading-tight">
            {item.title}
          </h2>
          <p className="text-white/60 text-sm mb-4">{new Date(item.date).toLocaleDateString()}</p>
        </div>
      )}

      {/* Content Section */}
      <div className={showTitle ? "lg:col-span-2" : "lg:col-span-3"}>
        <motion.div
          className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={onClick}
        >
          {/* Click indicator */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </div>
          </div>

          {/* Image Section */}
          {item.image && item.image.trim() !== "" ? (
            <div className="relative h-48 sm:h-56 lg:h-64 w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.currentTarget.style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Overlay content indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white/90 text-sm font-medium capitalize">{item.type}</p>
                  <p className="text-white/70 text-xs">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            // Placeholder when no image
            <div className="h-48 sm:h-56 lg:h-64 w-full bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-800/30 flex items-center justify-center group-hover:from-purple-900/40 group-hover:via-pink-900/30 group-hover:to-purple-800/40 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  {item.type === "poem" && (
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  )}
                  {item.type === "thought" && (
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  )}
                  {item.type === "page" && (
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-white/40 text-sm font-light group-hover:text-white/60 transition-colors duration-300">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
              </div>
            </div>
          )}

          {/* Text Content Preview */}
          <div className="p-6 lg:p-8">
            {!showTitle && (
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-white mb-2 tracking-wider">
                  {item.title.toUpperCase()}
                </h2>
                <p className="text-white/60 text-sm">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            )}
            <div className="text-white/90 text-base lg:text-lg leading-relaxed font-crimson">
              {/* Show preview of content */}
              <div className="line-clamp-4 group-hover:text-white transition-colors duration-300">
                {item.content.length > 200 ? `${item.content.substring(0, 200)}...` : item.content}
              </div>
              {item.content.length > 200 && (
                <div className="mt-4 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors duration-300">
                  Click to read more →
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
