'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#fdfcfb] border-b border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a]">
            <span className="text-2xl">💍</span>
            Daily I Do
          </Link>

          {/* Center Nav Links */}
          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#1a1a1a]' : 'text-[#4a4a4a] hover:text-[#1a1a1a]'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/realwedding"
                className={`text-sm font-medium transition-colors ${pathname === '/realwedding' ? 'text-[#1a1a1a]' : 'text-[#4a4a4a] hover:text-[#1a1a1a]'}`}
              >
                Real Weddings
              </Link>
            </li>
          </ul>

          {/* Right - App Store Button */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-medium transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="flex flex-col items-start leading-tight">
                <small className="text-[0.6rem] opacity-80">Download on the</small>
                App Store
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
