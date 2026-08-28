import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Book a Call | Daily I Do',
  description: 'Book a one-on-one call with one of our wedding planning experts. Get personalized guidance on venues, budgets, timelines, and more.',
}

const experts = [
  {
    name: 'Heather',
    initials: 'H',
    bio: 'With over 18 years in the wedding industry, I find so much joy in helping couples bring their wedding vision to life. While I love weddings at all venues, tented weddings are where my heart is. From decor and timelines to vendor coordination and all those little logistics you never knew you needed to think about, because who knew you\'d need to worry about electricity for your wedding tent?! I\'m here to offer guidance, simplify the planning process, and make sure all the details come together so you can truly enjoy your wedding day.',
    calendlyUrl: 'https://calendly.com/heather-capecodcelebrations',
  },
  {
    name: 'Jamie',
    initials: 'J',
    bio: "I've spent nearly 20 years planning weddings and helping couples navigate everything from the big decisions to the tiny details that make a wedding feel uniquely theirs. As the founder of Cape Cod Celebrations and co-founder of Daily I Do, I created this app to make wedding planning feel less overwhelming and a lot more enjoyable. During our 30-minute call, you can ask me anything — venue questions, budgets, etiquette, timelines, design ideas, family challenges, or whatever else is on your mind. My goal is simple: to help you leave the call feeling excited, confident, and ready for what's next.",
    calendlyUrl: '', // TODO: add Jamie's Calendly link
  },
]

export default function BookACall() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[800px] mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">One-on-One Guidance</p>
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Book a Call</h1>
            <p className="text-[#4a4a4a] text-lg leading-relaxed max-w-[560px] mx-auto">
              Get personalized advice from an expert who has seen it all. Whether you have one question or a dozen, we're here to help.
            </p>
          </div>

          {/* Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((expert) => (
              <div
                key={expert.name}
                className="bg-white rounded-3xl border border-[#e5e5e5] p-8 flex flex-col"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mb-5">
                  <span className="text-accent text-2xl font-bold">{expert.initials}</span>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">{expert.name}</h2>

                {/* Bio */}
                <p className="text-[#4a4a4a] leading-relaxed text-sm flex-1 mb-6">
                  {expert.bio}
                </p>

                {/* CTA */}
                {expert.calendlyUrl ? (
                  <a
                    href={expert.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                  >
                    Book a Call with {expert.name}
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 bg-accent-light text-accent font-semibold px-6 py-3 rounded-full text-sm cursor-default">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
