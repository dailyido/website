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
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/28/05/6e/28056e64-0b79-4cb3-369b-22b7e8f6149d/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-0-85-220.png/200x200bb.jpg',
  },
  {
    name: 'AccuWeather',
    description: 'Provides "MinuteCast" to pinpoint precipitation minute-by-minute, helping you decide when to move the ceremony indoors.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a8/4d/e6/a84de69e-39a4-a0da-a839-4ddbe7364351/AppIcon-0-0-1x_U007epad-0-1-0-0-sRGB-85-220.png/200x200bb.jpg',
  },
  {
    name: 'Weather Underground',
    description: 'Uses a network of personal weather stations for highly localized, hourly, and daily reports.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/0a/a0/7a0aa0ac-7473-b0d3-a0a5-245efb2727ad/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/200x200bb.jpg',
  },
  {
    name: '1 Degree Outside',
    description: 'Hyper-local and provides detailed, specific, and accurate hour-by-hour and long-range (14-day) forecasting.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/52/e9/bf/52e9bf0a-8900-b92a-2155-480253fbc563/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.jpeg/200x200bb.jpg',
  },
  {
    name: 'Windy',
    description: 'Provides detailed wind and weather layers — great for outdoor ceremonies and tented events.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f7/83/f8/f783f8fb-d883-e47e-5763-0f212e8b3425/AppIcon-0-0-1x_U007epad-0-1-85-220.png/200x200bb.jpg',
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
                <img
                  src={icon}
                  alt={`${name} app icon`}
                  width={44}
                  height={44}
                  className="flex-shrink-0 w-11 h-11 rounded-xl object-cover"
                />
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
