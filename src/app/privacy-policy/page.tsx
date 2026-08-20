'use client'

import { TransitionLink } from '@/components/PageTransition'

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8 mt-12 text-[#171717] font-light leading-relaxed text-sm">
        <span className="section-label">LEGAL PROFILE</span>
        <h1 className="font-sans font-bold text-4xl text-[#171717] uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Last Updated: August 2026
        </p>

        <div className="divider my-4" />

        <p>
          Realty Chamber is committed to ensuring that your privacy is protected. This privacy policy sets out how we use and protect any information that you provide when using this website.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">1. Information We Collect</h2>
        <p>
          We may collect personal details, including your name, email address, telephone number, and specific property interests, when you submit a mandate request or enquiry form on our site.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">2. How We Use the Information</h2>
        <p>
          We use this information to understand your requirements and provide you with personalized real estate advisory solutions. We will never sell, distribute, or lease your personal information to third parties unless we have your explicit permission or are required by law to do so.
        </p>

        <h2 className="text-lg font-medium font-sans mt-4">3. Data Security</h2>
        <p>
          We have implemented suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
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
