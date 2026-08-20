'use client'

import { useEffect, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null)

  useEffect(() => {
    // Disable on mobile/touch interfaces if preferred, but Lenis handles it well.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out style
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    setLenisRef(lenis)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
