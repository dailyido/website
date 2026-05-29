import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Top Weather Apps | Daily I Do',
  description: 'A free guide from Daily I Do — the best weather apps for planning your wedding day.',
}

export default function WeatherApps() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-16">
        <div className="max-w-[860px] mx-auto px-6 w-full">

          <div className="bg-white border border-[#e5e5e5] rounded-3xl shadow-sm overflow-hidden mb-6">
            <div className="bg-accent-light px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
                <h1 className="text-2xl font-bold text-[#1a1a1a] leading-snug">
                  Top Weather Apps
                </h1>
              </div>
              <a
                href="/pdfs/weather-apps.pdf"
                download
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm whitespace-nowrap shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-[#e5e5e5] shadow-sm" style={{ height: '85vh' }}>
            <iframe
              src="/pdfs/weather-apps.pdf"
              className="w-full h-full"
              title="Top Weather Apps"
            />
          </div>

          <div className="md:hidden bg-[#faf8f8] border border-[#e5e5e5] rounded-2xl p-8 text-center">
            <p className="text-[#4a4a4a] mb-6">Tap below to open the full guide.</p>
            <a
              href="/pdfs/weather-apps.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Open PDF
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
