import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Top 10 Things to Ask a Content Creator | Daily I Do',
  description: 'A free guide from Daily I Do — the questions to ask before hiring a wedding content creator.',
}

const items = [
  {
    title: 'How would you describe your editing style and overall vibe?',
    body: 'Make sure their style actually matches your wedding vision. Light and airy, cinematic, documentary, trendy TikTok-style, raw and candid, editorial, nostalgic VHS… everyone shoots differently.',
  },
  {
    title: 'What exactly is included in your packages?',
    body: 'Ask how many hours they stay, how many edited reels/photos/videos you receive, turnaround time, teaser content, raw footage, drone footage, and whether travel is included.',
  },
  {
    title: 'Have you worked at our venue before?',
    body: "Not a dealbreaker if they haven't, but experience with your venue can help them know lighting, timing, weather challenges, and the best spots.",
  },
  {
    title: 'How do you work alongside photographers and videographers?',
    body: 'A great content creator knows how to blend into the vendor team without getting in the way. This question tells you a lot about professionalism.',
  },
  {
    title: 'What is your turnaround time for content delivery?',
    body: 'Some creators deliver within 24 hours, while others take weeks. Clarify expectations before booking.',
  },
  {
    title: 'Can we see full wedding examples, not just Instagram highlights?',
    body: 'Instagram shows the best 5 seconds. Ask to see complete galleries or full wedding coverage to understand consistency.',
  },
  {
    title: 'What moments do you prioritize capturing?',
    body: 'Some focus heavily on aesthetics and details, while others prioritize emotion and candid guest moments. Make sure your priorities align.',
  },
  {
    title: 'What happens if you are sick or unable to attend?',
    body: 'Always ask about backup plans, replacement coverage, and contracts. Weddings only happen once.',
  },
  {
    title: 'Will we have input on trends, audio, or editing style?',
    body: 'If you hate overly trendy transitions or want more timeless edits, discuss that upfront.',
  },
  {
    title: 'Why do couples usually book you over someone else?',
    body: "This is one of my favorite questions because their answer usually tells you everything. You'll quickly learn whether they value storytelling, luxury aesthetics, personality, fast delivery, organization, or social media strategy most.",
  },
]

export default function HiringContentCreator() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[720px] mx-auto px-6">

          {/* Download card */}
          <div className="bg-accent-light rounded-3xl px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
              <h1 className="text-xl font-bold text-[#1a1a1a]">Top 10 Things to Ask a Content Creator</h1>
            </div>
            <a
              href="/pdfs/hiring-content-creator.pdf"
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

          {/* Items */}
          <ol className="space-y-8 list-none p-0 m-0">
            {items.map(({ title, body }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-light text-accent text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-semibold text-[#1a1a1a] mb-1">{title}</h2>
                  <p className="text-[#4a4a4a] leading-relaxed m-0">{body}</p>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </section>

      <Footer />
    </>
  )
}
