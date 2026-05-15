import React, { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trustedby from './components/Trustedby'
import Services from './components/Services'
import OurWork from './components/OurWork'
import StatsCounter from './components/StatsCounter'
import ScrollToTop from './components/ScrollToTop'
import Testimonials from './components/Testimonials'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

  // References for cursor (Inke naam aur niche use hone wale naam same hone chahiye)
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  // Reference for custom cursor position tracking (y small rakhein)
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Smoothing logic
      position.current.x += (mouse.current.x - position.current.x) * 0.3
      position.current.y += (mouse.current.y - position.current.y) * 0.3

      // Check karein ke dono refs maujood hain
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      //cancelAnimationFrame(animationId) // Memory leak se bachne ke liye
    }
  }, [])

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} dark:bg-black relative`}>
      <Toaster />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <Trustedby />
      <StatsCounter />
      <Services />
      <OurWork />
      <Testimonials />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

      {/* Scroll To Top Button */}
      <ScrollToTop />

      {/* Custom Cursor Ring */}
      <div ref={outlineRef} className='fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]' style={{ transition: 'transform 0.01s ease-out' }}></div>

      {/* Custom Cursor Dot */}
      <div ref={dotRef} className='fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]'></div>
    </div>
  )
}

export default App