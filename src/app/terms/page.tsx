'use client'

import { TransitionLink } from '@/components/PageTransition'

export default function TermsAndConditions() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8 mt-12 text-[#171717] font-light leading-relaxed text-sm">
        <span className="section-label">LEGAL PROFILE</span>
        <h1 className="font-sans font-bold text-4xl text-[#171717] uppercase tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Last Updated: August 2026
        </p>

        <div className="divider my-4" />

        <p>
          Welcome to Realty Chamber. By accessing and browsing this website, you agree to comply with and be bound by the following terms of use, which govern Realty Chamber’s relationship with you in relation to this website.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">1. Use of the Site</h2>
        <p>
          The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">2. Brokerage & Services</h2>
        <p>
          Realty Chamber operates as a licensed real estate consultancy based in Jaipur, Rajasthan. Standard service fees, facilitation charges, or commission terms apply to all transactions, sales, leases, or joint ventures structured through our studio. These are governed by separate, signed mandate agreements.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">3. Governing Law</h2>
        <p>
          Your use of this website and any dispute arising out of such use is subject to the laws of India, under the jurisdiction of the courts in Jaipur, Rajasthan.
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
