'use client'

import { useEffect, useState } from 'react'
import { TransitionLink as Link } from './PageTransition'
import { Menu, X, Landmark } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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
    { name: 'Journal', href: '/blog' },
  ]

  const activeColorClass = isScrolled ? 'text-[#171717]' : 'text-white'
  const activeLinkClass = isScrolled 
    ? 'text-[#171717]/70 hover:text-[#171717]' 
    : 'text-white/70 hover:text-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-transparent py-4' 
            : 'bg-transparent py-6'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link href="/" className={`flex items-center gap-3 transition-colors duration-300 ${activeColorClass}`}>
            <img
              src="/logo.png"
              alt="Realty Chamber Logo"
              className={`w-8 h-8 object-contain rounded-full border transition-all duration-300 ${
                isScrolled ? 'border-black/10' : 'border-white/15'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase">
                REALTY CHAMBER
              </span>
              <span className={`text-[8px] tracking-[0.1em] uppercase font-light transition-colors ${isScrolled ? 'text-neutral-500' : 'text-white/50'}`}>
                Jaipur
              </span>
            </div>
          </Link>

          {/* Center: Glassmorphism Blur Capsule Menu */}
          <div 
            className={`hidden md:flex items-center px-6 py-2.5 rounded-full border transition-all duration-500 shadow-md ${
              isScrolled 
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
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-4 ${isScrolled ? 'bg-[#171717]' : 'bg-white'}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Free Consultation pill button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20property%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className={`font-sans font-semibold px-6 py-2.5 rounded-full text-[12px] tracking-[0.05em] uppercase transition-all duration-300 ${
                isScrolled 
                  ? 'bg-transparent text-[#171717] border border-[#171717]/30 hover:bg-[#171717]/5 shadow-none' 
                  : 'bg-white text-black hover:bg-neutral-200 shadow-md'
              }`}
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none p-2 rounded-full border transition-colors ${
                isScrolled 
                  ? 'text-[#171717] border-[rgba(23,23,23,0.08)] bg-white/40' 
                  : 'text-white border-white/10 bg-[#171717]/40'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-[#0B0B0B] z-40 transition-transform duration-700 ease-in-out md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-serif italic text-white hover:text-gray-300 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
            Confidential Enquiries
          </span>
          <div className="flex flex-col gap-2">
            <a href="tel:+919829066382" className="text-lg font-light text-white hover:underline">
              +91 98290 66382
            </a>
            <a href="mailto:info@realtychamber.com" className="text-lg font-light text-white hover:underline">
              info@realtychamber.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
