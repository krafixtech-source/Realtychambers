'use client'

import { useEffect, useState } from 'react'
import { TransitionLink as Link } from './PageTransition'
import { Menu, X, Landmark } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1800) // Trigger after loading screen fades

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Luxury', href: '/luxury' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const activeColorClass = (isScrolled || !isHome) ? 'text-[#171717]' : 'text-white'
  const activeLinkClass = (isScrolled || !isHome)
    ? 'text-[#171717]/70 hover:text-[#171717]' 
    : 'text-white/70 hover:text-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          (isScrolled || !isHome)
            ? 'bg-[#F3F1EB]/95 backdrop-blur-md border-b border-[rgba(23,23,23,0.08)] py-4 shadow-sm' 
            : 'bg-transparent py-6'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link href="/" className={`flex items-center gap-3 transition-colors duration-300 ${activeColorClass}`}>
            <img
              src="/logo.png"
              alt="Realty Chamber Logo"
              className={`w-8 h-8 object-contain rounded-full border transition-all duration-300 ${
                (isScrolled || !isHome) ? 'border-black/10' : 'border-white/15'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase">
                REALTY CHAMBER
              </span>
              <span className={`text-[8px] tracking-[0.1em] uppercase font-light transition-colors ${(isScrolled || !isHome) ? 'text-neutral-500' : 'text-white/50'}`}>
                Jaipur
              </span>
            </div>
          </Link>

          {/* Center: Glassmorphism Blur Capsule Menu */}
          <div 
            className={`hidden lg:flex items-center px-6 py-2.5 rounded-full border transition-all duration-500 shadow-md ${
              (isScrolled || !isHome)
                ? 'bg-black/5 backdrop-blur-md border-black/10' 
                : 'bg-white/10 backdrop-blur-md border-white/15'
            }`}
          >
            <div className="flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 relative group ${activeLinkClass}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-4 ${(isScrolled || !isHome) ? 'bg-[#171717]' : 'bg-white'}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Free Consultation & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20property%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex ${
                (isScrolled || !isHome)
                  ? 'btn-primary px-5 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-[12px]' 
                  : 'btn-secondary px-5 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-[12px]'
              }`}
            >
              Free Consultation
            </a>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`focus:outline-none p-2.5 rounded-full border transition-all cursor-pointer ${
                  (isScrolled || !isHome)
                    ? 'bg-[#171717] text-[#F3F1EB] border-[#171717] hover:bg-[#2A2D26] shadow-sm' 
                    : 'bg-white/90 text-[#171717] border-white hover:bg-white shadow-md'
                }`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-[#0B0B0B] z-40 transition-transform duration-700 ease-in-out lg:hidden flex flex-col justify-between p-6 sm:p-8 pt-24 sm:pt-28 overflow-y-auto ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl sm:text-4xl font-serif italic text-white hover:text-gray-300 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-4 mt-8">
          <a
            href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20property%20in%20Jaipur."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
          >
            Free Consultation on WhatsApp
          </a>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mt-2">
            Confidential Enquiries
          </span>
          <div className="flex flex-col gap-2">
            <a href="tel:+919829066382" className="text-base sm:text-lg font-light text-white hover:underline">
              +91 98290 66382
            </a>
            <a href="mailto:info@realtychamber.com" className="text-base sm:text-lg font-light text-white hover:underline">
              info@realtychamber.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
