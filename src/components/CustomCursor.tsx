'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const [isTouch, setIsTouch] = useState(true) // Default to true on initial render to prevent hydration mismatch/flicker

  useEffect(() => {
    // Check if device is touch-enabled
    const touchMatched = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touchMatched)
    
    if (touchMatched) {
      document.body.classList.remove('custom-cursor-active')
      return
    }

    document.body.classList.add('custom-cursor-active')

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Immediately place small dot
      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
      dot.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
      dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth trailing interpolation
    let animationFrameId = 0
    const updateTrail = () => {
      const dx = mouse.current.x - trail.current.x
      const dy = mouse.current.y - trail.current.y

      trail.current.x += dx * 0.15
      trail.current.y += dy * 0.15

      cursor.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`
      animationFrameId = requestAnimationFrame(updateTrail)
    }
    updateTrail()

    // Hover State Listeners
    const handleHoverStart = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const text = target.getAttribute('data-cursor') || 'VIEW'
      isHovered.current = true

      // Expand outer trailing cursor
      cursor.style.width = '80px'
      cursor.style.height = '80px'
      cursor.style.backgroundColor = 'rgba(23, 23, 23, 0.9)'
      cursor.style.borderColor = 'rgba(23, 23, 23, 0.9)'

      const span = document.createElement('span')
      span.className = 'cursor-label'
      span.textContent = text
      span.style.color = '#F3F1EB'
      span.style.fontSize = '9px'
      span.style.fontWeight = '500'
      span.style.letterSpacing = '0.15em'
      span.style.textTransform = 'uppercase'
      span.style.animation = 'fadeIn 0.2s forwards'

      cursor.innerHTML = ''
      cursor.appendChild(span)

      // Hide center dot
      dot.style.opacity = '0'
    }

    const handleHoverEnd = () => {
      isHovered.current = false
      cursor.style.width = '24px'
      cursor.style.height = '24px'
      cursor.style.backgroundColor = 'transparent'
      cursor.style.borderColor = 'rgba(23, 23, 23, 0.3)'
      cursor.innerHTML = ''

      dot.style.opacity = '1'
    }

    const handleNavStart = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      cursor.style.borderColor = '#171717'
      cursor.style.backgroundColor = 'rgba(23, 23, 23, 0.1)'
    }

    const handleNavEnd = () => {
      cursor.style.width = '24px'
      cursor.style.height = '24px'
      cursor.style.borderColor = 'rgba(23, 23, 23, 0.3)'
      cursor.style.backgroundColor = 'transparent'
    }

    const applyCursorListeners = () => {
      // General data-cursor triggers
      const cursorElements = document.querySelectorAll('[data-cursor]')
      cursorElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
        el.addEventListener('mouseenter', handleHoverStart)
        el.addEventListener('mouseleave', handleHoverEnd)
      })

      // Navbar/Link triggers (shrinks cursor)
      const navElements = document.querySelectorAll('a, button, [role="button"]')
      navElements.forEach((el) => {
        if (!el.hasAttribute('data-cursor')) {
          el.removeEventListener('mouseenter', handleNavStart)
          el.removeEventListener('mouseleave', handleNavEnd)
          el.addEventListener('mouseenter', handleNavStart)
          el.addEventListener('mouseleave', handleNavEnd)
        }
      })
    }

    applyCursorListeners()

    // Mutation observer to handle dynamically injected elements
    const observer = new MutationObserver(applyCursorListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()

      const cursorElements = document.querySelectorAll('[data-cursor]')
      cursorElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
      const navElements = document.querySelectorAll('a, button, [role="button"]')
      navElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleNavStart)
        el.removeEventListener('mouseleave', handleNavEnd)
      })
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Lagging outer cursor */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        className="fixed left-0 top-0 rounded-full border pointer-events-none transition-all duration-300 ease-out"
        style={{
          width: '24px',
          height: '24px',
          borderColor: 'rgba(23, 23, 23, 0.3)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform, width, height, background-color, border-color',
          margin: '-12px 0 0 -12px',
          opacity: 0,
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed left-0 top-0 rounded-full pointer-events-none transition-all duration-150 ease-out"
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#171717',
          zIndex: 99999,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          margin: '-2px 0 0 -2px',
          opacity: 0,
        }}
      />
    </>
  )
}
