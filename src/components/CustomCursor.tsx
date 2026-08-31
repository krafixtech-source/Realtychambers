'use client'

import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const mouse = useRef({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })
  const isInitialized = useRef(false)
  const isVisible = useRef(false)
  const isBadge = useRef(false)
  const isClicking = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!cursor || !dot) return

    let animationFrameId = 0

    const showCursor = () => {
      if (!isVisible.current) {
        isVisible.current = true
        document.body.classList.add('custom-cursor-active')
        if (cursor) cursor.style.opacity = '1'
        if (dot) dot.style.opacity = isBadge.current ? '0' : '1'
      }
    }

    const hideCursor = () => {
      isVisible.current = false
      if (cursor) cursor.style.opacity = '0'
      if (dot) dot.style.opacity = '0'
    }

    const setModeDefault = () => {
      isBadge.current = false
      if (cursor) {
        cursor.style.width = '26px'
        cursor.style.height = '26px'
        cursor.style.margin = '-13px 0 0 -13px'
        cursor.style.backgroundColor = 'transparent'
        cursor.style.borderColor = 'rgba(23, 23, 23, 0.35)'
      }
      if (label) {
        label.style.display = 'none'
        label.textContent = ''
      }
      if (dot && isVisible.current) {
        dot.style.opacity = '1'
      }
    }

    const setModePointer = () => {
      isBadge.current = false
      if (cursor) {
        cursor.style.width = '46px'
        cursor.style.height = '46px'
        cursor.style.margin = '-23px 0 0 -23px'
        cursor.style.backgroundColor = 'rgba(23, 23, 23, 0.08)'
        cursor.style.borderColor = 'rgba(23, 23, 23, 0.45)'
      }
      if (label) {
        label.style.display = 'none'
        label.textContent = ''
      }
      if (dot && isVisible.current) {
        dot.style.opacity = '1'
      }
    }

    const setModeBadge = (text: string) => {
      isBadge.current = true
      if (cursor) {
        cursor.style.width = '78px'
        cursor.style.height = '78px'
        cursor.style.margin = '-39px 0 0 -39px'
        cursor.style.backgroundColor = 'rgba(23, 23, 23, 0.94)'
        cursor.style.borderColor = 'rgba(23, 23, 23, 0.94)'
      }
      if (label) {
        label.style.display = 'block'
        label.textContent = text
      }
      if (dot) {
        dot.style.opacity = '0'
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      showCursor()

      // On first mouse move, snap trail so it doesn't fly across screen
      if (!isInitialized.current) {
        trail.current.x = e.clientX
        trail.current.y = e.clientY
        isInitialized.current = true
        cursor.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`
      }

      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
    }

    const handleMouseDown = () => {
      isClicking.current = true
    }

    const handleMouseUp = () => {
      isClicking.current = false
    }

    // Dynamic hover inspection via event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const badgeEl = target.closest('[data-cursor]') as HTMLElement | null
      if (badgeEl) {
        const text = badgeEl.getAttribute('data-cursor') || 'VIEW'
        setModeBadge(text)
        return
      }

      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')
      if (interactiveEl) {
        setModePointer()
        return
      }

      setModeDefault()
    }

    const handleTouchStart = () => {
      hideCursor()
      document.body.classList.remove('custom-cursor-active')
    }

    // LERP animation loop
    const updateTrail = () => {
      if (isInitialized.current) {
        const dx = mouse.current.x - trail.current.x
        const dy = mouse.current.y - trail.current.y

        trail.current.x += dx * 0.18
        trail.current.y += dy * 0.18

        const scale = isClicking.current && !isBadge.current ? ' scale(0.82)' : ''
        cursor.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)${scale}`
      }

      animationFrameId = requestAnimationFrame(updateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', hideCursor)
    document.addEventListener('mouseenter', showCursor)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    animationFrameId = requestAnimationFrame(updateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', hideCursor)
      document.removeEventListener('mouseenter', showCursor)
      window.removeEventListener('touchstart', handleTouchStart)
      cancelAnimationFrame(animationFrameId)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      {/* Outer trailing cursor ring / badge */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        className="fixed left-0 top-0 rounded-full border pointer-events-none flex items-center justify-center select-none"
        style={{
          width: '26px',
          height: '26px',
          margin: '-13px 0 0 -13px',
          backgroundColor: 'transparent',
          borderColor: 'rgba(23, 23, 23, 0.35)',
          zIndex: 2147483647,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform, width, height, background-color, border-color',
          opacity: 0,
          transition: 'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1), margin 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease',
        }}
      >
        <span
          ref={labelRef}
          className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#F3F1EB] select-none"
          style={{ display: 'none' }}
        />
      </div>

      {/* Direct center dot */}
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed left-0 top-0 rounded-full pointer-events-none select-none"
        style={{
          width: '5px',
          height: '5px',
          margin: '-2.5px 0 0 -2.5px',
          backgroundColor: '#171717',
          zIndex: 2147483647,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  )
}

