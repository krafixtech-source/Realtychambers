'use client'

import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function CorporateConsultancy() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 mt-12">
        <span className="section-label">SERVICES / 06</span>
        <h1 className="font-sans font-bold text-4xl md:text-6xl text-[#171717] uppercase tracking-tight leading-none">
          Corporate Consultancy
        </h1>
        <p className="body-large text-gray-500 font-light leading-relaxed">
          Strategic real estate market analysis, institutional land aggregation, and deep legal due diligence across Rajasthan.
        </p>

        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_office.png"
            alt="Corporate real estate consultancy Jaipur Rajasthan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-base">
          <h2 className="text-2xl font-medium font-sans">Institutional Planning & Strategy</h2>
          <p>
            Realty Chamber supports institutional investors, developers, and corporate groups navigating the complex land-buying and development landscape in Jaipur. We deliver research-backed recommendations to minimize regulatory risks and maximize investment yield.
          </p>
          <p>
            Our services include aggregating large-acre land parcels for industrial warehousing, retail developments, or housing projects. We perform comprehensive title checks, coordinate municipal and state approvals, and conduct spatial audits.
          </p>

          <h3 className="text-xl font-medium font-sans mt-4">Consultancy Scope</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-600">
            <li><strong>Land Aggregation:</strong> Assembling strategic parcel blocks for developers with verified title clearances.</li>
            <li><strong>Industrial Logistics & PEB Sheds:</strong> Sourcing and structuring heavy manufacturing facilities, warehouses, and logistics hubs across RIICO industrial growth zones.</li>
            <li><strong>Agricultural & Farmhouse Land:</strong> Facilitating large-scale agricultural acquisitions, farmhouse aggregations, and eco-retreat land setups.</li>
            <li><strong>Legal & Regulatory Audits:</strong> Conducting title verifications, non-agricultural land conversions (90A), and RERA audits.</li>
            <li><strong>Feasibility Studies:</strong> ROI calculations, zoning evaluations, and demographic research for commercial assets.</li>
          </ul>

          {/* Industrial Capabilities Gallery */}
          <div className="flex flex-col gap-4 mt-8">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Industrial & Warehousing Sourcing Portfolio</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 group">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717]">
                  <Image
                    src="/images/industrial_exterior.jpg"
                    alt="Modern PEB Logistics Warehouse Facility"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#171717]">Modern PEB Warehouse Facility</span>
                  <span className="text-gray-400">Industrial RIICO Corridors</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717]">
                  <Image
                    src="/images/industrial_interior.jpg"
                    alt="Heavy Industrial Shed Bay Facility"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#171717]">High-Bay Industrial Shed Facility</span>
                  <span className="text-gray-400">Industrial Growth Zones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agricultural Capabilities Gallery */}
          <div className="flex flex-col gap-4 mt-8">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Agricultural Land & Farmhouse Aggregation Portfolio</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 group">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717]">
                  <Image
                    src="/images/agriculture_golden.jpg"
                    alt="Prime Agricultural Farm Lands"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#171717]">Prime Agricultural Land Sourcing</span>
                  <span className="text-gray-400">Rajasthan Agri Belts</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717]">
                  <Image
                    src="/images/agriculture_green.jpg"
                    alt="Lush Agri-Zone & Farmhouse Estates"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#171717]">Lush Farmhouse & Agri-Estate Advisory</span>
                  <span className="text-gray-400">Rural & Farmhouse Corridors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 flex justify-between items-center">
          <TransitionLink href="/services" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">
            ← Back to Services
          </TransitionLink>
          <TransitionLink href="/contact" className="px-6 py-3 bg-[#171717] text-[#F3F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Request Advisory Consultation
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
