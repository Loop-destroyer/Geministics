import Link from "next/link"
import { Footer } from "@/components/footer"

export default function YouTubePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-600 relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Back button */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        <main className="flex-1 flex items-center justify-center px-8">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-white mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <h1 className="text-6xl md:text-8xl font-playfair font-light text-white tracking-wider mb-8">YOUTUBE</h1>
            <p className="text-xl text-white/80 mb-8 font-light">Video content coming soon</p>
            <a
              href="https://www.youtube.com/@_geministics_6534"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-white/30 hover:border-white/50 text-white hover:bg-white/10 transition-all duration-300"
            >
              Visit Channel
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
