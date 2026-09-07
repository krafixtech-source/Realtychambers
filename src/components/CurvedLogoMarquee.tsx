'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface LogoItem {
  name: string
  img: string
}

export default function CurvedLogoMarquee({ logos }: { logos: LogoItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const [cardsData, setCardsData] = useState<{ id: number; name: string; img: string }[]>([])

  // Duplicate logos 4x to ensure smooth continuous infinite looping without gaps
  useEffect(() => {
    const list: { id: number; name: string; img: string }[] = []
    for (let i = 0; i < 4; i++) {
      logos.forEach((logo, idx) => {
        list.push({ ...logo, id: i * logos.length + idx })
      })
    }
    setCardsData(list)
  }, [logos])

  useEffect(() => {
    let lastTime = performance.now()
    const speed = 0.045 // Speed: moving slowly slowly to the left

    const update3DEffect = () => {
      if (!containerRef.current || !trackRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const screenCenter = containerRect.left + containerRect.width / 2
      const halfWidth = containerRect.width / 2

      // Apply 3D concave curved transform to each card based on its relative horizontal position
      const cards = trackRef.current.children
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        
        // Normalized position: -1 at far left edge, 0 at center, +1 at far right edge
        const normX = (cardCenter - screenCenter) / (halfWidth || 1)
        const distFromCenter = Math.min(Math.abs(normX), 1.2)

        // Math formulas for 3D curved bowl / U-shaped ribbon:
        // - Center: scaled small (0.72), pushed back in Z (-160px), flat (0deg)
        // - Edges: scaled large (1.25), pulled forward in Z (+20px), rotated towards center (±28deg)
        const scale = 0.72 + 0.52 * Math.min(distFromCenter, 1)
        const rotateY = -normX * 28 // left rotates positive Y, right rotates negative Y
        const translateZ = (1 - Math.min(distFromCenter, 1)) * -160
        const translateY = -Math.pow(Math.min(distFromCenter, 1), 1.8) * 12

        card.style.transform = `perspective(1000px) translate3d(0, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
        card.style.transformStyle = 'preserve-3d'
      }
    }

    const animate = (now: number) => {
      const delta = now - lastTime
      lastTime = now

      // Move left continuously
      offsetRef.current += speed * delta
      const totalWidth = logos.length * 160 // approx width of 1 logo set

      if (offsetRef.current >= totalWidth) {
        offsetRef.current = offsetRef.current % totalWidth
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
      }

      update3DEffect()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [logos.length, cardsData.length])

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 sm:py-24 bg-[#F3F1EB]"
      style={{ perspective: '1200px' }}
    >
      {/* Side Fade Gradient Overlays for seamless edge blending */}
      <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#F3F1EB] via-[#F3F1EB]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#F3F1EB] via-[#F3F1EB]/80 to-transparent z-20 pointer-events-none" />

      {/* Marquee Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-4 sm:gap-6 w-max py-8 cursor-grab active:cursor-grabbing"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {cardsData.map((dev) => (
          <div
            key={`curved-card-${dev.id}`}
            className="flex-shrink-0 w-36 sm:w-44 h-48 sm:h-56 bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl p-4 sm:p-5 flex items-center justify-center group cursor-pointer relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={dev.img}
                alt={dev.name}
                fill
                className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
