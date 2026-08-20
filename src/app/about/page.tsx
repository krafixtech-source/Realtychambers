'use client'

import Image from 'next/image'
import { TransitionLink } from '@/components/PageTransition'

export default function About() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24">
        
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-[800px] mt-12">
          <span className="section-label">01 — STUDIO PROFILE</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            WE INTEGRATE<br />HERITAGE &<br />MODERNITY.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6 leading-relaxed">
            Realty Chamber was established in 1995 in Jaipur, Rajasthan, under the leadership of Mr. Ramlal Narwani. For over three decades, we have served as a leading single-window consultancy, facilitating landmark real estate developments, joint ventures, and premium asset acquisitions.
          </p>
        </div>

        {/* Big Editorial Image Spread */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/human_scale.png"
            alt="Realty Chamber Jaipur Studio about page"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[rgba(23,23,23,0.08)] pt-16">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#171717] font-semibold">
              The Journey since 1995
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-lg font-light leading-relaxed text-[#171717]">
            <p>
              Realty Chamber was founded on a simple principle: real estate is not just about properties; it is about human experience and legacy. Under the guidance of Mr. Ramlal Narwani, we began by serving local families in Jaipur, and quickly grew to partner with Rajasthan’s premier builder groups, including Mahima Group, Mangalam Build-Developers, Vardhman Group, and Dhanuka Group.
            </p>
            <p>
              Today, we provide end-to-end advisory services, specializing in structured joint ventures, agricultural land aggregates, commercial showrooms, and operating heritage luxury listings (including forts, palaces, and boutique resorts). Our commitment to 100% title verification and total deal transparency has made us one of Jaipur's most respected consultancies.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[rgba(23,23,23,0.08)] pt-16">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#171717]">01 / Transparency</span>
            <p className="text-sm font-light text-gray-500 leading-relaxed">
              We perform rigorous title evaluations and legal audits for every property in our collection. We offer zero hidden costs and absolute honesty in transactions.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#171717]">02 / Spatial Strategy</span>
            <p className="text-sm font-light text-gray-500 leading-relaxed">
              We understand materials, layout, and structural proportions. We guide investors to locations that offer high ROI, architectural distinction, and human-centric living.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#171717]">03 / Local Roots, Global Standards</span>
            <p className="text-sm font-light text-gray-500 leading-relaxed">
              While we operate with a PAN-India investor network, our deep knowledge of Rajasthan's specific land laws, regulatory clearances, and developer histories makes us local experts.
            </p>
          </div>
        </div>

        {/* CTA section */}
        <div className="border-t border-[rgba(23,23,23,0.08)] pt-16 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Ready to begin?</span>
            <h3 className="text-2xl font-sans font-light text-[#171717]">Connect with Mr. Ramlal Narwani & the team.</h3>
          </div>
          <TransitionLink href="/contact" className="px-6 py-4 bg-[#171717] text-[#F3F1EB] text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Start A Project
          </TransitionLink>
        </div>

      </div>
    </div>
  )
}
