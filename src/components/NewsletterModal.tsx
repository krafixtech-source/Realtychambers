'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { submitLeadToDatabaseAndW3Forms } from '@/lib/submitLead'

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Schedule next popup 20 seconds after closing or submitting
  const scheduleNextPopup = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsOpen(true)
    }, 20000) // 20 seconds delay
  }

  useEffect(() => {
    // Initial popup delay when user opens website
    const initialTimer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => {
      clearTimeout(initialTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setSubmitted(false)
    scheduleNextPopup()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !mobile) return

    // Submit lead to Supabase & W3Forms
    submitLeadToDatabaseAndW3Forms({
      email: email,
      phone: mobile,
      source: 'newsletter_modal',
      message: 'Subscribed to Rajasthan Real Estate Newsletter & Advisory',
    })

    // Mark as submitted
    setSubmitted(true)

    // Automatically close modal after showing thank you message and re-arm timer
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setEmail('')
      setMobile('')
      scheduleNextPopup()
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      
      {/* Responsive Modal Container (max-w-[900px]) with Cream Background */}
      <div 
        className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-[#F3F1EB] text-[#171717] rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 flex flex-col md:flex-row transform transition-all duration-300 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cut / Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/20 md:bg-black/10 text-[#171717] hover:bg-black/30 border border-black/10 transition-all cursor-pointer group shadow-sm"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:scale-110 transition-transform"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Top/Left Light-Colored Image Visual Banner - Visible & Responsive on Mobile */}
        <div className="relative w-full md:w-5/12 h-44 sm:h-52 md:h-auto min-h-[180px] sm:min-h-[220px] md:min-h-[360px] overflow-hidden bg-[#E8E5DC]">
          <Image
            src="/images/project_residence.png"
            alt="Realty Chamber Rajasthan Advisory"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover opacity-95 scale-105 hover:scale-100 transition-transform duration-700"
            priority
          />
          {/* Soft Vignette Overlay keeping image light and vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:from-black/60 md:to-black/10" />
          
          <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20 inline-block mb-1 sm:mb-2">
              PRIVATE ADVISORY NETWORK
            </span>
            <p className="text-xs sm:text-sm text-white/90 font-light leading-snug">
              Curated Off-Market Properties & Investment Reports
            </p>
          </div>
        </div>

        {/* Bottom/Right Content & Form */}
        <div className="relative w-full md:w-7/12 p-5 sm:p-8 md:p-10 flex flex-col justify-center bg-[#F3F1EB]">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center text-xl sm:text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-[#171717] tracking-tight">Thank You!</h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-[280px] leading-relaxed">
                You’re now subscribed to our private real estate advisory network.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-gray-500 block mb-1">
                  NEWSLETTER & ADVISORY
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#171717] leading-tight">
                  Get Rajasthan Real Estate Updates
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2.5 leading-relaxed">
                  Join Rajasthan’s top property investors. Receive direct alerts on high-yield assets, JV deals & advisory reports.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                {/* Mobile Number Field */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-600 block mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98290 66382"
                    className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-[#171717] placeholder:text-gray-400 focus:outline-none focus:border-black/60 focus:ring-1 focus:ring-black/20 transition-all shadow-sm"
                  />
                </div>

                {/* Email Address Field */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-600 block mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-[#171717] placeholder:text-gray-400 focus:outline-none focus:border-black/60 focus:ring-1 focus:ring-black/20 transition-all shadow-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-1 w-full bg-[#171717] text-[#F3F1EB] hover:bg-black font-bold py-3 sm:py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  Get Exclusive Access
                  <span className="text-sm">→</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
