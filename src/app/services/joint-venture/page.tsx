'use client'

import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function JointVenture() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 mt-12">
        <span className="section-label">SERVICES / 04</span>
        <h1 className="font-sans font-bold text-4xl md:text-6xl text-[#171717] uppercase tracking-tight leading-none">
          Joint Venture (JV)
        </h1>
        <p className="body-large text-gray-500 font-light leading-relaxed">
          Unlock the value of your land. We connect landowners with Jaipur's most reputed builders (Mahima, Mangalam, Dhanuka Groups) for high-return joint development projects.
        </p>

        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_concrete.png"
            alt="Joint Venture real estate Jaipur Rajasthan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-base">
          <h2 className="text-2xl font-medium font-sans">High-ROI JV Structural Partnerships</h2>
          <p>
            For landholders, partner selection is the single most critical factor determining project success. Realty Chamber acts as a trusted intermediary, matching prominent landowners with reputable developers.
          </p>
          <p>
            Our founder, Mr. Ramlal Narwani, has spent decades building strong relationships with Jaipur’s leading builders. We ensure your Joint Venture Agreement (JVA) has clear revenue-sharing terms, strict construction timelines, and sound exit options.
          </p>

          <h3 className="text-xl font-medium font-sans mt-4">JV Management Highlights</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-600">
            <li><strong>Developer Vetting:</strong> Assessing track records, delivery histories, and financial standing of builder groups.</li>
            <li><strong>Favorable Agreement Structures:</strong> Structuring clear sharing ratios (area vs revenue split) and security deposits.</li>
            <li><strong>Liaison Support:</strong> Overseeing compliance clearances, site plans, and municipal project launches.</li>
          </ul>
        </div>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 flex justify-between items-center">
          <TransitionLink href="/services" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">
            ← Back to Services
          </TransitionLink>
          <TransitionLink href="/contact" className="px-6 py-3 bg-[#171717] text-[#F3F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Initiate JV Proposal
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
