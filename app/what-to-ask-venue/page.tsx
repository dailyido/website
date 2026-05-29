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

      <section className="pt-[calc(3rem+80px)] pb-16">
        <div className="max-w-[860px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">What to Ask Your Venue Before Booking</h1>
          <p className="text-lg text-[#7a7a7a] mb-10">A free guide from Daily I Do</p>

          {/* Desktop: iframe embed */}
          <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-[#e5e5e5] shadow-sm" style={{ height: '80vh' }}>
            <iframe
              src="/pdfs/what-to-ask-venue.pdf"
              className="w-full h-full"
              title="What to Ask Your Venue Before Booking"
            />
          </div>

          {/* Mobile: download prompt */}
          <div className="md:hidden bg-[#faf8f8] border border-[#e5e5e5] rounded-2xl p-8 text-center">
            <p className="text-[#4a4a4a] mb-6 leading-relaxed">
              Tap below to open or download the full guide.
            </p>
            <a
              href="/pdfs/what-to-ask-venue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Open PDF
            </a>
          </div>

          {/* Download link for desktop too */}
          <div className="mt-6 text-center">
            <a
              href="/pdfs/what-to-ask-venue.pdf"
              download
              className="text-accent hover:text-accent-dark underline text-sm font-medium"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
