'use client'

import Image from 'next/image'

const JOURNAL_POSTS = [
  {
    num: '01',
    cat: 'Material Studies',
    date: 'AUG 2026',
    title: 'Honed limestone as a thermal mass stabilizer',
    desc: 'An inquiry into Rajasthani limestone structures. We examine how local raw limestone blocks act as passive thermal regulators, cooling residential interiors under desert sunlight while preserving raw tactile beauty.',
    image: '/images/material_detail.png',
  },
  {
    num: '02',
    cat: 'Future Space',
    date: 'JUL 2026',
    title: 'The spatial transition of Jaipur residential villas',
    desc: 'How contemporary design is reshaping residential layouts in Rajasthan. Highlighting shifting proportions from closed courtyard models to open travertine pavilions that bridge indoors and outdoors.',
    image: '/images/human_scale.png',
  },
  {
    num: '03',
    cat: 'Spatial Light',
    date: 'JUN 2026',
    title: 'Interpreting light geometry in brutalist concrete structures',
    desc: 'An exploration of shadow mapping. By plotting the sun path over Rajasthan, concrete walls can be sculpted to capture geometric frames of direct light at sunset, turning rooms into living canvas panels.',
    image: '/images/architectural_detail.png',
  },
]

export default function JournalHub() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 mt-4">
        
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="section-label">06 — JOURNAL & STORIES</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            STUDIO<br />JOURNAL.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6 leading-relaxed">
            Written studies exploring material geology, spatial light, and the evolution of luxury residential architecture in India.
          </p>
        </div>

        {/* Narrative introduction */}
        <div className="flex flex-col gap-12 border-t border-[rgba(23,23,23,0.08)] pt-16">
          {JOURNAL_POSTS.map((post) => (
            <div key={post.title} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 border-b border-[rgba(23,23,23,0.04)] items-start">
              
              {/* Col 1: Metadatas */}
              <div className="md:col-span-3 flex flex-col gap-2 text-gray-400 font-semibold text-xs tracking-wider">
                <span>{post.num} / {post.cat}</span>
                <span>{post.date}</span>
              </div>

              {/* Col 2: Text details */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-sans font-light text-[#171717] hover:text-[#0B0B0B] transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm font-light text-gray-500 leading-relaxed">
                  {post.desc}
                </p>
              </div>

              {/* Col 3: Visual Spread */}
              <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-[#171717] rounded shadow-sm" data-cursor="VIEW">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="border-t border-[rgba(23,23,23,0.08)] pt-16 text-center text-xs text-gray-400 font-medium tracking-widest uppercase">
          Realty Chamber Editorial Journal • Updated Bi-Monthly
        </div>

      </div>
    </div>
  )
}
