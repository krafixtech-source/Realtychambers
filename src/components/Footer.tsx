'use client'

import { TransitionLink as Link } from './PageTransition'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#F3F1EB] pt-24 pb-8 border-t border-[rgba(23,23,23,0.08)] px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Realty Chamber Logo" className="w-8 h-8 object-contain rounded-full border border-[rgba(23,23,23,0.08)]" />
              <span className="font-sans font-bold text-sm tracking-[0.25em] text-[#171717]">
                REALTY CHAMBER
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-[250px] leading-relaxed">
              Your trusted single-window real estate advisory in Jaipur & Rajasthan. Bringing integrity, title transparency, and market expertise since 1995.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-semibold">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 text-xs font-medium text-[#171717]">
              <li><Link href="/" className="hover:text-gray-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gray-500 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gray-500 transition-colors">Our Services</Link></li>
              <li><Link href="/properties" className="hover:text-gray-500 transition-colors">Properties</Link></li>
              <li><Link href="/luxury" className="hover:text-gray-500 transition-colors">Luxury Collection</Link></li>
            </ul>
          </div>

          {/* Col 3: Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-semibold">
              Social Links
            </span>
            <ul className="flex flex-col gap-2 text-xs font-medium text-[#171717]">
              <li><a href="https://facebook.com/realtychamber" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">Facebook</a></li>
              <li><a href="https://twitter.com/realtychamber" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">Twitter / X</a></li>
              <li><a href="https://linkedin.com/in/realty-chamber-425b10140" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">LinkedIn</a></li>
              <li><a href="https://youtube.com/channel/UCWD-E8S4AJH08QNpKGaaZKA" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">YouTube</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Address */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-semibold">
              Offices
            </span>
            <div className="text-xs text-[#171717] flex flex-col gap-1 leading-relaxed">
              <span className="font-semibold">Malviya Nagar Studio</span>
              <span>10/615, Malviya Nagar,</span>
              <span>Jaipur – 302017, Rajasthan</span>
              <a href="tel:+919829066382" className="mt-2 font-medium hover:underline">+91 98290 66382</a>
              <a href="mailto:info@realtychamber.com" className="font-medium hover:underline">info@realtychamber.com</a>
            </div>
          </div>
        </div>

        {/* Middle Segment: Legal Links and copyright */}
        <div className="border-t border-[rgba(23,23,23,0.06)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-gray-400 font-medium uppercase tracking-[0.08em]">
          <div>
            <span>© {currentYear} Realty Chamber. All Rights Reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/disclaimer" className="hover:text-[#171717] transition-colors">Disclaimer</Link>
            <Link href="/terms" className="hover:text-[#171717] transition-colors">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-[#171717] transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Giant Typographic Wordmark */}
        <div className="w-full text-center mt-12 select-none pointer-events-none translate-y-4">
          <h2 className="text-[13vw] font-bold tracking-[-0.04em] text-[#171717]/[0.02] uppercase leading-none font-sans">
            REALTY CHAMBER
          </h2>
        </div>
      </div>
    </footer>
  )
}
