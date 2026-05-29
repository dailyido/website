import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'What to Ask Your Venue Before Booking | Daily I Do',
  description: 'A free guide from Daily I Do — the questions every couple should ask before signing a venue contract.',
}

type Question = {
  n: number
  text: string
  note?: string
  tip?: string
}

const questions: Question[] = [
  { n: 1, text: 'What dates are available in the month I\'m considering?' },
  { n: 2, text: 'How many people can this location accommodate?' },
  { n: 3, text: 'What is the rental fee and what is included in that price? Is there a discount for booking an off-season date or Sunday through Friday?' },
  { n: 4, text: 'How much is the deposit, when is it due, and is it refundable? What\'s the payment plan for the entire bill?' },
  { n: 5, text: 'Can I hold my ceremony here, too? Is there an additional charge? Is the ceremony site close to the reception site? Is there a changing area? How much time is allocated for the rehearsal?' },
  { n: 6, text: 'What\'s the cancellation policy?', note: 'Some places will refund most of your deposit if you cancel far enough in advance (often 60 days), since there\'s still a chance they can rent the space. After a certain date, though, you may not be able to get a refund—at least not a full one.' },
  { n: 7, text: 'What\'s your weather contingency plan for outdoor spaces?' },
  { n: 8, text: 'How long will I have use of the event space(s) I reserve? Is there an overtime fee if I stay longer? Is there a minimum or maximum rental time?' },
  { n: 9, text: 'Can I move things around and decorate to suit my purposes, or do I have to leave everything as is? Are there decoration guidelines/restrictions? Can I use real candles?' },
  { n: 10, text: 'What time can my vendors start setting up on the day of the wedding? Is it possible to start the setup the day before? How early can deliveries be made? How much time will I have for décor setup? Does the venue provide assistance getting gifts or décor back to a designated car, hotel room, etc. after the event has concluded?' },
  { n: 11, text: 'Is there an outdoor space where my guests can mingle, and can it be heated and/or protected from the elements if necessary? Is there a separate indoor "socializing" space?' },
  { n: 12, text: 'Do you have an in-house caterer or a list of "preferred" caterers, or do I need to provide my own? Even if there is an in-house caterer, do I have the option of using an outside caterer instead?' },
  { n: 13, text: 'If I hire my own caterer, are kitchen facilities available for them?', note: 'Caterers charge extra if they have to haul in refrigerators and stoves.' },
  { n: 14, text: 'Are tables, linens, chairs, plates, silverware and glassware provided, or will I have to rent them myself or get them through my caterer?' },
  { n: 15, text: 'What is the food and beverage cost on a per/person basis? What is the service charge?' },
  { n: 16, text: 'Can we do a food tasting prior to finalizing our menu selection? If so, is there an additional charge?' },
  { n: 17, text: 'Can I bring in a cake from an outside cake maker or must I use a cake made on the premises? Is there a cake-cutting fee? If I use a cake made on site is the fee waived? Do you provide special cake-cutting utensils?' },
  { n: 18, text: 'Can I bring my own wine, beer or champagne, and is there a corkage fee if I do? Can I bring in other alcohol?' },
  { n: 19, text: 'Are you licensed to provide alcohol service? If so, is alcohol priced per person? By consumption? Are there additional charges for bar staff? Is there a bar minimum that must be met before the conclusion of the event? What is the average bar tab for the number of people attending my event?' },
  { n: 20, text: 'Are there restrictions on what kind of music I can play, or a time by which the music must end? Can the venue accommodate a DJ or live band?', tip: 'Check where the outlets are located in your event space, because that will help you figure out where the band can set up and where other vendors can hook up their equipment.' },
  { n: 21, text: 'Is there parking on site? If so, is it complimentary? Do you offer valet parking, and what is the charge? If there is no parking on site, where will my guests park? If a shuttle service is needed, can you assist with setting it up?' },
  { n: 22, text: 'How many restrooms are there?' },
  { n: 23, text: 'Do you offer on-site coordination? If so, what services are included and is there an additional charge for them? Will the coordinator supervise day-of? How much assistance can I get with the setup/décor?' },
  { n: 24, text: 'Does the venue have liability insurance?', note: 'If someone gets injured during the party, you don\'t want to be held responsible—if the site doesn\'t have insurance, you\'ll need to get your own.' },
  { n: 25, text: 'Can I hire my own vendors (caterer, coordinator, DJ, etc.), or must I select from a preferred vendor list? If I can bring my own, do you have a list of recommended vendors?' },
  { n: 26, text: 'What overnight accommodations do you provide? Do you offer a discount for booking multiple rooms? Do you provide a complimentary room or upgrade for the newlyweds? What are the nearest hotels to the venue?' },
  { n: 27, text: 'Do you have signage or other aids to direct guests to my event?' },
  { n: 28, text: 'How many other events would be taking place the weekend of our wedding?' },
]

const tentedQuestions = [
  'Do we have to bring in our own bathrooms?',
  'Do our vendors have to do their own trash removal?',
  'Are guests allowed inside the house? (if you are renting a property)',
  'Do you have any photos of past events on your property that we can see?',
  'Will anyone be here from your property the day of the wedding to assist in any way?',
  'Where is the water and electricity that the tent, band, caterer and bathrooms can access?',
  'Do you only rent the property certain dates or can you be flexible with a rental starting on a weekday?',
  'What, if any, special rules or regulations do you have for events on your property?',
]

export default function WhatToAskVenue() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-20">
        <div className="max-w-[720px] mx-auto px-6">

          {/* Download card */}
          <div className="bg-accent-light rounded-3xl px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Free Guide</p>
              <h1 className="text-xl font-bold text-[#1a1a1a]">What to Ask Your Venue Before Booking</h1>
            </div>
            <a
              href="/pdfs/what-to-ask-venue.pdf"
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

          {/* Questions list */}
          <ol className="space-y-5 list-none p-0 m-0">
            {questions.map(({ n, text, note, tip }) => (
              <li key={n} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-light text-accent text-sm font-bold flex items-center justify-center mt-0.5">{n}</span>
                <div>
                  <p className="text-[#2a2a2a] leading-relaxed m-0">{text}</p>
                  {note && (
                    <div className="mt-2 pl-3 border-l-2 border-accent-light">
                      <p className="text-sm text-[#7a7a7a] italic m-0"><span className="font-semibold not-italic text-[#555]">Note:</span> {note}</p>
                    </div>
                  )}
                  {tip && (
                    <div className="mt-2 pl-3 border-l-2 border-accent">
                      <p className="text-sm text-[#7a7a7a] italic m-0"><span className="font-semibold not-italic text-accent">Tip:</span> {tip}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Tented venue section */}
          <div className="mt-14 pt-10 border-t border-[#e5e5e5]">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Tented Venue</h2>
            <p className="text-[#7a7a7a] mb-8">Same as above, but here are some more tent-specific questions to consider.</p>
            <ol className="space-y-5 list-none p-0 m-0">
              {tentedQuestions.map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-light text-accent text-sm font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-[#2a2a2a] leading-relaxed m-0">{text}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}
