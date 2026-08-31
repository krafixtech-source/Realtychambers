'use client'

import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function PurchaseProperty() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 mt-12">
        <span className="section-label">SERVICES / 02</span>
        <h1 className="font-sans font-bold text-4xl md:text-6xl text-[#171717] uppercase tracking-tight leading-none">
          Purchase Property
        </h1>
        <p className="body-large text-gray-500 font-light leading-relaxed">
          Find your next verified home or investment. We connect buyers with premium residential plots, luxury villas, and commercial showrooms at Jaipur's prime zones.
        </p>

        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_interior.png"
            alt="Purchasing property Jaipur Rajasthan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-base">
          <h2 className="text-2xl font-medium font-sans">Acquisition & Title Vetting</h2>
          <p>
            Acquiring real estate in Jaipur requires deep market intelligence. Realty Chamber offers custom purchase advice, sourcing verified off-market inventories and major developer launch projects, including Mahima Group, Vardhman, and Mangalam.
          </p>
          <p>
            Whether you require residential floors, commercial showrooms, industrial warehouses, or agricultural farmland, our consultancy team performs in-depth title due diligence to ensure zero disputes and hassle-free legal registration.
          </p>

          <h3 className="text-xl font-medium font-sans mt-4">Buyer Support Capabilities</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-600">
            <li><strong>Exclusive Inventories:</strong> Vetted luxury villas, high-yield commercial showrooms, and strategic plots.</li>
            <li><strong>Title Clearance audits:</strong> 100% transparent verification of registry trails, land conversions, and NOC checks.</li>
            <li><strong>Negotiation and Closures:</strong> Honest valuation checks to ensure you buy at fair market prices.</li>
          </ul>
        </div>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 flex justify-between items-center">
          <TransitionLink href="/services" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">
            ← Back to Services
          </TransitionLink>
          <TransitionLink href="/properties" className="px-6 py-3 bg-[#171717] text-[#F3F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Explore Properties
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
