"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Main gradient background matching the reference image */}
      <div className="absolute inset-0 z-0">
        {/* Dark to purple gradient on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-purple-900/60"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-pink-600/40 via-purple-800/30 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main content taking full viewport */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 min-h-screen">
          {/* Main Title */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light text-white mb-2 sm:mb-4 tracking-wider leading-tight">
              GEMINISTICS
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light tracking-widest">
              WRITING PAGE
            </p>
          </motion.div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/pages"
                className="group border border-white/20 hover:border-white/40 transition-all duration-300 p-4 sm:p-6 lg:p-8 text-center hover:bg-white/5 block"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white tracking-widest group-hover:text-purple-200 transition-colors">
                  PAGES
                </span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 ml-2 inline-block">
                  <svg
                    className="w-full h-full text-white/60 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="https://www.youtube.com/@_geministics_6534"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/20 hover:border-white/40 transition-all duration-300 p-4 sm:p-6 lg:p-8 text-center hover:bg-white/5 block"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white tracking-widest group-hover:text-purple-200 transition-colors">
                  YOUTUBE
                </span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 ml-2 inline-block">
                  <svg
                    className="w-full h-full text-white/60 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/poems"
                className="group border border-white/20 hover:border-white/40 transition-all duration-300 p-4 sm:p-6 lg:p-8 text-center hover:bg-white/5 block"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white tracking-widest group-hover:text-purple-200 transition-colors">
                  POEMS
                </span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 ml-2 inline-block">
                  <svg
                    className="w-full h-full text-white/60 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/thoughts"
                className="group border border-white/20 hover:border-white/40 transition-all duration-300 p-4 sm:p-6 lg:p-8 text-center hover:bg-white/5 block"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white tracking-widest group-hover:text-purple-200 transition-colors">
                  THOUGHTS
                </span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 ml-2 inline-block">
                  <svg
                    className="w-full h-full text-white/60 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Admin Access - Top Right */}
          <motion.div
            className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/admin" className="text-white/30 hover:text-white/60 transition-colors text-xs sm:text-sm">
              Admin
            </Link>
          </motion.div>

          {/* Social Media Icons - Bottom Left */}
          <motion.div
            className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 flex items-center space-x-3 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a
              href="https://www.instagram.com/_geministics_?utm_source=ig_web_button_share_sheet&igsh=NjlkamNmZXcxdHNn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
              aria-label="Instagram"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@_geministics_6534"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="YouTube"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Signature - Bottom Right */}
          <motion.div
            className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="text-pink-400 font-playfair text-lg sm:text-xl lg:text-2xl italic">Kaustubh</span>
          </motion.div>
        </main>

        {/* Footer positioned at the very bottom */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  )
}
