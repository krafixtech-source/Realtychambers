'use client'

import { createContext, useContext, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'

const TransitionContext = createContext<(href: string) => void>((href) => {})

export const usePageTransition = () => useContext(TransitionContext)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isPending, setIsPending] = useState(false)

  const navigateWithTransition = (href: string) => {
    const overlay = overlayRef.current
    if (!overlay || isPending) return

    setIsPending(true)

    // Stage 1: Curtain covers screen (expand scaleY from bottom)
    overlay.style.transformOrigin = 'bottom'
    overlay.style.transform = 'scaleY(1)'

    setTimeout(() => {
      // Push routing change
      router.push(href)

      // Hold briefly for App Router route changes to resolve
      setTimeout(() => {
        // Stage 2: Curtain retracts (shrink scaleY from top)
        if (overlayRef.current) {
          overlayRef.current.style.transformOrigin = 'top'
          overlayRef.current.style.transform = 'scaleY(0)'
        }
        
        setTimeout(() => {
          setIsPending(false)
        }, 800) // Match css transition duration
      }, 150)
    }, 850) // Match css transition duration + buffer
  }

  useEffect(() => {
    const overlay = overlayRef.current
    if (overlay) {
      // Initial render: slide out curtain to reveal the landing view
      overlay.style.transformOrigin = 'top'
      overlay.style.transform = 'scaleY(0)'
    }
  }, [])

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      {children}
      
      {/* Black Page curtain transition layer */}
      <div
        ref={overlayRef}
        id="page-curtain"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0B0B0B',
          zIndex: 999999,
          transform: 'scaleY(1)',
          transformOrigin: 'bottom',
          transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)', // power4.inOut approximation
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </TransitionContext.Provider>
  )
}

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  'data-cursor'?: string
}

export function TransitionLink({ children, href, className, style, ...props }: TransitionLinkProps) {
  const navigate = usePageTransition()

  const handleClick = (e: React.MouseEvent) => {
    // Check if it is a normal click (no cmd/ctrl modifier)
    if (!e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      navigate(href.toString())
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className} style={style} {...props}>
      {children}
    </Link>
  )
}
