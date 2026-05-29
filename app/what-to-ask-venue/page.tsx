import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'What to Ask Your Venue Before Booking | Daily I Do',
  description: 'A free guide from Daily I Do — the questions every couple should ask before signing a venue contract.',
}

export default function WhatToAskVenue() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-16 min-h-screen flex items-center">
        <div className="max-w-[600px] mx-auto px-6 w-full">
          <div className="bg-white border border-[#e5e5e5] rounded-3xl shadow-sm overflow-hidden">

            {/* Header band */}
            <div className="bg-accent-light px-10 py-10 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c48b98" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Free Guide</p>
              <h1 className="text-2xl font-bold text-[#1a1a1a] leading-snug">
                What to Ask Your Venue<br />Before Booking
              </h1>
            </div>

            {/* Body */}
            <div className="px-10 py-8 text-center">
              <p className="text-[#4a4a4a] leading-relaxed mb-8">
                Don't sign anything until you've asked these questions. This guide walks you through everything you need to know before committing to your wedding venue.
              </p>

              <a
                href="/pdfs/what-to-ask-venue.pdf"
                download
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-10 py-4 rounded-full transition-colors text-base w-full justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Free Guide
              </a>

              <p className="text-xs text-[#aaa] mt-4">PDF · Free download</p>
            </div>

            {/* Footer band */}
            <div className="border-t border-[#f0f0f0] px-10 py-5 text-center">
              <p className="text-sm text-[#9a9a9a]">From <span className="font-semibold text-[#4a4a4a]">Daily I Do</span> — the wedding planning app</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
