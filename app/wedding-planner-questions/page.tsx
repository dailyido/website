import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Top 10 Things to Look for in a Wedding Planner | Daily I Do',
  description: 'A free guide from Daily I Do — what to look for when hiring a wedding planner.',
}

const items = [
  {
    title: 'Communication Style',
    body: 'You are going to spend months (sometimes years) talking to this person. Make sure their communication style matches yours. Fast responses mean nothing if the communication itself feels stressful, confusing, or cold.',
  },
  {
    title: 'Experience With Your Type of Wedding',
    body: 'A planner who crushes ballroom weddings may not necessarily be the best fit for a tented waterfront wedding. Ask about weddings similar to yours in style, size, logistics, and budget.',
  },
  {
    title: 'Budget Transparency',
    body: 'A good planner should help you understand where your money is actually going and guide priorities realistically, not just tell you everything is "doable."',
  },
  {
    title: 'Vendor Relationships',
    body: 'Strong planner/vendor relationships matter more than people realize. Great planners know who is reliable, who works well together, and how to build a team that fits your vision and personality.',
  },
  {
    title: 'Organization Systems',
    body: 'Ask how they manage timelines, checklists, contracts, layouts, guest counts, and communication. A beautiful Instagram feed does not automatically equal a well-run wedding day.',
  },
  {
    title: 'Their Actual Role on Wedding Day',
    body: 'Some planners are deeply hands-on all weekend. Others mainly oversee vendors. Make sure you understand exactly what support looks like on the wedding day itself.',
  },
  {
    title: 'Personality Fit',
    body: 'This one is huge. Your planner will be with you during emotional, stressful, exciting, and vulnerable moments. You should genuinely enjoy being around them.',
  },
  {
    title: 'Problem-Solving Ability',
    body: 'Ask for examples of things that went wrong at weddings and how they handled them. Weddings always have unexpected moments. The best planners stay calm and solution-oriented.',
  },
  {
    title: 'Team Structure',
    body: 'Will you work directly with the owner? An associate planner? Multiple people? Make sure you know who your main point of contact will actually be throughout the process.',
  },
  {
    title: 'Reviews Beyond Pretty Photos',
    body: 'Look beyond styled shoots and Instagram. Read reviews carefully and pay attention to comments about responsiveness, calmness under pressure, organization, and overall experience. Those are usually the things couples remember most.',
  },
]

export default function WeddingPlannerQuestions() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[720px] mx-auto px-6">

          {/* Download card */}
          <div className="bg-accent-light rounded-3xl px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
              <h1 className="text-xl font-bold text-[#1a1a1a]">Top 10 Things to Look for in a Wedding Planner</h1>
            </div>
            <a
              href="/pdfs/wedding-planner-questions.pdf"
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
