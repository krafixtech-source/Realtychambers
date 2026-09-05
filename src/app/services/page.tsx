'use client'

import { ArrowUpRight } from 'lucide-react'
import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function ServicesHub() {
  const serviceList = [
    {
      num: '01',
      title: 'Sell Property',
      slug: 'sell',
      tag: 'Property Sales & Marketing',
      desc: 'Maximize your asset value with our vetted buyer network, architectural highlights, and aggressive marketing across Jaipur.',
    },
    {
      num: '02',
      title: 'Purchase Property',
      slug: 'purchase',
      tag: 'Buying & Acquisitions',
      desc: 'Find premium flats, independent builder floors, plots, and villas at Jaipur’s prime spots, fully vetted for legal titles.',
    },
    {
      num: '03',
      title: 'Rent & Lease',
      slug: 'rent',
      tag: 'Leasing & Rental Services',
      desc: 'High-end residential leases, luxury corporate suites, and office leasing with transparent agreements and complete checks.',
    },
    {
      num: '04',
      title: 'Joint Venture (JV)',
      slug: 'joint-venture',
      tag: 'High-ROI Partnerships',
      desc: 'Bridging prominent landowners with Rajasthan’s top developers for high-return joint development projects.',
    },
    {
      num: '05',
      title: 'Property Exchange',
      slug: 'exchange',
      tag: 'Portfolio Pivot & Upgrades',
      desc: 'Pivot your real estate holdings. Exchange underperforming land or residential properties for high-yield assets.',
    },
    {
      num: '06',
      title: 'Corporate Consultancy',
      slug: 'consultancy',
      tag: 'Strategic Advisory & Evaluation',
      desc: 'In-depth market evaluations, title checks, legal clearances, and spatial planning audits for institutional clients.',
    },
  ]

  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 mt-4">
        
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="section-label">02 — CORE CAPABILITIES</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            OUR SERVICE<br />PORTFOLIO.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6">
            Providing structured, single-window real estate advisory solutions across Rajasthan. From title verification to joint venture contracts, we ensure absolute transparency.
          </p>
        </div>

        {/* Big visual banner */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_restaurant.png"
            alt="Realty Chamber Jaipur services page banner"
            fill
            className="object-cover"
          />
        </div>

        {/* Services Rows list */}
        <div className="flex flex-col border-t border-[rgba(23,23,23,0.08)]">
          {serviceList.map((svc) => (
            <TransitionLink
              key={svc.title}
              href={`/services/${svc.slug}`}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-[rgba(23,23,23,0.08)] hover:bg-[#171717] hover:px-6 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-400">{svc.num}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-gray-400 font-semibold">
                    {svc.tag}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-sans font-light text-[#171717] group-hover:text-[#F3F1EB] transition-colors duration-300">
                    {svc.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 md:mt-0 max-w-[450px]">
                <p className="text-sm font-light text-gray-500 group-hover:text-gray-400 leading-relaxed">
                  {svc.desc}
                </p>
                <ArrowUpRight className="text-[#171717] group-hover:text-[#F3F1EB] group-hover:rotate-45 transition-transform duration-300 flex-shrink-0" size={24} />
              </div>
            </TransitionLink>
          ))}
        </div>

        {/* Additional Capabilities details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[rgba(23,23,23,0.08)] pt-16 pb-8">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#171717] font-semibold">
              Additional Consultancies
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 text-sm font-light leading-relaxed text-[#171717]/80">
            <p>
              Beyond our six primary pillars, we facilitate structured land aggregation, industrial setups (factories and warehouses), agricultural farmhouse setups, registry dispute settlements, and operate heritage restorations with institutions.
            </p>
            <p>
              Connect with our team to discuss customized real estate mandates in Rajasthan.
            </p>
            <TransitionLink href="/contact" className="btn-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest mt-4 inline-flex items-center justify-center gap-2 max-w-fit shadow-md transition-all">
              Schedule Corporate Advisory Session →
            </TransitionLink>
          </div>
        </div>

      </div>
    </div>
  )
}
