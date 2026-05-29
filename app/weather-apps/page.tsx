import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Top Weather Apps Used by Wedding Planners | Daily I Do',
  description: 'A free guide from Daily I Do — the best weather apps for planning your wedding day.',
}

const apps = [
  {
    name: 'The Weather Channel',
    description: 'Offers accurate, highly rated hourly forecasts and live radar up to 2 weeks in advance.',
    icon: (
      // Sun with cloud
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3"/>
        <path d="M12 2v1M12 13v1M4.22 4.22l.7.7M18.36 4.22l-.7.7M2 8h1M21 8h-1"/>
        <path d="M6 16a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H6a3 3 0 0 1 0-6"/>
      </svg>
    ),
  },
  {
    name: 'AccuWeather',
    description: 'Provides "MinuteCast" to pinpoint precipitation minute-by-minute, helping you decide when to move the ceremony indoors.',
    icon: (
      // Rain drops
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <line x1="8" y1="16" x2="8" y2="21"/>
        <line x1="12" y1="19" x2="12" y2="21"/>
        <line x1="16" y1="16" x2="16" y2="21"/>
      </svg>
    ),
  },
  {
    name: 'Weather Underground',
    description: 'Uses a network of personal weather stations for highly localized, hourly, and daily reports.',
    icon: (
      // Network / station nodes
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <circle cx="5" cy="19" r="2"/>
        <circle cx="19" cy="19" r="2"/>
        <line x1="12" y1="7" x2="5" y2="17"/>
        <line x1="12" y1="7" x2="19" y2="17"/>
        <line x1="7" y1="19" x2="17" y2="19"/>
      </svg>
    ),
  },
  {
    name: '1 Degree Outside',
    description: 'Hyper-local and provides detailed, specific, and accurate hour-by-hour and long-range (14-day) forecasting.',
    icon: (
      // Thermometer
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>
    ),
  },
  {
    name: 'Windy',
    description: 'Provides detailed wind and weather layers — great for outdoor ceremonies and tented events.',
    icon: (
      // Wind
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ),
  },
]

export default function WeatherApps() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[720px] mx-auto px-6">

          {/* Download card */}
          <div className="bg-accent-light rounded-3xl px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
              <h1 className="text-xl font-bold text-[#1a1a1a]">Top Weather Apps Used by Wedding Planners</h1>
            </div>
            <a
              href="/pdfs/weather-apps.pdf"
              download
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
          </div>

          {/* Intro */}
          <p className="text-lg text-[#4a4a4a] leading-relaxed mb-10">
            Weather anxiety is real — especially when you&apos;re planning one of the most important days of your life. These are the apps wedding planners actually use to track forecasts, monitor conditions, and make real-time calls on ceremony setup.
          </p>

          {/* App list */}
          <div className="space-y-6">
            {apps.map(({ name, description, icon }) => (
              <div key={name} className="flex gap-5 p-6 bg-white border border-[#e5e5e5] rounded-2xl">
                <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                  {icon}
                </span>
                <div>
                  <h2 className="font-semibold text-[#1a1a1a] mb-1">{name}</h2>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
