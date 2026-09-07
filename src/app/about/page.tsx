'use client'

import Image from 'next/image'
import { TransitionLink } from '@/components/PageTransition'

export default function About() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
        
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-[850px] mt-4">
          <span className="section-label">01 — STUDIO PROFILE</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            WE INTEGRATE<br />HERITAGE &<br />MODERNITY.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6 leading-relaxed">
            Realty Chamber was established in 1995 in Jaipur, Rajasthan, under the leadership of Mr. Ramlal Narwani. For over three decades, we have served as a leading single-window consultancy, facilitating landmark real estate developments, joint ventures, and premium asset acquisitions.
          </p>
        </div>

        {/* Founder Profile & Leadership Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center border-t border-[rgba(23,23,23,0.08)] pt-16">
          
          {/* Left Column: Founder Photo Card */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto overflow-hidden bg-white rounded-2xl shadow-xl border border-black/10 group cursor-pointer">
              <Image
                src="/images/founder.png"
                alt="Mr. Ramlal Narwani - Founder & Managing Director, Realty Chamber"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-left max-w-[480px] mx-auto w-full px-1">
              <h3 className="text-xl font-bold text-[#171717] tracking-tight">Mr. Ramlal Narwani</h3>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Founder & Managing Director</span>
            </div>
          </div>

          {/* Right Column: Founder Narrative & Vision */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400">
                LEADERSHIP & LEGACY SINCE 1995
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-[#171717] leading-tight">
                "Real estate advisory is built on trust, relationships, and enduring legacy."
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-base sm:text-lg font-light leading-relaxed text-[#171717]">
              <p>
                Founded in 1995 by Mr. Ramlal Narwani, Realty Chamber began with a vision to bring absolute transparency, single-window advisory, and structural discipline to Rajasthan’s real estate landscape.
              </p>
              <p>
                Over three decades, Mr. Narwani has personally guided high-net-worth investors, landmark developers, and institutions across Jaipur, structuring key joint ventures, commercial aggregations, and heritage acquisitions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-black/10">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#171717]">30+</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Years of Leadership</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#171717]">100%</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Title Audit Verification</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#171717]">26+</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Developer Partners</span>
              </div>
            </div>
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

        {/* CTA Section */}
        <div className="border-t border-[rgba(23,23,23,0.08)] pt-16 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Ready to begin?</span>
            <h3 className="text-2xl font-sans font-light text-[#171717]">Connect with Mr. Ramlal Narwani & the team.</h3>
          </div>
          <TransitionLink href="/contact" className="btn-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all">
            Start A Project
          </TransitionLink>
        </div>

      </div>
    </div>
  )
}
