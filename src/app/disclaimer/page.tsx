'use client'

import { TransitionLink } from '@/components/PageTransition'

export default function Disclaimer() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8 mt-12 text-[#171717] font-light leading-relaxed text-sm">
        <span className="section-label">LEGAL PROFILE</span>
        <h1 className="font-sans font-bold text-4xl text-[#171717] uppercase tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Last Updated: August 2026
        </p>

        <div className="divider my-4" />

        <p>
          The information contained on this website is for general informational purposes only. While Realty Chamber (operating under the leadership of Mr. Ramlal Narwani since 1995) makes every effort to ensure the accuracy and completeness of the listings and data provided, we make no representations or warranties of any kind, express or implied, regarding their completeness, reliability, or availability.
        </p>
        
        <p>
          <strong>Property Details:</strong> Any architectural details, floor plans, dimensions, location maps, photos, and prices shown are indicative and subject to change. Vetted RERA numbers, municipal sanctions, and legal titles must be cross-verified before signing binding sale deeds or joint venture contracts.
        </p>

        <p>
          <strong>Affiliations:</strong> Mr. Ramlal Narwani is the founder of Realty Chamber (established 1995, Malviya Nagar, Jaipur) and is also associated with Bhawana Enterprises. These represent separate, independent business brands and legal entities, each operating with distinct contact details, portfolios, and terms of service.
        </p>

        <p>
          For specific legal consultations or verified title reports, please contact our advisors directly.
        </p>

        <div className="border-t border-[rgba(23,23,23,0.08)] pt-8 mt-8">
          <TransitionLink href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">
            ← Back to Home
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}
