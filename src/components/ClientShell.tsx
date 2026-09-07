'use client'

import { useState } from 'react'
import LoadingScreen from './LoadingScreen'
import SmoothScroll from './SmoothScroll'
import { PageTransitionProvider } from './PageTransition'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'
import NewsletterModal from './NewsletterModal'
import FloatingWhatsApp from './FloatingWhatsApp'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      
      <SmoothScroll>
        <PageTransitionProvider>
          <CustomCursor />
          <FloatingWhatsApp />
          <NewsletterModal />
          <Navbar />
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              opacity: isLoaded ? 1 : 0,
              visibility: isLoaded ? 'visible' : 'hidden',
              transition: 'opacity 1s ease, visibility 1s ease',
            }}
          >
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </PageTransitionProvider>
      </SmoothScroll>
    </>
  )
}
