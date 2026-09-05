'use client'

import { TransitionLink } from '@/components/PageTransition'
import Image from 'next/image'

export default function RentProperty() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 mt-4">
        <span className="section-label">SERVICES / 03</span>
        <h1 className="font-sans font-bold text-4xl md:text-6xl text-[#171717] uppercase tracking-tight leading-none">
          Rent & Lease
        </h1>
        <p className="body-large text-gray-500 font-light leading-relaxed">
          Premium rental homes, corporate executive suites, and commercial office leasing backed by structured, transparent lease agreements.
        </p>

        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#171717]">
          <Image
            src="/images/project_office.png"
            alt="Renting and leasing property Jaipur Rajasthan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-base">
          <h2 className="text-2xl font-medium font-sans">Leasing & Landlord Solutions</h2>
          <p>
            Realty Chamber bridges high-end tenants (including corporate groups and executive professionals) with premium properties across Jaipur. We manage high-quality rental listings, ensuring fair valuation and absolute transparency in rental agreements.
          </p>
          <p>
            For commercial clients, we aggregate office spaces, retail showrooms, and warehouse hubs, ensuring favorable lease terms, security deposit safety, and strict compliance with local rental laws.
          </p>

          <h3 className="text-xl font-medium font-sans mt-4">Corporate & Retail Leasing Specialities</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-600">
            <li><strong>Executive Housing:</strong> Vetted rental apartments, penthouses, and builder floors in prime locations like Malviya Nagar.</li>
            <li><strong>Commercial Office aggregations:</strong> Strategic offices and workspaces for corporate expansions in Jaipur.</li>
            <li><strong>Contractual Clarity:</strong> Complete legal draftings, registration assistance, and renewal management.</li>
          </ul>
        </div>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 flex flex-wrap gap-4 justify-between items-center">
          <TransitionLink href="/services" className="btn-secondary px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-wider">
            ← Back to Services
          </TransitionLink>
          <TransitionLink href="/contact" className="btn-primary px-7 py-3.5 rounded-full text-xs font-bold tracking-wider">
            Enquire to Lease
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
