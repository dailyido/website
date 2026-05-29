import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Splurge vs. Save | Daily I Do',
  description: 'A free guide from Daily I Do — where to splurge and where to save on your wedding.',
}

const splurge = [
  {
    title: 'Photography + Videography',
    body: 'These are the only things you keep forever. When the weekend is over, your photos and video are what bring you back to it. This is not the place to cut corners.',
  },
  {
    title: 'Food + Bar',
    body: "Guests will always remember if the food was great… or not. Whether it's elevated catering or a really fun late-night snack, this is a big part of the experience.",
  },
  {
    title: 'Music / Entertainment',
    body: 'A great band or DJ can completely change the energy of the night. If having a packed dance floor matters to you, this is a big one.',
  },
  {
    title: 'Planner',
    body: 'A good planner saves you time, stress, and often money. Especially for tented or complex weddings, this is one of the best investments you can make.',
  },
  {
    title: 'Guest Experience Touches',
    body: 'Transportation, welcome drinks, thoughtful timing, and comfort details (like shade, heaters, bathrooms for tented weddings). These are the things your guests feel all day.',
  },
]

const save = [
  {
    title: 'Invitations + Paper Goods',
    body: "Beautiful doesn't have to mean expensive. There are amazing semi-custom options, and most guests won't remember your font choices.",
  },
  {
    title: 'Favors',
    body: "If it's not edible or usable, it's usually left behind. Skip them or keep them simple.",
  },
  {
    title: 'Over-the-Top Decor Everywhere',
    body: "Pick your moments. You don't need to go all-out in every single space. Focus on where guests spend the most time.",
  },
  {
    title: 'Bridal Party Extras',
    body: 'Gifts, matching outfits, etc. can add up quickly. Keep it thoughtful, not excessive.',
  },
  {
    title: "Cake (if you're not cake people)",
    body: "If cake isn't your thing, don't force it. Do a small cutting cake and serve something fun instead.",
  },
]

export default function SplurgeSave() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[720px] mx-auto px-6">

          {/* Download card */}
          <div className="bg-accent-light rounded-3xl px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
              <h1 className="text-xl font-bold text-[#1a1a1a]">Splurge vs. Save</h1>
            </div>
            <a
              href="/pdfs/splurge-save.pdf"
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
          <p className="text-lg text-[#4a4a4a] leading-relaxed mb-12">
            Every couple is different, and that's the most important place to start. Your priorities, your budget, and what you actually care about should drive every decision. We've seen couples spend more on food because they're big "food people," others go all-in on music because they want the dance floor packed all night, and some just want it to look incredible.
          </p>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Splurge */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">✦</span>
                <h2 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-wide">Splurge</h2>
              </div>
              <div className="space-y-6">
                {splurge.map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-accent pl-4">
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{title}</h3>
                    <p className="text-[#5a5a5a] text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Save */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">○</span>
                <h2 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-wide">Save</h2>
              </div>
              <div className="space-y-6">
                {save.map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-[#d5d5d5] pl-4">
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{title}</h3>
                    <p className="text-[#5a5a5a] text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
