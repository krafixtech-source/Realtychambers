'use client'

import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function PropertyExchange() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 mt-12">
        <span className="section-label">SERVICES / 05</span>
        <h1 className="font-sans font-bold text-4xl md:text-6xl text-[#171717] uppercase tracking-tight leading-none">
          Property Exchange
        </h1>
        <p className="body-large text-gray-500 font-light leading-relaxed">
          Upgrade or pivot your real estate portfolio. We design hassle-free property exchange models to swap non-performing assets for high-yield residential or commercial spaces.
        </p>

        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_restaurant.png"
            alt="Property Exchange Jaipur Rajasthan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-base">
          <h2 className="text-2xl font-medium font-sans">Portfolio Rebalancing</h2>
          <p>
            Many investors hold properties (like agricultural land or under-construction flats) that do not align with their active cash flow needs. Realty Chamber designs creative property exchange solutions to swap these assets for operational, high-yield commercial showrooms, office spaces, or premium builder floors.
          </p>
          <p>
            We manage valuation audits, negotiate clear terms, and structure contract exchanges, ensuring both parties execute the transaction with clean titles and minimal friction.
          </p>

          <h3 className="text-xl font-medium font-sans mt-4">Exchange Operations</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-600">
            <li><strong>Asset Valuation Audit:</strong> Realistic market assessment of both properties to determine fair swap values.</li>
            <li><strong>Legal Integrity Checks:</strong> Complete title verifications to ensure all exchange assets are fully cleared.</li>
            <li><strong>Registry & Legal Support:</strong> Handling exchange deed drafting, stamp-duty computations, and local filings.</li>
          </ul>
        </div>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 flex justify-between items-center">
          <TransitionLink href="/services" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">
            ← Back to Services
          </TransitionLink>
          <TransitionLink href="/contact" className="px-6 py-3 bg-[#171717] text-[#F3F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Request Asset Swap
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
