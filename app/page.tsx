import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[calc(80px+4rem)] pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-[520px]">
              {/* Social Proof Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#4a4a4a] mb-6 shadow-sm animate-fade-in-up">
                <div className="flex">
                  <img src="https://i.pravatar.cc/56?img=1" alt="User" className="w-7 h-7 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/56?img=5" alt="User" className="w-7 h-7 rounded-full border-2 border-white -ml-2" />
                  <img src="https://i.pravatar.cc/56?img=9" alt="User" className="w-7 h-7 rounded-full border-2 border-white -ml-2" />
                </div>
                Loved by Couples Everywhere!
              </div>

              {/* Headline */}
              <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.1] mb-6 text-[#1a1a1a] animate-fade-in-up animate-delay-1">
                Plan your<br />perfect day
                <span className="text-[#7a7a7a] font-medium"><br />with Daily I Do</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-[#4a4a4a] leading-relaxed mb-8 animate-fade-in-up animate-delay-2">
                Daily I Do is a wedding planning app that delivers daily wedding planning tips, fun facts, and gentle reminders straight to your phone—so you can stay organized, inspired, and on track from engagement to "I do."
              </p>

              {/* App Store Button */}
              <div className="flex gap-3 flex-wrap animate-fade-in-up animate-delay-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg text-xs font-medium transition-transform hover:scale-[1.02] hover:shadow-md"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="flex flex-col items-start leading-tight">
                    <small className="text-[0.6rem] opacity-80">Download on the</small>
                    <span className="text-base">App Store</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right - Phone Mockups */}
            <div className="relative flex justify-center items-center gap-6 min-h-[500px] animate-fade-in-up animate-delay-4">
              {/* Primary Phone */}
              <div className="relative w-[220px] rounded-[32px] shadow-xl overflow-hidden bg-white border-[3px] border-black z-10">
                <Image
                  src="/images/image1.PNG"
                  alt="Daily I Do App Screenshot"
                  width={220}
                  height={476}
                  className="w-full h-auto"
                />
              </div>

              {/* Secondary Phone */}
              <div className="relative w-[180px] rounded-[32px] shadow-xl overflow-hidden bg-white border-[3px] border-black">
                <Image
                  src="/images/image2.PNG"
                  alt="Daily I Do App Screenshot"
                  width={180}
                  height={390}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
