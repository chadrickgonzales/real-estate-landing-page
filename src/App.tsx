import { useState, useEffect, useRef } from 'react'
import './App.css'
import PropertyCarousel from './components/PropertyCarousel'

// Import images
import logoImg from './assets/images/logo.png'
import heroMp4 from './assets/images/hero.mp4'
import heroWebp from './assets/images/hero.webp'
import heroJpeg from './assets/images/hero.jpeg'
import image1 from './assets/images/1.webp'
import image2 from './assets/images/2.webp'
import image3 from './assets/images/3.webp'
import owner1 from './assets/images/owner1.webp'
import droneWebm from './assets/images/drone.webm'

function App() {
  
  const [isVideoSticky, setIsVideoSticky] = useState(true)
  const [isDroneVideoVisible, setIsDroneVideoVisible] = useState(false)
  const [isHeroImageVisible, setIsHeroImageVisible] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [droneVideoError, setDroneVideoError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const testimonialSectionRef = useRef(null)
  const provenResultsSectionRef = useRef(null)
  const droneSectionRef = useRef(null)
  const heroImageSectionRef = useRef(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const droneVideoRef = useRef<HTMLVideoElement>(null)

  // Intersection Observer for video visibility - ensures only one video plays at a time
  useEffect(() => {
    if (!heroRef.current || !testimonialSectionRef.current || !provenResultsSectionRef.current || !droneSectionRef.current || !heroImageSectionRef.current) return

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Hero section intersection:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setIsVideoSticky(true)
            setIsDroneVideoVisible(false) // Hide drone video when hero is visible
            setIsHeroImageVisible(false) // Hide hero image when hero video is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    const testimonialObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Testimonial section intersection:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setIsVideoSticky(false) // Hide hero video when testimonial is visible
            setIsDroneVideoVisible(false) // Hide drone video when testimonial is visible
            setIsHeroImageVisible(false) // Hide hero image when testimonial is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    const provenResultsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Proven Results section intersection:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setIsVideoSticky(false) // Hide hero video when proven results is visible
            setIsDroneVideoVisible(false) // Hide drone video when proven results is visible
            setIsHeroImageVisible(false) // Hide hero image when proven results is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    const droneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Drone section intersection:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setIsDroneVideoVisible(true)
            setIsVideoSticky(false) // Hide hero video when drone is visible
            setIsHeroImageVisible(false) // Hide hero image when drone is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    const heroImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Hero image section intersection:', entry.isIntersecting)
          if (entry.isIntersecting) {
            setIsHeroImageVisible(true)
            setIsVideoSticky(false) // Hide hero video when hero image is visible
            setIsDroneVideoVisible(false) // Hide drone video when hero image is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    heroObserver.observe(heroRef.current)
    testimonialObserver.observe(testimonialSectionRef.current)
    provenResultsObserver.observe(provenResultsSectionRef.current)
    droneObserver.observe(droneSectionRef.current)
    heroImageObserver.observe(heroImageSectionRef.current)

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current)
      if (testimonialSectionRef.current) testimonialObserver.unobserve(testimonialSectionRef.current)
      if (provenResultsSectionRef.current) provenResultsObserver.unobserve(provenResultsSectionRef.current)
      if (droneSectionRef.current) droneObserver.unobserve(droneSectionRef.current)
      if (heroImageSectionRef.current) heroImageObserver.unobserve(heroImageSectionRef.current)
    }
  }, [])

  // Control video playback based on visibility
  useEffect(() => {
    if (heroVideoRef.current) {
      if (isVideoSticky) {
        heroVideoRef.current.play().catch(console.error)
      } else {
        heroVideoRef.current.pause()
      }
    }
  }, [isVideoSticky])

  useEffect(() => {
    if (droneVideoRef.current) {
      if (isDroneVideoVisible) {
        droneVideoRef.current.play().catch(console.error)
      } else {
        droneVideoRef.current.pause()
      }
    }
  }, [isDroneVideoVisible])








  return (
    <div className="min-h-screen w-screen m-0 p-0">
      {/* Navigation Bar */}
      <nav className="relative z-50">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between w-full">
              <img 
                src={logoImg} 
                alt="Logo" 
                className="h-12 w-auto"
              />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation Links with Logo in Center - Absolutely Centered */}
            <div className="hidden md:flex items-center justify-center w-full">
              <div className="flex items-center space-x-8">
                <a href="#home" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors">
                  Home
                </a>
                <a href="#listings" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors">
                  Listings
                </a>
                
                {/* Logo in Center */}
                <div className="flex items-center">
                  <img 
                    src={logoImg} 
                    alt="Logo" 
                    className="h-16 lg:h-20 w-auto"
                  />
                </div>
                
                <a href="#lets-move" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors">
                  Let's Move
                </a>
                <a href="#about" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors">
                  About Us
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div 
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Sidebar */}
            <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Logo */}
              <div className={`flex justify-center mb-12 transition-all duration-500 delay-100 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <img 
                  src={logoImg} 
                  alt="Logo" 
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Navigation Links */}
              <div className="px-8 space-y-6">
                <a 
                  href="#home" 
                  className={`block text-gray-800 hover:text-blue-600 py-4 text-lg font-medium transition-all duration-300 border-b border-gray-200 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#listings" 
                  className={`block text-gray-800 hover:text-blue-600 py-4 text-lg font-medium transition-all duration-300 border-b border-gray-200 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: isMobileMenuOpen ? '250ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Listings
                </a>
                <a 
                  href="#lets-move" 
                  className={`block text-gray-800 hover:text-blue-600 py-4 text-lg font-medium transition-all duration-300 border-b border-gray-200 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Let's Move
                </a>
                <a 
                  href="#about" 
                  className={`block text-gray-800 hover:text-blue-600 py-4 text-lg font-medium transition-all duration-300 border-b border-gray-200 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: isMobileMenuOpen ? '350ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
              </div>
              
              {/* Contact Info */}
              <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 delay-400 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="text-center">
                  <h3 className="text-lg font-syncopate font-bold text-gray-800 mb-2">MARCI METZGER</h3>
                  <p className="text-gray-600 mb-1">
                    <a href="tel:7025550123" className="hover:text-gray-800 transition-colors">702.555.0123</a>
                  </p>
                  <p className="text-gray-600 text-sm">
                    <a href="mailto:marci@theridgerealtygroup.com" className="hover:text-gray-800 transition-colors">marci@theridgerealtygroup.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Video Background - Only when hero section is visible */}
      <div 
        className={`${isVideoSticky ? 'fixed top-0 left-0 w-screen h-screen' : ''} -z-10`}
        style={{ display: isVideoSticky ? 'block' : 'none' }}
      >
        <video
          ref={heroVideoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => console.error('Hero video load error:', e)}
        >
          <source src={heroMp4} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Section - Full Screen */}
      <section ref={heroRef} className="h-[95vh] w-full relative z-20">
        <div className="h-full w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* All text centered */}
          <div className="text-white flex flex-col items-center text-center max-w-4xl mt-8 sm:mt-12 lg:mt-16">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-cinzel font-semibold drop-shadow-lg text-center leading-tight">
              MARCI METZGER - THE RIDGE REALTY GROUP
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md font-cinzel font-semibold text-center">
              Pahrump Realtor
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Luxury Real Estate Layout */}
      <section className="min-h-screen w-full bg-white py-12 sm:py-16 lg:py-20 relative">
        {/* Brown background rectangle spanning full width */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen brown-bg-rectangle" style={{backgroundColor: '#F5F2ED'}}></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-64 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-syncopate font-normal text-black mb-4 tracking-tight">
              PAHRUMP'S #1 LUXURY REALTOR®
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-bicylette font-normal text-gray-700 tracking-[2px] sm:tracking-[3px]">
              THE LAST SIX CONSECUTIVE YEARS
            </p>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bicylette font-normal text-gray-700 leading-relaxed mt-4 sm:mt-6">
              With nearly 30 years of experience, Marci Metzger is the face of Pahrump's luxury <br className="hidden sm:block"></br>real estate market, 
              with unparalleled passion and commitment to the Pahrump Lifestyle.
            </p>
          </div>
          
          {/* Three Feature Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {/* Panel 1 - Who You Work With Matters */}
            <div className="relative aspect-square overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src={image1} 
                alt="Modern Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bicylette font-normal text-center">WHO YOU WORK WITH MATTERS</h3>
              </div>
            </div>

            {/* Panel 2 - Property Valuation */}
            <div className="relative aspect-square overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src={image2} 
                alt="Luxury Property" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bicylette font-normal text-center">PROPERTY VALUATION</h3>
              </div>
            </div>

            {/* Panel 3 - Press */}
            <div className="relative aspect-square overflow-hidden group cursor-pointer shadow-2xl sm:col-span-2 lg:col-span-1">
              <img 
                src={image3} 
                alt="Professional Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bicylette font-normal text-center">PRESS</h3>
              </div>
            </div>
          </div>

          {/* Meet Marci Metzger Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {/* Left Side - Text */}
            <div className="flex flex-col justify-start text-left -mt-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syncopate font-normal text-black mb-4 sm:mb-6 tracking-tight text-left">
                MEET MARCI METZGER
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bicylette font-normal text-gray-700 leading-relaxed mb-6 sm:mb-8 text-left">
                With nearly 30 years of experience, Marci Metzger is the face of Pahrump's luxury real estate market, 
                with unparalleled passion and commitment to the Pahrump Lifestyle. As Pahrump's top residential REALTOR® 
                for the past four years, she has closed over $28.5 million in sales while assisting nearly 90 clients 
                in 2021 alone, establishing her as the definitive authority in Nevada's premier desert community.
              </p>
              
            </div>

            {/* Right Side - Portrait */}
            <div className="relative">
              <div className="aspect-[45/39] overflow-hidden shadow-2xl">
                <img 
                  src={owner1} 
                  alt="Professional Portrait of Marci Metzger" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Media Logos Carousel Section */}
          <div className="border-t border-gray-200 pt-8 sm:pt-12 mb-12 sm:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-gray-600 font-medium text-sm sm:text-base">As Featured In</p>
            </div>
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll whitespace-nowrap">
                {/* First set of logos */}
                <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12 mr-6 sm:mr-8 lg:mr-12">
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">RISMEDIA</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">PAHRUMP CHAMBER</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REALTOR.COM</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">ZILLOW</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">HOMES.COM</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">TRULIA</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REDFIN</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">NEVADA REALTORS</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">INMAN</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REALTOR MAGAZINE</div>
            </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12 mr-6 sm:mr-8 lg:mr-12">
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">RISMEDIA</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">PAHRUMP CHAMBER</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REALTOR.COM</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">ZILLOW</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">HOMES.COM</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">TRULIA</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REDFIN</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">NEVADA REALTORS</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">INMAN</div>
                  <div className="text-gray-500 font-bold text-sm sm:text-base lg:text-lg opacity-60">REALTOR MAGAZINE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Quote Section */}
          <div ref={testimonialSectionRef} className="text-center mb-12 sm:mb-16">
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bicylette font-normal text-gray-800 leading-relaxed max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
              "I love that small-town feeling that our community offers. My success comes from helping clients 
              find homes that suit them as well as our community suits me — with spectacular golf courses, 
              parks, and easy access to Las Vegas, Pahrump is truly a great place to call home."
            </blockquote>
            <cite className="text-sm sm:text-base lg:text-lg xl:text-xl font-syncopate font-normal text-gray-600">
              MARCI METZGER - THE RIDGE REALTY GROUP
            </cite>
          </div>
        </div>
      </section>

      {/* Services Section with Background Image */}
      <section className="h-[95vh] w-full relative overflow-hidden">
        {/* Background Image */}
        <div 
          
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-[95vh] flex items-center justify-center">
          <div className="w-full h-full">
            <div className="w-full h-full">
              {/* Three Big Buttons */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-0 w-full h-full">
                {/* Button 1 - Bespoke Marketing */}
                <div className="group cursor-pointer w-full h-full relative">
                  <div className="bg-transparent border border-white/20 p-4 sm:p-6 lg:p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                      REAL ESTATE DONE RIGHT
                    </h3>
                  </div>
                  {/* White divider line for mobile */}
                  <div className="md:hidden absolute bottom-0 left-4 right-4 h-px bg-white/30"></div>
                </div>

                {/* Button 2 - Property Valuation */}
                <div className="group cursor-pointer w-full h-full relative">
                  <div className="bg-transparent border border-white/20 md:border-l-white md:border-r-white p-4 sm:p-6 lg:p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
                      COMMERCIAL & RESIDENTIAL
                    </h3>
                  </div>
                  {/* White divider line for mobile */}
                  <div className="md:hidden absolute bottom-0 left-4 right-4 h-px bg-white/30"></div>
                </div>

                {/* Button 3 - Market Leaders */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 p-4 sm:p-6 lg:p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
                      RELY ON EXPERTISE
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section ref={provenResultsSectionRef} className="min-h-screen w-full relative" style={{backgroundColor: '#BEAF9E'}}>
        {/* Text Content - Centered at Top */}
        <div className="w-full flex flex-col items-center justify-start pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-8 lg:px-16">
          {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syncopate font-normal text-white mb-4 sm:mb-6 text-center" style={{fontWeight: 400, letterSpacing: 0, lineHeight: 1.18}}>
              PROVEN RESULTS
            </h1>
          
          {/* Subtitle */}
          <h2 className="font-bicylette font-normal text-white mb-6 sm:mb-8 text-center uppercase text-xs sm:text-sm lg:text-base" style={{letterSpacing: '2px'}}>
            CONSISTENTLY HONORED AMONG PAHRUMP'S SELECT MULTI-MILLION DOLLAR PRODUCERS
          </h2>
          
          {/* Description Paragraph */}
          <p className="font-bicylette font-normal text-white mb-8 sm:mb-10 lg:mb-12 text-center max-w-4xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg px-4">
            With nearly 30 years of experience, Marci Metzger is the face of Pahrump's luxury real estate market, 
            with unparalleled passion and commitment to the Pahrump Lifestyle. As Pahrump's top residential REALTOR® 
            for the past four years, she has closed over $28.5 million in sales while assisting nearly 90 clients 
            in 2021 alone, establishing her as the definitive authority in Nevada's premier desert community.
          </p>
        </div>
        
        {/* Bottom Section with Stats and Images */}
        <div className="w-full h-full flex flex-col lg:flex-row">
          {/* Left Side - Stats Column */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
            <div className="max-w-md mx-auto">
              <div className="text-left space-y-6 sm:space-y-8">
                {/* Stat 1 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2 text-3xl sm:text-4xl lg:text-5xl">$28.5M</div>
                  <div className="font-bicylette font-normal text-white text-sm sm:text-base lg:text-lg">in 2021 Sales</div>
                </div>
                
                {/* Stat 2 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2 text-3xl sm:text-4xl lg:text-5xl">#1</div>
                  <div className="font-bicylette font-normal text-white text-sm sm:text-base lg:text-lg">Realtor in Pahrump</div>
                </div>
                
                {/* Stat 3 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2 text-3xl sm:text-4xl lg:text-5xl">90</div>
                  <div className="font-bicylette font-normal text-white text-sm sm:text-base lg:text-lg">Clients Assisted in 2021</div>
                </div>
                
                {/* Stat 4 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2 text-3xl sm:text-4xl lg:text-5xl">30</div>
                  <div className="font-bicylette font-normal text-white text-sm sm:text-base lg:text-lg">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image Collage */}
          <div className="flex-1 relative h-64 sm:h-80 lg:h-auto">
            {/* Main Exterior Image (Right Side) */}
            <div className="absolute bottom-0 right-0 lg:right-80 w-full lg:w-2/4 h-full">
              <img 
                src={heroWebp} 
                alt="Luxury Property Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Interior Kitchen/Living Image (Left Side, Overlapping) */}
            <div className="absolute top-1/4 -left-8 sm:-left-16 lg:-left-32 w-2/5 h-2/5 z-50">
              <img 
                src={image1} 
                alt="Luxury Interior Kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kumara's Current Inventory Section */}
      <section className="min-h-screen w-full bg-white py-12 sm:py-16 overflow-hidden relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              MARCI METZGER'S CURRENT INVENTORY
            </h1>
            <p className="font-bicylette font-normal text-gray-700 text-sm sm:text-base lg:text-lg">
              REPRESENTING A BESPOKE COLLECTION OF PARHUM'S FINEST PROPERTIES
            </p>
            <div className="w-[80vw] h-px bg-gray-400 mx-auto mt-4 sm:mt-6"></div>
          </div>
        </div>
        
        {/* Property Carousel - Full Width */}
        <div className="relative w-full overflow-x-hidden">
          <PropertyCarousel />
        </div>
      </section>

      {/* New Sticky Background Section */}
      <section ref={droneSectionRef} className="h-[60vh] w-full relative">
        {/* Drone Video Background - Only when section is visible */}
        <div 
          className={`${isDroneVideoVisible ? 'fixed top-0 left-0 w-screen h-screen' : ''} -z-10`}
          style={{ display: isDroneVideoVisible ? 'block' : 'none' }}
        >
          <video
            ref={droneVideoRef}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Drone video load error:', e)
              const target = e.target as HTMLVideoElement
              console.error('Video src:', target.src)
              console.error('Video error code:', target.error?.code)
              setDroneVideoError(true)
            }}
            onLoadStart={() => console.log('Drone video loading started')}
            onCanPlay={() => console.log('Drone video can play')}
          >
            <source src={droneWebm} type="video/webm" />
            <source src="./src/assets/images/drone.webm" type="video/webm" />
            <source src="src/assets/images/drone.webm" type="video/webm" />
          </video>
          {/* Fallback background if video fails */}
          {droneVideoError && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl">
            <h2 className="font-bicylette font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Recent Notable Sale</h2>
            <h3 className="font-normal mb-8 sm:mb-12 lg:mb-24 text-lg sm:text-xl lg:text-2xl" style={{fontFamily: 'Cormorant Garamond'}}>Austin, TX Modern Masterpiece</h3>
             <p className="font-normal mb-8 sm:mb-12 lg:mb-14 mx-auto leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl" style={{fontFamily: 'Cormorant Garamond', width: '90%'}}>
              Nestled within the pristine confines of Tarrytown's only privately gated enclave, this opulent estate stands as one
              of just five exclusive residences. Emanating an aura of unparalleled luxury, it boasts an abundance of space
              for gracious living and grand entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Communities Section */}
      <section className="min-h-screen w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              EXPLORE COMMUNITIES
            </h1>
            <h2 className="font-bicylette font-normal text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              PAHRUMP REAL ESTATE
            </h2>
            <p className="font-bicylette font-normal text-gray-600 max-w-4xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg px-4">
              Searching for Pahrump Real Estate? Real Estate Agent, Marci Metzger, finds property, houses, condos & homes for sale in Downtown Pahrump, Old West Pahrump, Lake Pahrump, Westlake, Tarrytown & nearby.
            </p>
          </div>
          
          {/* Three Community Panels */}
          <div className="h-[70vh]">
            <div className="w-full h-full">
              <div className="w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full h-full">
                  {/* Downtown Pahrump Panel */}
                  <div className="group cursor-pointer w-full h-full relative overflow-hidden">
                    <img 
                      src={image1} 
                      alt="Downtown Pahrump Luxury Interior" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="bg-transparent border border-white/20 p-4 sm:p-6 lg:p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        DOWNTOWN PAHRUMP
                      </h3>
                    </div>
                  </div>

                  {/* West Lake Hills Panel */}
                  <div className="group cursor-pointer w-full h-full relative overflow-hidden">
                    <img 
                      src={image2} 
                      alt="West Lake Hills Luxury Property" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="bg-transparent border border-white/20 md:border-l-white md:border-r-white p-4 sm:p-6 lg:p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-bicylette text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        PAHRUMP VALLEY WINERY
                      </h3>
                    </div>
                  </div>

                  {/* Old West Pahrump Panel */}
                  <div className="group cursor-pointer w-full h-full relative overflow-hidden">
                    <img 
                      src={image3} 
                      alt="Old West Pahrump Traditional Home" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="bg-transparent border border-white/20 p-4 sm:p-6 lg:p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-bicylette text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        WHEELER SPRINGS PLAZA
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Pahrump Real Estate Blogs Section */}
      <section className="min-h-screen w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              RECENT PAHRUMP REAL ESTATE BLOGS
            </h1>
            <h2 className="font-bicylette font-normal text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              BE THE FIRST TO KNOW
            </h2>
            <p className="font-bicylette font-normal text-gray-600 max-w-4xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg px-4">
              Your go-to source for the latest trends in real estate, Pahrump, and so much more.
            </p>
          </div>
          
          {/* Divider Line */}
          <div className="w-full border-t border-gray-200 mb-8 sm:mb-10 lg:mb-12"></div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Blog Post Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {/* Blog Post 1 */}
            <div className="bg-white overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image1} 
                  alt="Luxury Property Interior" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-left p-4 sm:p-6">
                <h3 className="font-syncopate font-normal text-black mb-3 sm:mb-4 leading-tight mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl">
                  HOW TO DETERMINE YOUR NON-NEGOTIABLES WHEN BUYING A LUXURY PROPERTY
                </h3>
                <p className="font-syncopate text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm" style={{fontWeight: 600}}>
                  MARCI METZGER
                </p>
                <p className="font-bicylette text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  What do you need from your luxury home purchase? Define your musts for a smoother transaction.
                </p>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image2} 
                  alt="Pahrump Lake Area" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-left p-4 sm:p-6">
                <h3 className="font-syncopate font-normal text-black mb-3 sm:mb-4 leading-tight mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl">
                  PAHRUMP LAKE THINGS TO DO
                </h3>
                <p className="font-syncopate text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm" style={{fontWeight: 600}}>
                  MARCI METZGER
                </p>
                <p className="font-bicylette text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  Water activities and picturesque hikes on this popular reservoir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Background Section */}
      <section ref={heroImageSectionRef} className="h-[60vh] w-full relative">
        {/* Hero Image Background - Only when section is visible */}
        <div 
          className={`${isHeroImageVisible ? 'fixed top-0 left-0 w-screen h-screen' : ''} -z-10`}
          style={{ display: isHeroImageVisible ? 'block' : 'none' }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroJpeg})`
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl">
            <h2 className="font-syncopate font-normal mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Luxury Real Estate Excellence</h2>
            <h3 className="font-bicylette font-normal mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg xl:text-xl">Experience the Pahrump Lifestyle</h3>
            <p className="font-bicylette font-normal max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-12 text-sm sm:text-base lg:text-lg xl:text-xl px-4">
              Discover unparalleled luxury living in Pahrump's most exclusive communities. 
              From stunning lakefront properties to prestigious gated communities, 
              find your perfect home with Nevada's premier real estate expert.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Contact Button */}
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-syncopate font-normal text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Contact
              </button>
              
              {/* Home Search Button */}
              <button className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-syncopate font-normal text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                Search Homes
              </button>
          </div>
          </div>
        </div>
      </section>


      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden">
            {/* Left Section - Contact Form (Mobile: Full width, Desktop: 30%) */}
            <div className="w-full lg:w-[30%] bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0">
              <div className="max-w-md mx-auto w-full">
                <p className="font-bicylette text-gray-500 text-xs sm:text-sm mb-2">Let me know how I can assist you.</p>
                <h2 className="font-syncopate font-normal text-gray-800 mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl">GET IN TOUCH</h2>
                
                <form className="space-y-4 sm:space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 resize-none font-bicylette text-sm sm:text-base"
                    ></textarea>
                  </div>
                  
                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-3 w-3 sm:h-4 sm:w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="font-bicylette text-xs text-gray-600 leading-relaxed">
                      By providing Marci Metzger your contact information, you acknowledge and agree to our Privacy Policy and consent to receiving marketing communications, including through automated calls, texts, and emails, some of which may use artificial or prerecorded voices. This consent isn't necessary for purchasing any products or services and you may opt out at any time. To opt out from texts, you can reply, 'stop' at any time. To opt out from emails, you click on the unsubscribe link in the emails. Message and data rates may apply.
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-syncopate font-normal text-base sm:text-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right Section - Image and Contact Info (Mobile: Hidden, Desktop: 70%) */}
            <div className="hidden lg:block w-[70%] relative">
              {/* Background Image */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${owner1})`
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Contact Information Overlay */}
                <div className="absolute inset-0 p-8 sm:p-12">
                  {/* Close Button */}
                  <div className="absolute top-8 sm:top-12 right-8 sm:right-12">
                    <button
                      onClick={() => setIsContactModalOpen(false)}
                      className="text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Contact Details - Top Left */}
                  <div className="absolute top-8 sm:top-12 left-8 sm:left-12 text-white text-left">
                    <h3 className="font-syncopate font-normal mb-6 sm:mb-8 text-left text-3xl sm:text-4xl lg:text-5xl">MARCI METZGER</h3>
                    <div className="space-y-3 sm:space-y-4 text-lg sm:text-xl text-left">
                      <p className="font-bicylette text-left">marci@theridgerealtygroup.com</p>
                      <p className="font-bicylette text-left">702.555.0123</p>
                      <p className="font-bicylette text-left">123 Main Street<br />Pahrump, NV 89048</p>
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 sm:space-x-6 mt-6 sm:mt-8 justify-start">
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <div className="lg:hidden absolute top-4 right-4">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo, Contact & Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            {/* Left Side - Logo & Contact */}
            <div className="text-left">
              {/* Logo */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white flex items-center justify-center font-syncopate font-bold text-lg sm:text-xl mr-3">
                    MM
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-syncopate font-bold text-black">METZGER</div>
                    <div className="text-xs sm:text-sm font-bicylette text-gray-600">THE RIDGE REALTY GROUP</div>
                  </div>
                </div>
              </div>
              
              {/* Contact Person */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-syncopate font-bold text-black mb-2">MARCI METZGER</h3>
                <p className="text-gray-700 mb-1 text-sm sm:text-base">
                  <a href="tel:7025550123" className="underline hover:text-black transition-colors">702.555.0123</a>
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  <a href="mailto:marci@theridgerealtygroup.com" className="underline hover:text-black transition-colors">marci@theridgerealtygroup.com</a>
              </p>
            </div>
          </div>
            
            {/* Right Side - Address */}
            <div className="text-left lg:text-right">
              <h4 className="text-base sm:text-lg font-syncopate font-bold text-black mb-3 sm:mb-4">ADDRESS</h4>
              <p className="text-gray-700 text-sm sm:text-base">
                123 Main Street<br />
                Pahrump, NV 89048
              </p>
        </div>
          </div>
          
          {/* Navigation Links & Social Media */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12">
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-0">
              <a href="#home" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium text-sm sm:text-base">HOME</a>
              <a href="#about" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium text-sm sm:text-base">ABOUT MARCI</a>
              <a href="#listings" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium text-sm sm:text-base">FEATURED PROPERTIES</a>
              <a href="#communities" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium text-sm sm:text-base">NEIGHBORHOODS</a>
              <a href="#contact" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium text-sm sm:text-base">LET'S CONNECT</a>
            </nav>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Legal Disclaimers & Broker Information */}
          <div className="mb-6 sm:mb-8">
            <div className="space-y-2 mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">Nevada Real Estate Commission Consumer Protection Notice</a>
              </p>
              <p className="text-xs sm:text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">Nevada Real Estate Commission Information About Brokerage Services</a>
              </p>
              <p className="text-xs sm:text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">NREC Disclaimer</a>
              </p>
              <p className="text-xs sm:text-sm font-bicylette text-gray-600">
                The Ridge Realty Group | 702.555.0123
              </p>
              <p className="text-xs sm:text-sm font-bicylette text-gray-600">
                Broker Of The Firm | Marci Metzger
              </p>
            </div>
            
            <p className="text-xs font-bicylette text-gray-500 leading-relaxed mb-3 sm:mb-4">
              The Ridge Realty Group® and The Ridge Realty Group Logo are service marks licensed to The Ridge Realty Group Affiliates LLC and used with permission. 
              The Ridge Realty Group fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated. 
              Any services or products provided by independently owned and operated franchisees are not provided by, affiliated with or related to The Ridge Realty Group 
              Affiliates LLC nor any of its affiliated companies.
            </p>
            
            {/* REALTOR and Equal Housing Logos */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center text-xs font-bold mr-2">R</div>
                <span className="text-xs font-bicylette text-gray-600">REALTOR</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center text-xs font-bold mr-2">=</div>
                <span className="text-xs font-bicylette text-gray-600">EQUAL HOUSING OPPORTUNITY</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Copyright & Powered By */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <p className="text-xs sm:text-sm font-bicylette text-gray-500 mb-2 lg:mb-0">
                Powered by <a href="#" className="underline hover:text-black transition-colors">Luxury Presence</a>
              </p>
              <p className="text-xs sm:text-sm font-bicylette text-gray-500">
                Copyright © 2025 | <a href="#" className="underline hover:text-black transition-colors">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App