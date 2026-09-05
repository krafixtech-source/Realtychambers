'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TransitionLink } from '@/components/PageTransition'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Floating services image refs
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Floating journal image refs
  const [hoveredJournal, setHoveredJournal] = useState<number | null>(null)
  const [journalMousePos, setJournalMousePos] = useState({ x: 0, y: 0 })

  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    // Reset scroll trigger
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      // 1. Hero Scale Parallax
      gsap.to('.hero-bg', {
        scrollTrigger: {
          trigger: '.hero-sec',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        scale: 1.15,
        yPercent: 12,
        ease: 'none',
      })

      // Hero Title Fade/Translation reveal
      gsap.fromTo('.hero-reveal', 
        { opacity: 0, y: 80 }, 
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 2.2 }
      )

      // 2. Intro Statement Text reveal (Word by Word)
      const introWords = document.querySelectorAll('.intro-word')
      if (introWords.length > 0) {
        gsap.fromTo(introWords,
          { opacity: 0.15, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            scrollTrigger: {
              trigger: '.intro-sec',
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: true,
            }
          }
        )
      }

      // 3. Selected Work reveals (scroll reveals for cards)
      const projectItems = document.querySelectorAll('.project-card')
      projectItems.forEach((item) => {
        const img = item.querySelector('.project-img-wrap')
        const details = item.querySelector('.project-details')
        if (img && details) {
          gsap.fromTo(img, 
            { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.08 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: 1.2,
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
          gsap.fromTo(details, 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

      // 4. Horizontal Showcase Pinning Scroll (Desktop Only)
      const horizSec = document.querySelector('.horizontal-sec')
      const horizTrack = document.querySelector('.horizontal-track')
      if (horizSec && horizTrack) {
        let mm = gsap.matchMedia()

        mm.add("(min-width: 1024px)", () => {
          const getPinWidth = () => horizTrack.scrollWidth - window.innerWidth
          gsap.to(horizTrack, {
            x: () => -getPinWidth(),
            ease: 'none',
            scrollTrigger: {
              trigger: horizSec,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getPinWidth()}`,
              invalidateOnRefresh: true,
            }
          })

          // Parallax image inside panels
          const panelImgs = document.querySelectorAll('.panel-img')
          panelImgs.forEach((img) => {
            gsap.to(img, {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: horizSec,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
              }
            })
          })
        })
      }

      // 5. Stat Counter Animators
      const stats = document.querySelectorAll('.stat-counter')
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10)
        gsap.fromTo(stat, 
          { textContent: '0' },
          {
            textContent: target,
            duration: 2.2,
            ease: 'power3.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // 6. Story Section Clip Mask reveal
      const storySec = document.querySelector('.story-sec')
      const storyMask = document.querySelector('.story-mask-img')
      if (storySec && storyMask) {
        gsap.to(storyMask, {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: storySec,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: true,
          }
        })
      }

      // 7. Process Step timeline filling
      const processSec = document.querySelector('.process-sec')
      const progressFill = document.querySelector('.process-bar-fill')
      if (processSec && progressFill) {
        gsap.to(progressFill, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: processSec,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          }
        })

        // Highlight active process node
        const steps = document.querySelectorAll('.process-step-row')
        steps.forEach((step, idx) => {
          gsap.to(step, {
            color: '#171717',
            scrollTrigger: {
              trigger: step,
              start: 'top 45%',
              end: 'bottom 55%',
              toggleActions: 'play reverse play reverse',
              scrub: true,
            }
          })
        })
      }

      // 8. Visual Break Parallax
      gsap.to('.break-bg', {
        scrollTrigger: {
          trigger: '.break-sec',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        scale: 1,
        yPercent: -5,
        ease: 'none',
      })

      // 9. CTA Text Reveal lines
      gsap.fromTo('.cta-line-reveal',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.cta-sec',
            start: 'top 75%',
          }
        }
      )

      // 10. Instagram reveals
      gsap.fromTo('.insta-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.insta-sec',
            start: 'top 80%',
          }
        }
      )

      // 11. Branded Words Roll (Krafix Style)
      const wordsSec = document.querySelector('.words-sec')
      if (wordsSec) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.words-sec',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
        tl.fromTo('.words-realty-roll',
          { yPercent: 0 },
          { yPercent: -30, ease: 'none' },
          0
        )
        tl.fromTo('.words-chamber-roll',
          { yPercent: -30 },
          { yPercent: 0, ease: 'none' },
          0
        )
      }

    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // Floating services image mouse positioning
  const handleServiceMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Floating journal image mouse positioning
  const handleJournalMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setJournalMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const selectedProjects = [
    {
      num: '01',
      title: 'Residential Sourcing & Estates',
      category: 'Residential Advisory',
      location: 'Jaipur & Rajasthan',
      image: '/images/project_residence.png',
      aspect: 'aspect-[4/3]',
      width: 'md:col-span-8 md:col-start-1',
    },
    {
      num: '02',
      title: 'Commercial Spaces & Retail Assets',
      category: 'Commercial Advisory',
      location: 'Rajasthan, India',
      image: '/images/project_interior.png',
      aspect: 'aspect-[4/5]',
      width: 'md:col-span-5 md:col-start-8',
    },
    {
      num: '03',
      title: 'Industrial Logistics & Agri Lands',
      category: 'Industrial & Agri Sourcing',
      location: 'Rajasthan Growth Belts',
      image: '/images/project_concrete.png',
      aspect: 'aspect-[16/9]',
      width: 'md:col-span-9 md:col-start-2',
    },
  ]

  const horizontalProjects = [
    { id: '01', name: 'Luxury Residential Sourcing', loc: 'Jaipur & Rajasthan', year: 'Residential', img: '/images/project_residence.png', position: 'center' },
    { id: '02', name: 'Industrial Warehouses & PEB Sheds', loc: 'Industrial & RIICO Corridors', year: 'Industrial', img: '/images/industrial_exterior.jpg', position: 'center' },
    { id: '03', name: 'Agricultural Land & Farmhouse Aggregations', loc: 'Rural & Agri Belts', year: 'Agricultural', img: '/images/agriculture_golden.jpg', position: 'center 75%' },
    { id: '04', name: 'Heavy Industrial Facilities & Sheds', loc: 'Industrial Growth Zones', year: 'Industrial', img: '/images/industrial_interior.jpg', position: 'center' },
    { id: '05', name: 'Organic Farm & Agri-Estates', loc: 'Rajasthan Agri Zones', year: 'Agricultural', img: '/images/agriculture_green.jpg', position: 'center 85%' },
    { id: '06', name: 'Commercial Showrooms & Offices', loc: 'Commercial Hubs', year: 'Commercial', img: '/images/project_restaurant.png', position: 'center' },
  ]

  const services = [
    { num: '01', title: 'Architecture & Design', desc: 'Sovereign structure and site integration.', img: '/images/project_residence.png' },
    { num: '02', title: 'Industrial & Warehousing', desc: 'Pre-engineered PEB sheds, high-bay bays, and logistics setups.', img: '/images/industrial_interior.jpg' },
    { num: '03', title: 'Spatial Strategy', desc: 'Structured layouts and land optimization consultancies.', img: '/images/project_concrete.png' },
    { num: '04', title: 'Joint Ventures (JV)', desc: 'Strategic developer matching for landmark assets.', img: '/images/project_restaurant.png' },
    { num: '05', title: 'Corporate Advisory', desc: 'Portfolio evaluation, legal checks, and title verifications.', img: '/images/project_office.png' },
  ]

  const timelineSteps = [
    { num: '01', name: 'Discover', label: 'Site evaluation & legal verifications.' },
    { num: '02', name: 'Define', label: 'Formulate budget, joint structures, and asset positioning.' },
    { num: '03', name: 'Design', label: 'Material exploration, geometry, and layout approvals.' },
    { num: '04', name: 'Develop', label: 'Structured liaison, partner developments, and engineering audits.' },
    { num: '05', name: 'Deliver', label: 'Absolute registry clearance, handover, and experience setups.' },
  ]

  const journalArticles = [
    { num: '01', cat: 'Agri & Farm Land', date: 'AUG 2026', title: 'Agricultural land aggregation & organic farmhouse estates in Rajasthan', img: '/images/agriculture_green.jpg', position: 'center 85%' },
    { num: '02', cat: 'Material Studies', date: 'JUL 2026', title: 'Honed limestone as a thermal mass stabilizer', img: '/images/material_detail.png', position: 'center' },
    { num: '03', cat: 'Industrial Scale', date: 'JUN 2026', title: 'Modular PEB engineering and industrial warehousing in Rajasthan', img: '/images/industrial_exterior.jpg', position: 'center' },
  ]

  const instaGrid = [
    { img: '/images/hero_architecture.png', size: 'aspect-square', position: 'center' },
    { img: '/images/industrial_exterior.jpg', size: 'aspect-[3/4]', position: 'center' },
    { img: '/images/agriculture_golden.jpg', size: 'aspect-[4/5]', position: 'center 75%' },
    { img: '/images/industrial_interior.jpg', size: 'aspect-square', position: 'center' },
    { img: '/images/agriculture_green.jpg', size: 'aspect-[4/3]', position: 'center 85%' },
    { img: '/images/project_office.png', size: 'aspect-[3/4]', position: 'center' },
    { img: '/images/material_detail.png', size: 'aspect-square', position: 'center' },
    { img: '/images/architectural_detail.png', size: 'aspect-[4/5]', position: 'center' },
    { img: '/images/project_restaurant.png', size: 'aspect-[3/2]', position: 'center' },
  ]

  const allDeveloperLogos = [
    { name: 'Unique Builders', img: '/images/developers/unique_builders.png' },
    { name: 'Fairmont Hotels', img: '/images/developers/fairmont.png' },
    { name: 'Galaxy Group', img: '/images/developers/galaxy.png' },
    { name: 'Vatika Group', img: '/images/developers/vatika.png' },
    { name: 'Anukampa Group', img: '/images/developers/anukampa.png' },
    { name: 'Ashiana Housing', img: '/images/developers/ashiana.png' },
    { name: 'Chordia Group', img: '/images/developers/chordia.png' },
    { name: 'UDB Group', img: '/images/developers/udb.png' },
    { name: 'Ashadeep Group', img: '/images/developers/ashadeep.png' },
    { name: 'Veto Group', img: '/images/developers/veto.png' },
    { name: 'DMart', img: '/images/developers/dmart.png' },
    { name: 'Hilton Hotels', img: '/images/developers/hilton.png' },
    { name: 'Mahima Group', img: '/images/developers/mahima.png' },
    { name: 'Jayshree Periwal', img: '/images/developers/jpgs.png' },
    { name: 'KGB Group', img: '/images/developers/kgb.png' },
    { name: 'Manglam Group', img: '/images/developers/manglam.png' },
    { name: 'Akshat Group', img: '/images/developers/akshat.png' },
    { name: 'Aashish Group', img: '/images/developers/aashish.png' },
    { name: 'Vardhman Group', img: '/images/developers/vardhman.png' },
    { name: 'Siddha Group', img: '/images/developers/siddha.png' },
    { name: 'Dhanuka Infra', img: '/images/developers/dhanuka.png' },
    { name: 'Frozen Bottle', img: '/images/developers/frozen_bottle.png' },
    { name: 'Gulab Chand', img: '/images/developers/gulab_chand.png' },
    { name: 'Coffee Sutra', img: '/images/developers/coffee_sutra.png' },
    { name: 'Livspace', img: '/images/developers/livspace.png' },
    { name: 'Chai Sutta Bar', img: '/images/developers/chai_sutta_bar.png' },
  ]

  return (
    <div ref={containerRef} className="bg-[#F3F1EB] overflow-hidden">
      
      {/* 1. HERO Cinematic Opening */}
      <section className="hero-sec relative w-full h-screen overflow-hidden flex items-end pb-16 md:pb-24 px-6 md:px-12">
        {/* Parallax Background */}
        <div className="absolute inset-0 w-full h-[115%] top-0 left-0 bg-[#0B0B0B]">
          <Image
            src="/images/hero_architecture.png"
            alt="Realty Chamber Rajasthan Architecture"
            fill
            className="hero-bg object-cover scale-[1.08] opacity-80"
            priority
          />
          {/* Subtle Grain & Overlay */}
          <div className="absolute inset-0 bg-[#171717]/10" />
        </div>

        {/* Kanzo Studio Style Content */}
        {/* Left-Middle Content */}
        <div className="absolute top-1/2 -translate-y-[40%] left-6 md:left-12 z-10 flex flex-col items-start">
          <h1 className="hero-reveal text-white leading-[1.05] tracking-tight font-light mb-8" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            Thoughtful Spaces<br />
            for a <span className="font-serif italic font-light text-white">Refined Lifestyle</span>
          </h1>
          <a
            href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I'd%20like%20to%20book%20a%20call%20to%20discuss%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="hero-reveal bg-white text-[#171717] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#F3F1EB] hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-xl border border-white/20 cursor-pointer"
          >
            Book a call <span className="text-sm">→</span>
          </a>
        </div>

        {/* Bottom Left: Scroll Indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 z-10">
          <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-light">
            ( Scroll )
          </span>
        </div>

        {/* Bottom Right: Floating Project Card */}
        <div className="absolute bottom-8 right-6 md:right-12 z-20 hero-reveal hidden sm:block">
          <div className="bg-white text-black p-3 rounded-2xl shadow-2xl w-[260px] flex flex-col gap-3">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/images/project_residence.png"
                alt="Real Estate Advisory Thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-tight">Real Estate Advisory</h4>
                <span className="text-[10px] text-neutral-400 font-medium">Residential • Commercial • Industrial • Agri</span>
              </div>
              <TransitionLink
                href="/properties"
                className="bg-[#171717] text-[#F3F1EB] hover:bg-[#2A2D26] hover:text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm cursor-pointer"
              >
                View Sectors <span className="text-xs">→</span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Statement Section */}
      <section className="intro-sec w-full min-h-[85vh] flex items-center justify-center py-24 px-6 md:px-12 bg-[#F3F1EB]">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-12">
          <h2 className="font-serif italic font-light text-[#171717] leading-snug max-w-[1100px]" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}>
            {`We create thoughtful environments where architecture, material and human experience come together.`
              .split(' ')
              .map((word, i) => (
                <span key={i} className="intro-word inline-block mr-[0.3em] origin-bottom transition-all duration-300">
                  {word}
                </span>
              ))}
          </h2>
        </div>
      </section>

      {/* 2.5 Developer Collaboration Section - Static Logo Wall Grid */}
      <section className="w-full py-20 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)] relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-400">
                ( COLLABORATION & PARTNERSHIPS )
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717]">
                Collaborating with Rajasthan’s top developers.
              </h2>
            </div>
            <p className="text-xs md:text-sm font-light text-gray-500 max-w-[440px] leading-relaxed">
              Partnering with Rajasthan’s most trusted real estate pioneers, landmark builders, and infrastructure developers to curate high-yield assets and strategic JV opportunities.
            </p>
          </div>

          {/* Compact Logo Wall Grid - All 26 Logos strictly under 4 Rows (7 columns per row) */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-3.5 max-w-[1250px] mx-auto w-full">
            {allDeveloperLogos.map((dev, i) => (
              <div
                key={`logo-wall-${i}`}
                className={`bg-white border border-black/5 hover:border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 rounded-lg sm:rounded-xl aspect-square p-2 sm:p-3 flex items-center justify-center group cursor-pointer relative overflow-hidden ${
                  i === 21 ? 'col-start-2' : ''
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={dev.img}
                    alt={dev.name}
                    fill
                    className="object-contain p-0.5 sm:p-1 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 3. Selected Work */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-16">
          <div className="flex justify-between items-end border-b border-[rgba(23,23,23,0.08)] pb-8">
            <div className="flex flex-col gap-2">

              <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717]">
                Core Advisory Sectors
              </h2>
            </div>
            <TransitionLink href="/properties" className="text-xs uppercase tracking-wider font-semibold border-b border-[#171717] pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
              View All Sectors
            </TransitionLink>
          </div>

          {/* Asymmetric Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
            {selectedProjects.map((project) => (
              <div
                key={project.title}
                className={`project-card flex flex-col gap-6 group cursor-pointer ${project.width}`}
                data-cursor="VIEW"
              >
                <div className="project-img-wrap relative w-full overflow-hidden transition-all duration-500">
                  <div className={`${project.aspect} relative w-full overflow-hidden`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </div>
                
                <div className="project-details flex justify-between items-start pt-2 border-t border-[rgba(23,23,23,0.04)]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{project.num} / {project.category}</span>
                    <h3 className="text-2xl font-sans font-light text-[#171717] transition-all group-hover:translate-x-1">{project.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="metadata-text">{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Horizontal Showcase Gallery */}
      <section className="horizontal-sec relative w-full h-auto lg:h-screen overflow-visible lg:overflow-hidden bg-[#0B0B0B] flex flex-col lg:flex-row lg:items-center py-24 lg:py-0">
        <div className="absolute top-12 left-6 lg:left-12 z-20 flex flex-col gap-1">
          <h2 className="text-xl lg:text-2xl font-sans font-light text-[#F3F1EB]">Sector Portfolio Showcase</h2>
        </div>
        <div className="absolute top-12 right-6 lg:right-12 z-20 hidden lg:block">
          <span className="text-[11px] uppercase tracking-widest text-[#F3F1EB]/50">DRAG OR SCROLL VERTICALLY →</span>
        </div>

        {/* Horizontal scroll track */}
        <div className="horizontal-track flex flex-col lg:flex-row lg:flex-nowrap px-6 lg:pl-12 lg:pr-[30vw] gap-16 lg:gap-12 items-start lg:items-center w-full lg:w-max h-auto lg:h-full">
          {horizontalProjects.map((proj) => (
            <div key={proj.id} className="horizontal-panel w-full lg:w-[45vw] lg:flex-shrink-0 flex flex-col gap-6" data-cursor="VIEW">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#171717]">
                <Image
                  src={proj.img}
                  alt={proj.name}
                  fill
                  style={{ objectPosition: proj.position || 'center' }}
                  className="panel-img object-cover scale-[1.08] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex justify-between items-start text-[#F3F1EB] border-t border-[#F3F1EB]/10 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider text-gray-500 font-semibold">{proj.id} / SECTOR</span>
                  <h3 className="text-xl md:text-2xl font-light font-sans">{proj.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] tracking-wider text-gray-500 font-semibold block">{proj.loc}</span>
                  <span className="text-[11px] tracking-wider text-gray-500 font-semibold block">{proj.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. About / Philosophy split-screen */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Block */}
          <div className="flex flex-col gap-8 md:sticky md:top-32">

            <h3 className="font-serif italic font-light text-[#171717] leading-snug" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              Architecture begins with how a place makes you feel.
            </h3>
            <div className="relative w-full aspect-square md:max-w-[400px] overflow-hidden">
              <Image
                src="/images/material_detail.png"
                alt="Philosophy materials texture"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Block: Studio descriptions & stats */}
          <div className="flex flex-col gap-12 pt-0 md:pt-16">
            <div className="flex flex-col gap-6 text-[#171717] font-light leading-relaxed text-lg max-w-[600px]">
              <p>
                Founded under the visionary leadership of Mr. Ramlal Narwani, Realty Chamber has grown into one of Jaipur’s most respected real estate consultancies since 1995. We bridge buyers, sellers, investors, and premier developer groups with absolute integrity and market expertise.
              </p>
              <p>
                Whether you are seeking independent builder floors, luxury apartments, commercial showrooms, industrial land, or structured Joint Venture partnerships, we streamline every step from site evaluation to legal registration.
              </p>
            </div>

            {/* Stats counter list */}
            <div className="grid grid-cols-2 gap-8 border-t border-[rgba(23,23,23,0.08)] pt-12">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline">
                  <span className="stat-counter text-4xl md:text-6xl font-bold font-sans tracking-tight" data-target="30">0</span>
                  <span className="text-2xl md:text-3xl font-bold font-sans">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Years of Expertise</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline">
                  <span className="stat-counter text-4xl md:text-6xl font-bold font-sans tracking-tight" data-target="20">0</span>
                  <span className="text-2xl md:text-3xl font-bold font-sans">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">PAN-India Networks</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline">
                  <span className="stat-counter text-4xl md:text-6xl font-bold font-sans tracking-tight" data-target="50">0</span>
                  <span className="text-2xl md:text-3xl font-bold font-sans">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Developer Partners</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline">
                  <span className="stat-counter text-4xl md:text-6xl font-bold font-sans tracking-tight" data-target="1000">0</span>
                  <span className="text-2xl md:text-3xl font-bold font-sans">+</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Families Satisfied</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Large Image + Text Story Section */}
      <section className="story-sec w-full py-24 px-6 md:px-12 bg-[#F3F1EB] flex flex-col items-center">
        <div className="relative w-[90vw] h-[75vh] overflow-hidden story-mask-img clip-reveal bg-[#0B0B0B]">
          <Image
            src="/images/human_scale.png"
            alt="Editorial spread architecture and human scale"
            fill
            className="object-cover scale-105"
            sizes="90vw"
          />
          {/* Overlay Text Block */}
          <div className="absolute bottom-12 left-6 md:left-12 z-10 flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F3F1EB]/60">EDITORIAL STORY</span>
            <h3 className="font-serif italic font-light text-[#F3F1EB] text-3xl md:text-5xl leading-tight">
              Material / Light / Form
            </h3>
          </div>
        </div>
      </section>

      {/* 7. Services Section (Interactive Rows) */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-12 relative">

          <div className="flex justify-between items-end border-b border-[rgba(23,23,23,0.08)] pb-8">
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717]">
              Advisory & Spatial Services
            </h2>
            <TransitionLink href="/services" className="text-xs uppercase tracking-wider font-semibold border-b border-[#171717] pb-1 hover:text-gray-500 transition-all">
              View All 12 Services
            </TransitionLink>
          </div>

          {/* Interactive Row List */}
          <div className="flex flex-col w-full relative">
            {services.map((svc, idx) => (
              <div
                key={svc.title}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-[rgba(23,23,23,0.08)] transition-colors duration-500 hover:bg-[#171717] hover:px-4 cursor-pointer"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                onMouseMove={handleServiceMouseMove}
              >
                <div className="flex items-baseline gap-4 md:gap-8 z-10">
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-400">{svc.num}</span>
                  <h3 className="text-3xl md:text-5xl font-sans font-light text-[#171717] group-hover:text-[#F3F1EB] transition-all duration-300 group-hover:translate-x-4">
                    {svc.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 mt-4 md:mt-0 z-10">
                  <span className="text-sm font-light text-gray-500 group-hover:text-gray-400 transition-colors">
                    {svc.desc}
                  </span>
                  <ArrowUpRight className="text-[#171717] group-hover:text-[#F3F1EB] group-hover:rotate-45 transition-transform duration-300" size={24} />
                </div>

                {/* Floating Preview Image */}
                {hoveredService === idx && !isTouchDevice && (
                  <div
                    className="absolute pointer-events-none z-20 w-[240px] aspect-[4/3] overflow-hidden border border-[#F3F1EB]/10 rounded shadow-2xl transition-all duration-150 ease-out"
                    style={{
                      left: `${mousePos.x + 20}px`,
                      top: `${mousePos.y - 120}px`,
                    }}
                  >
                    <Image
                      src={svc.img}
                      alt={svc.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process Section */}
      <section className="process-sec w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Sticky Left Header */}
          <div className="md:col-span-4 md:sticky md:top-32 flex flex-col gap-6 h-fit">

            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717] leading-none">
              How We<br />Work
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest max-w-[220px] font-medium mt-4 leading-relaxed">
              Step-by-step transparency ensures every deal has verified titles and clean handovers.
            </p>
          </div>

          {/* Timeline List on Right */}
          <div className="md:col-span-8 flex relative pl-8 md:pl-16">
            {/* Timeline Progress Bar Line */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-rgba(23,23,23,0.1) bg-gray-200">
              <div className="process-bar-fill w-full h-0 bg-[#171717] transition-all" />
            </div>

            <div className="flex flex-col gap-12 w-full">
              {timelineSteps.map((step) => (
                <div key={step.num} className="process-step-row flex flex-col gap-2 text-gray-400 transition-colors duration-500">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold">{step.num}</span>
                    <h3 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-wide">
                      {step.name}
                    </h3>
                  </div>
                  <p className="text-sm font-light text-gray-500 leading-relaxed max-w-[500px]">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Full-Screen Visual Break Section */}
      <section className="break-sec relative w-full h-[90vh] overflow-hidden flex items-center justify-center bg-[#0B0B0B]">
        <div className="absolute inset-0 w-full h-[120%] top-0 left-0">
          <Image
            src="/images/night_architecture.png"
            alt="Realty Chamber night visual break"
            fill
            className="break-bg object-cover scale-[1.1] opacity-70"
          />
          <div className="absolute inset-0 bg-[#171717]/10" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center gap-4 px-6">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#F3F1EB]/70">07 — SPACE PHILOSOPHY</span>
          <h2 className="font-serif italic font-light text-[#F3F1EB] leading-none" style={{ fontSize: 'clamp(2rem, 6.5vw, 6rem)' }}>
            Form Follows Experience.
          </h2>
        </div>
      </section>

      {/* 10. Selected Project Detail Preview (Case Study) */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-2">

            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717]">
              Casa Nera Case Study
            </h2>
          </div>

          {/* Asymmetric Case Study arrangement */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#171717]">
              <Image
                src="/images/hero_architecture.png"
                alt="Casa Nera large exterior shot"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="md:col-span-4 flex flex-col gap-6 pt-0 md:pt-12">
              <span className="metadata-text">Jaipur / 2026</span>
              <h3 className="text-3xl font-sans font-light text-[#171717]">A study in light, stone and proportion.</h3>
              <p className="text-sm font-light text-gray-500 leading-relaxed">
                Featuring monumental Rajasthan limestone masonry combined with floor-to-ceiling frameless glass portals, Casa Nera represents a seamless spatial dialogue between luxury desert living and geometric concrete forms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
              <Image
                src="/images/project_residence.png"
                alt="Casa Nera living connection"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
              <Image
                src="/images/project_interior.png"
                alt="Casa Nera interior spaces"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Journal / Insights Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-12">

          <div className="flex justify-between items-end border-b border-[rgba(23,23,23,0.08)] pb-8">
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-[#171717]">
              Editorial Journal
            </h2>
            <TransitionLink href="/blog" className="text-xs uppercase tracking-wider font-semibold border-b border-[#171717] pb-1 hover:text-gray-500 transition-all">
              Read All Articles
            </TransitionLink>
          </div>

          <div className="flex flex-col w-full">
            {journalArticles.map((art, idx) => (
              <div
                key={art.title}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-[rgba(23,23,23,0.08)] hover:bg-[#171717] hover:px-4 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredJournal(idx)}
                onMouseLeave={() => setHoveredJournal(null)}
                onMouseMove={handleJournalMouseMove}
              >
                <div className="flex flex-col gap-2 z-10">
                  <span className="text-xs tracking-wider text-gray-400 font-semibold uppercase">{art.num} / {art.cat} — {art.date}</span>
                  <h3 className="text-xl md:text-2xl font-sans font-light text-[#171717] group-hover:text-[#F3F1EB] transition-colors group-hover:translate-x-4">
                    {art.title}
                  </h3>
                </div>
                <ArrowUpRight className="text-[#171717] group-hover:text-[#F3F1EB] mt-4 md:mt-0 transition-transform duration-300 group-hover:rotate-45 z-10" size={24} />

                {/* Floating Preview Image */}
                {hoveredJournal === idx && !isTouchDevice && (
                  <div
                    className="absolute pointer-events-none z-20 w-[240px] aspect-[4/5] overflow-hidden border border-[#F3F1EB]/10 rounded shadow-2xl transition-all duration-150 ease-out"
                    style={{
                      left: `${journalMousePos.x + 20}px`,
                      top: `${journalMousePos.y - 120}px`,
                    }}
                  >
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Testimonial Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)] flex justify-center text-center">
        <div className="max-w-[1200px] flex flex-col items-center gap-8 py-16">

          <h2 className="font-serif italic font-light text-[#171717] leading-snug" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}>
            “The result feels less like a building and more like an experience.”
          </h2>
          <div className="flex flex-col items-center gap-2 mt-4">
            <span className="text-sm font-semibold tracking-widest text-[#171717] uppercase">MR. RAMLAL NARWANI</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500">Founder, Realty Chamber</span>
          </div>
        </div>
      </section>

      {/* 13. Instagram / Visual Grid */}
      <section className="insta-sec w-full py-24 px-6 md:px-12 bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)]">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">

            <h2 className="text-3xl font-sans font-light text-[#171717] tracking-tight">
              Follow the Studio <a href="https://instagram.com/realtychamber" target="_blank" rel="noopener noreferrer" className="font-semibold underline">@realtychamber</a>
            </h2>
          </div>

          {/* masonry grid of 9 images */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {instaGrid.map((post, idx) => (
              <div key={idx} className="insta-card relative break-inside-avoid overflow-hidden bg-[#171717] group cursor-pointer">
                <div className={`relative ${post.size} w-full`}>
                  <Image
                    src={post.img}
                    alt={`Realty Chamber Instagram grid ${idx}`}
                    fill
                    style={{ objectPosition: post.position || 'center' }}
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#171717]/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Branded Words Roll Section (Krafix Style) */}
      <section className="words-sec relative w-full min-h-screen lg:min-h-[130vh] flex flex-col items-center justify-center bg-[#F3F1EB] overflow-hidden md:px-6 lg:px-6 px-4 py-36 md:py-52 lg:py-64 xl:py-72 gap-y-12 md:gap-y-20 lg:gap-y-28 border-y border-black/5">
        
        {/* Top Tagline */}
        <h2 className="text-[10px] md:text-lg font-light tracking-[0.1em] text-black mb-10 group transition-all duration-700 ease-out">
          <span className="inline-flex items-center transition-all duration-500 ease-in-out">
            <span className="text-black group-hover:text-[#EA580C] transform group-hover:-translate-x-2 transition-all duration-500">[</span>
            &nbsp; R E A L T Y &nbsp;+&nbsp; C H A M B E R &nbsp;
            <span className="text-black group-hover:text-[#EA580C] transform group-hover:translate-x-2 transition-all duration-500">]</span>
          </span>
        </h2>

        {/* Block 1: REALTY */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
          <div className="relative overflow-hidden lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px]">
            <div className="words-realty-roll flex flex-col will-change-transform">
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">REALTY</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">REALTY</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">REALTY</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">REALTY</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">REALTY</h1>
            </div>
          </div>
          <p className="relative lg:absolute lg:top-[55%] lg:left-[51.5%] lg:w-[170px] w-full max-w-[280px] text-[11px] lg:text-[13px] text-gray-500 leading-snug text-center lg:text-left transition-all duration-700 ease-out delay-200 mt-2 lg:mt-0">
            Curating exceptional properties with a focus on long-term value, distinctive architecture and meaningful places.
          </p>
        </div>

        {/* Block 2: CHAMBER */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
          <div className="relative overflow-hidden lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px]">
            <div className="words-chamber-roll flex flex-col will-change-transform">
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">CHAMBER</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">CHAMBER</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">CHAMBER</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">CHAMBER</h1>
              <h1 className="lg:text-[13vw] text-[13vw] font-light text-[#e5e5e5] leading-none lg:h-[11vw] h-[13vw] min-h-[60px] max-h-[160px] select-none">CHAMBER</h1>
            </div>
          </div>
          <p className="relative lg:absolute lg:top-[60%] lg:left-[30%] lg:w-[200px] w-full max-w-[280px] text-[11px] lg:text-[13px] text-gray-500 leading-snug text-center lg:text-left transition-all duration-700 ease-out delay-300 mt-2 lg:mt-0">
            A private collection of distinctive residences, commercial spaces and opportunities selected for those who value more.
          </p>
        </div>

        {/* Explore link */}
        <div className="mt-16">
          <TransitionLink 
            className="inline-block text-[12px] tracking-widest text-gray-800 relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-[#EA580C] after:mt-1 after:transition-transform after:duration-500 after:origin-left after:scale-x-100 hover:after:scale-x-0 font-bold uppercase" 
            href="/properties"
          >
            EXPLORE PROPERTIES
          </TransitionLink>
        </div>

      </section>

      {/* 14. Final CTA */}
      <section className="cta-sec w-full h-screen bg-[#F3F1EB] border-t border-[rgba(23,23,23,0.08)] flex items-center px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col justify-between h-[65vh]">

          
          <div className="flex flex-col gap-4">
            <h2 className="font-sans font-bold text-[#171717] uppercase leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 8vw, 8.5rem)' }}>
              <div className="overflow-hidden">
                <span className="cta-line-reveal inline-block">LET'S BUILD</span>
              </div>
              <div className="overflow-hidden">
                <span className="cta-line-reveal inline-block">SOMETHING</span>
              </div>
              <div className="overflow-hidden">
                <span className="cta-line-reveal inline-block">MEANINGFUL.</span>
              </div>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-t border-[rgba(23,23,23,0.08)] pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">General Enquiries</span>
              <a href="mailto:info@realtychamber.com" className="text-xl md:text-3xl font-light text-[#171717] hover:underline" data-cursor="OPEN">
                info@realtychamber.com
              </a>
            </div>
            <div>
              <TransitionLink href="/contact" className="relative group flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-white text-[#171717] hover:bg-[#171717] hover:text-[#F3F1EB] border-2 border-[#171717] shadow-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95" data-cursor="OPEN">
                <span className="relative z-10 flex flex-col items-center">
                  Start A Project <ArrowUpRight className="inline mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                </span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
