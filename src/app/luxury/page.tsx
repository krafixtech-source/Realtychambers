'use client'

import Image from 'next/image'

const LUXURY_CATEGORIES = [
  {
    id: 'palaces',
    title: 'Heritage Palaces',
    tag: 'Sovereign Restoration Mandates',
    desc: 'Sovereign Heritage estates and royal palaces with historical legacies, available under institutional restoration mandates and private acquisitions.',
    image: '/images/hero_architecture.png',
  },
  {
    id: 'forts',
    title: 'Hill Forts & Strongholds',
    tag: 'Sandstone Structures',
    desc: 'Restored hill forts, lake strongholds, and medieval defensive structures optimized for development into ultra-luxury heritage hotels and private sanctuaries.',
    image: '/images/project_concrete.png',
  },
  {
    id: 'hotels',
    title: 'Heritage Hotels',
    tag: 'Operating Hospitality Portfolios',
    desc: 'High-yield operating heritage hotels, boutique heritage properties, and royal havelis in Jaipur, Udaipur, and Jodhpur.',
    image: '/images/project_restaurant.png',
  },
  {
    id: 'resorts',
    title: 'Desert Oasis Resorts',
    tag: 'Wellness & Wilderness Retreats',
    desc: 'Desert oasis sanctuaries, luxury wellness resorts, and eco-friendly heritage estates designed to offer quiet contemplative luxury.',
    image: '/images/human_scale.png',
  },
]

export default function LuxuryCollection() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 mt-12">
        
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="section-label">04 — HERITAGE COLLECTION</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            PALACES, FORTS<br />HOTELS &<br />RESORTS.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6 leading-relaxed">
            Representing Rajasthan’s sovereign architectural legacy. We advise family offices, royal trusts, and luxury hospitality groups on the transition of heritage landmarks.
          </p>
        </div>

        {/* Narrative introduction */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[rgba(23,23,23,0.08)] pt-16">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#171717] font-semibold">
              The Heritage Mandate
            </span>
          </div>
          <div className="md:col-span-8 text-lg font-light leading-relaxed text-gray-700">
            <p>
              Realty Chamber has spent over two decades building trust with historic estates and royal families in Jaipur and across Rajasthan. The transaction of heritage structures requires strict legal due diligence, title clearances, archeological audits, and a deep appreciation for architectural conservation.
            </p>
          </div>
        </div>

        {/* Editorial Layout of luxury categories */}
        <div className="flex flex-col gap-24">
          {LUXURY_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`flex flex-col md:flex-row gap-12 items-center ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden bg-[#171717]" data-cursor="VIEW">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-[500px]">
                <span className="text-xs tracking-wider text-gray-400 font-semibold uppercase">{cat.tag}</span>
                <h2 className="text-3xl md:text-4xl font-serif italic text-[#171717] leading-none">
                  {cat.title}
                </h2>
                <p className="text-sm font-light text-gray-500 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="divider my-2" />
                <a
                  href={`https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20have%20an%20enquiry%20regarding%20${encodeURIComponent(cat.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-[#171717] hover:underline"
                >
                  Request Confidential Memorandum ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="bg-[#171717] text-[#F3F1EB] p-12 text-center flex flex-col items-center gap-6 mt-12">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">Strict Confidentiality Assured</span>
          <h3 className="text-2xl font-serif italic font-light max-w-[600px] leading-snug">
            “Transactions relating to royal heritage estates are executed with strict discretion and off-market protocols.”
          </h3>
          <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">— MR. RAMLAL NARWANI</span>
        </div>

      </div>
    </div>
  )
}
