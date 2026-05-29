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
        <div className="max-w-[860px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Top Weather Apps</h1>
          <p className="text-lg text-[#7a7a7a] mb-10">A free guide from Daily I Do</p>

          <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-[#e5e5e5] shadow-sm" style={{ height: '80vh' }}>
            <iframe
              src="/pdfs/weather-apps.pdf"
              className="w-full h-full"
              title="Top Weather Apps"
            />
          </div>

          <div className="md:hidden bg-[#faf8f8] border border-[#e5e5e5] rounded-2xl p-8 text-center">
            <p className="text-[#4a4a4a] mb-6 leading-relaxed">
              Tap below to open or download the full guide.
            </p>
            <a
              href="/pdfs/weather-apps.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Open PDF
            </a>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/pdfs/weather-apps.pdf"
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
