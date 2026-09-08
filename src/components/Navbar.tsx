'use client'

import { useEffect, useState } from 'react'
import { TransitionLink as Link } from './PageTransition'
import { Menu, X } from 'lucide-react'
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

  const activeColorClass = (isScrolled || !isHome || mobileMenuOpen) ? 'text-[#171717]' : 'text-white'
  const activeLinkClass = (isScrolled || !isHome)
    ? 'text-[#171717]/70 hover:text-[#171717]' 
    : 'text-white/70 hover:text-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          (isScrolled || !isHome || mobileMenuOpen)
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
                (isScrolled || !isHome || mobileMenuOpen) ? 'border-black/10' : 'border-white/15'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase">
                REALTY CHAMBER
              </span>
              <span className={`text-[8px] tracking-[0.1em] uppercase font-light transition-colors ${(isScrolled || !isHome || mobileMenuOpen) ? 'text-neutral-500' : 'text-white/50'}`}>
                Jaipur
              </span>
            </div>
          </Link>

          {/* Center: Glassmorphism Blur Capsule Menu (Desktop Only) */}
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

          {/* Right Side: Free Consultation (Desktop Only) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Free Consultation Button - Hidden on Mobile, Visible on Desktop */}
            <a
              href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20property%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:inline-flex ${
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
                  (isScrolled || !isHome || mobileMenuOpen)
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

      {/* Mobile Menu Drawer - Website Cream Background (#F3F1EB) & Compact Height */}
      <div
        className={`fixed top-0 left-0 w-full z-40 bg-[#F3F1EB] text-[#171717] border-b border-black/15 shadow-2xl rounded-b-3xl transition-all duration-500 ease-in-out lg:hidden flex flex-col justify-between p-6 pt-24 max-h-[82vh] overflow-y-auto ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans font-medium text-[#171717] hover:text-gray-500 transition-colors duration-300 border-b border-black/5 pb-2.5 flex items-center justify-between"
            >
              <span>{link.name}</span>
              <span className="text-xs text-gray-400 font-mono">→</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-black/10 pt-5 flex flex-col gap-3 mt-4">
          <a
            href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20property%20in%20Jaipur."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
          >
            Free Consultation on WhatsApp
          </a>

          <div className="flex justify-between items-center pt-2">
            <a href="tel:+919829066382" className="text-xs font-semibold text-[#171717] hover:underline">
              +91 98290 66382
            </a>
            <a href="mailto:info@realtychamber.com" className="text-xs font-semibold text-[#171717] hover:underline">
              info@realtychamber.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
