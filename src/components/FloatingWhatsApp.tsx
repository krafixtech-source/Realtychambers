'use client'

import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I'd%20like%20to%20inquire%20about%20properties."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Realty Chamber on WhatsApp"
      className="fixed bottom-6 left-6 z-[9990] flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group border border-white/20"
    >
      <WhatsAppIcon size={24} className="fill-white transition-transform group-hover:rotate-12" />
    </a>
  )
}
