'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const duration = 1500 // 1.5 seconds total
    const intervalTime = 30
    const steps = duration / intervalTime
    const increment = 100 / steps

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
              onComplete()
            }, 800) // Match fade animation timing
          }, 400) // Hold at 100% for a brief moment
          return 100
        }
        return Math.min(100, Math.round(prev + increment))
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F3F1EB',
        color: '#171717',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 2rem',
        transform: fadeOut ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.png" alt="Realty Chamber Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '50%', border: '1px solid rgba(23, 23, 23, 0.08)' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase' }}>
            REALTY CHAMBER
          </span>
        </div>
        <span style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase' }}>
          SINCE 1995
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px', margin: 'auto' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, color: 'var(--text-gray)', textTransform: 'uppercase' }}>
          WELCOME
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#0B0B0B' }}>
          Shaping environments where architecture, heritage, and human experience align.
        </h1>
        <div style={{ position: 'relative', width: '100%', height: '1px', backgroundColor: 'rgba(23, 23, 23, 0.1)', marginTop: '1rem' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#171717',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, color: 'var(--text-gray)' }}>
          JAIPUR / INDIA
        </span>
      </div>
    </div>
  )
}
