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
  const heroRef = useRef(null)
  const droneSectionRef = useRef(null)
  const heroImageSectionRef = useRef(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const droneVideoRef = useRef<HTMLVideoElement>(null)

  // Intersection Observer for video visibility - ensures only one video plays at a time
  useEffect(() => {
    if (!heroRef.current || !droneSectionRef.current || !heroImageSectionRef.current) return

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
    droneObserver.observe(droneSectionRef.current)
    heroImageObserver.observe(heroImageSectionRef.current)

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current)
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
            {/* Navigation Links with Logo in Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#home" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Home
                </a>
                <a href="#listings" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Listings
                </a>
                
                {/* Logo in Center */}
                <div className="flex items-center">
                  <img 
                    src={logoImg} 
                    alt="Logo" 
                    className="h-20 w-auto"
                  />
                </div>
                
                <a href="#lets-move" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Let's Move
                </a>
                <a href="#about" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  About Us
                </a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="absolute right-0 flex items-center">
              <button className="md:hidden text-gray-500 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
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
        <div className="h-full w-full flex items-end justify-center pb-16">
          {/* All text centered */}
          <div className="text-white flex flex-col items-center text-center">
            <h1 className="text-4xl font-cinzel font-semibold drop-shadow-lg text-center">
              MARCI METZGER - THE RIDGE REALTY GROUP
            </h1>
            <p className="text-4xl md:text-2xl mb-8 drop-shadow-md font-cinzel font-semibold text-center">
              Pahrump Realtor
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Luxury Real Estate Layout */}
      <section className="min-h-screen w-full bg-white py-20 relative">
        {/* Brown background rectangle spanning full width */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen brown-bg-rectangle" style={{backgroundColor: '#F5F2ED'}}></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-64 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-[40px] font-syncopate font-normal text-black mb-4 tracking-tight">
              PAHRUMP'S #1 LUXURY REALTOR®
            </h1>
            <p className="text-[16px] font-bicylette font-normal text-gray-700 tracking-[3px]">
              THE LAST SIX CONSECUTIVE YEARS
            </p>
            <p className="text-[18px] font-bicylette font-normal text-gray-700 leading-relaxed mt-6">
              With nearly 30 years of experience, Marci Metzger is the face of Pahrump's luxury <br></br>real estate market, 
              with unparalleled passion and commitment to the Pahrump Lifestyle.
            </p>
          </div>
          
          {/* Three Feature Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Panel 1 - Who You Work With Matters */}
            <div className="relative aspect-square overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src={image1} 
                alt="Modern Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bicylette font-normal text-center">WHO YOU WORK WITH MATTERS</h3>
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
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bicylette font-normal text-center">PROPERTY VALUATION</h3>
              </div>
            </div>

            {/* Panel 3 - Press */}
            <div className="relative aspect-square overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src={image3} 
                alt="Professional Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bicylette font-normal text-center">PRESS</h3>
              </div>
            </div>
          </div>

          {/* Meet Marci Metzger Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Side - Text */}
            <div className="flex flex-col justify-start text-left -mt-2">
              <h2 className="text-[56px] font-syncopate font-normal text-black mb-6 tracking-tight text-left">
                MEET MARCI METZGER
              </h2>
              <p className="text-[18px] font-bicylette font-normal text-gray-700 leading-relaxed mb-8 text-left">
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
          <div className="border-t border-gray-200 pt-12 mb-16">
            <div className="text-center mb-8">
              <p className="text-gray-600 font-medium">As Featured In</p>
            </div>
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll whitespace-nowrap">
                {/* First set of logos */}
                <div className="flex items-center space-x-12 mr-12">
                  <div className="text-gray-500 font-bold text-lg opacity-60">RISMEDIA</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">PAHRUMP CHAMBER</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REALTOR.COM</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">ZILLOW</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">HOMES.COM</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">TRULIA</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REDFIN</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">NEVADA REALTORS</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">INMAN</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REALTOR MAGAZINE</div>
            </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center space-x-12 mr-12">
                  <div className="text-gray-500 font-bold text-lg opacity-60">RISMEDIA</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">PAHRUMP CHAMBER</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REALTOR.COM</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">ZILLOW</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">HOMES.COM</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">TRULIA</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REDFIN</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">NEVADA REALTORS</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">INMAN</div>
                  <div className="text-gray-500 font-bold text-lg opacity-60">REALTOR MAGAZINE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Quote Section */}
          <div className="text-center mb-16">
            <blockquote className="text-[25px] font-bicylette font-normal text-gray-800 leading-relaxed max-w-4xl mx-auto mb-6">
              "I love that small-town feeling that our community offers. My success comes from helping clients 
              find homes that suit them as well as our community suits me — with spectacular golf courses, 
              parks, and easy access to Las Vegas, Pahrump is truly a great place to call home."
            </blockquote>
            <cite className="text-[18px] font-syncopate font-normal text-gray-600">
              MARCI METZGER - THE RIDGE REALTY GROUP
            </cite>
          </div>
        </div>
      </section>

      {/* Services Section with Background Image */}
      <section className="h-[95vh] w-full relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroWebp})`
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-[95vh] flex items-center justify-center">
          <div className="w-full h-full">
            <div className="w-full h-full">
              {/* Three Big Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full h-full">
                {/* Button 1 - Bespoke Marketing */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300" style={{fontSize: '50px'}}>
                      REAL ESTATE DONE RIGHT
                    </h3>
                  </div>
                </div>

                {/* Button 2 - Property Valuation */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 border-l-white border-r-white p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white text-[25px] font-syncopate  text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
                      COMMERCIAL & RESIDENTIAL
                    </h3>
                  </div>
                </div>

                {/* Button 3 - Market Leaders */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 p-8 h-full flex items-center justify-center hover:backdrop-blur-md transition-all duration-300 w-full">
                    <h3 className="text-white text-[25px] font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
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
      <section className="min-h-screen w-full relative" style={{backgroundColor: '#BEAF9E'}}>
        {/* Text Content - Centered at Top */}
        <div className="w-full flex flex-col items-center justify-start pt-20 px-16">
          {/* Main Title */}
            <h1 className="text-[56px] font-syncopate font-normal text-white mb-6 text-center" style={{fontWeight: 400, letterSpacing: 0, lineHeight: 1.18}}>
              PROVEN RESULTS
            </h1>
          
          {/* Subtitle */}
          <h2 className="font-bicylette font-normal text-white mb-8 text-center uppercase" style={{fontSize: '16px', letterSpacing: '3px'}}>
            CONSISTENTLY HONORED AMONG PAHRUMP'S SELECT MULTI-MILLION DOLLAR PRODUCERS
          </h2>
          
          {/* Description Paragraph */}
          <p className="font-bicylette font-normal text-white mb-12 text-center max-w-4xl mx-auto leading-relaxed" style={{fontSize: '18px'}}>
            With nearly 30 years of experience, Marci Metzger is the face of Pahrump's luxury real estate market, 
            with unparalleled passion and commitment to the Pahrump Lifestyle. As Pahrump's top residential REALTOR® 
            for the past four years, she has closed over $28.5 million in sales while assisting nearly 90 clients 
            in 2021 alone, establishing her as the definitive authority in Nevada's premier desert community.
          </p>
        </div>
        
        {/* Bottom Section with Stats and Images */}
        <div className="w-full h-full flex">
          {/* Left Side - Stats Column */}
          <div className="flex-1 flex flex-col justify-center px-16">
            <div className="max-w-md mx-auto">
              <div className="text-left space-y-8">
                {/* Stat 1 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2" style={{fontSize: '44px'}}>$28.5M</div>
                  <div className="font-bicylette font-normal text-white" style={{fontSize: '18px'}}>in 2021 Sales</div>
                </div>
                
                {/* Stat 2 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2" style={{fontSize: '44px'}}>#1</div>
                  <div className="font-bicylette font-normal text-white" style={{fontSize: '18px'}}>Realtor in Pahrump</div>
                </div>
                
                {/* Stat 3 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2" style={{fontSize: '44px'}}>90</div>
                  <div className="font-bicylette font-normal text-white" style={{fontSize: '18px'}}>Clients Assisted in 2021</div>
                </div>
                
                {/* Stat 4 */}
                <div>
                  <div className="font-syncopate font-normal text-white mb-2" style={{fontSize: '44px'}}>30</div>
                  <div className="font-bicylette font-normal text-white" style={{fontSize: '18px'}}>Years Experience</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image Collage */}
          <div className="flex-1 relative ">
            {/* Main Exterior Image (Right Side) */}
            <div className="absolute bottom-0 right-80 w-2/4 h-full">
              <img 
                src={heroWebp} 
                alt="Luxury Property Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Interior Kitchen/Living Image (Left Side, Overlapping) */}
            <div className="absolute top-1/4 -left-32 w-2/5 h-2/5 z-50">
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
      <section className="h-screen w-full bg-white py-16 overflow-hidden relative z-10">
        <div className="w-full   ">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight" style={{fontSize: '42px'}}>
              MARCI METZGER'S CURRENT INVENTORY
            </h1>
            <p className="font-bicylette font-normal text-gray-700" style={{fontSize: '18px'}}>
              REPRESENTING A BESPOKE COLLECTION OF PARHUM'S FINEST PROPERTIES
            </p>
            <div className="w-[80vw] h-px bg-gray-400 mx-auto mt-6"></div>
          </div>
          
          {/* Property Carousel */}
          <div className="relative w-screen overflow-x-hidden">
          <PropertyCarousel />
          </div>
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
        <div className="relative z-20 h-[60vh] flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="font-bicylette font-normal" style={{fontSize: '44px'}}>Recent Notable Sale</h2>
            <h3 className="font-normal mb-24" style={{fontFamily: 'Cormorant Garamond', fontSize: '20px'}}>Austin, TX Modern Masterpiece</h3>
             <p className="font-normal mb-14 mx-auto leading-relaxed" style={{fontFamily: 'Cormorant Garamond', fontSize: '20px', width: '90vh'}}>
              Nestled within the pristine confines of Tarrytown's only privately gated enclave, this opulent estate stands as one
              of just five exclusive residences. Emanating an aura of unparalleled luxury, it boasts an abundance of space
              for gracious living and grand entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Communities Section */}
      <section className="min-h-screen w-full bg-white py-20">
        <div className="w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight" style={{fontSize: '42px'}}>
              EXPLORE COMMUNITIES
            </h1>
            <h2 className="font-bicylette font-normal text-gray-700 mb-8" style={{fontSize: '18px'}}>
              PAHRUMP REAL ESTATE
            </h2>
            <p className="font-bicylette font-normal text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{fontSize: '18px'}}>
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
                    <div className="bg-transparent border border-white/20 p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-syncopate text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300" style={{fontSize: '32px'}}>
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
                    <div className="bg-transparent border border-white/20 border-l-white border-r-white p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-bicylette text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300" style={{fontSize: '32px'}}>
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
                    <div className="bg-transparent border border-white/20 p-8 h-full flex items-end justify-center hover:backdrop-blur-sm transition-all duration-300 w-full absolute inset-0">
                      <h3 className="text-white font-bicylette text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300" style={{fontSize: '32px'}}>
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
      <section className="min-h-screen w-full bg-white py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-syncopate font-normal text-black mb-4 tracking-tight" style={{fontSize: '42px'}}>
              RECENT PAHRUMP REAL ESTATE BLOGS
            </h1>
            <h2 className="font-bicylette font-normal text-gray-700 mb-8" style={{fontSize: '18px'}}>
              BE THE FIRST TO KNOW
            </h2>
            <p className="font-bicylette font-normal text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{fontSize: '18px'}}>
              Your go-to source for the latest trends in real estate, Pahrump, and so much more.
            </p>
          </div>
          
          {/* Divider Line */}
          <div className="w-full border-t border-gray-200 mb-12"></div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Blog Post Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Blog Post 1 */}
            <div className="bg-white overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image1} 
                  alt="Luxury Property Interior" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <h3 className="font-syncopate font-normal text-black mb-4 leading-tight mt-[25px]" style={{fontSize: '20px'}}>
                  HOW TO DETERMINE YOUR NON-NEGOTIABLES WHEN BUYING A LUXURY PROPERTY
                </h3>
                <p className="font-syncopate text-gray-600 mb-4" style={{fontSize: '14px', fontWeight: 600}}>
                  MARCI METZGER
                </p>
                <p className="font-bicylette text-gray-700 leading-relaxed" style={{fontSize: '18px'}}>
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
              <div className="text-left">
                <h3 className="font-syncopate font-normal text-black mb-4 leading-tight mt-[25px]" style={{fontSize: '20px'}}>
                  PAHRUMP LAKE THINGS TO DO
                </h3>
                <p className="font-syncopate text-gray-600 mb-4" style={{fontSize: '14px', fontWeight: 600}}>
                  MARCI METZGER
                </p>
                <p className="font-bicylette text-gray-700 leading-relaxed" style={{fontSize: '18px'}}>
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
        <div className="relative z-20 h-[60vh] flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="font-syncopate font-normal mb-8" style={{fontSize: '42px'}}>Luxury Real Estate Excellence</h2>
            <h3 className="font-bicylette font-normal mb-6" style={{fontSize: '18px'}}>Experience the Pahrump Lifestyle</h3>
            <p className="font-bicylette font-normal max-w-4xl mx-auto leading-relaxed mb-12" style={{fontSize: '18px'}}>
              Discover unparalleled luxury living in Pahrump's most exclusive communities. 
              From stunning lakefront properties to prestigious gated communities, 
              find your perfect home with Nevada's premier real estate expert.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Contact Button */}
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-white text-black px-8 py-4 rounded-lg font-syncopate font-normal text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact
              </button>
              
              {/* Home Search Button */}
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-syncopate font-normal text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Search Homes
              </button>
          </div>
          </div>
        </div>
      </section>


      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full h-full flex">
            {/* Left Section - Contact Form (30%) */}
            <div className="w-[30%] bg-white flex flex-col justify-center px-12">
              <div className="max-w-md mx-auto">
                <p className="font-bicylette text-gray-500 text-sm mb-2">Let me know how I can assist you.</p>
                <h2 className="font-syncopate font-normal text-gray-800 mb-8" style={{fontSize: '36px'}}>GET IN TOUCH</h2>
                
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette"
                      />
                    </div>
                  </div>
                  
                  {/* Contact Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-bicylette"
                      />
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 resize-none font-bicylette"
                    ></textarea>
                  </div>
                  
                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="font-bicylette text-xs text-gray-600 leading-relaxed">
                      By providing Marci Metzger your contact information, you acknowledge and agree to our Privacy Policy and consent to receiving marketing communications, including through automated calls, texts, and emails, some of which may use artificial or prerecorded voices. This consent isn't necessary for purchasing any products or services and you may opt out at any time. To opt out from texts, you can reply, 'stop' at any time. To opt out from emails, you click on the unsubscribe link in the emails. Message and data rates may apply.
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-4 rounded-lg font-syncopate font-normal text-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right Section - Image and Contact Info (70%) */}
            <div className="w-[70%] relative">
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
                <div className="absolute inset-0 p-12">
                  {/* Close Button */}
                  <div className="absolute top-12 right-12">
                    <button
                      onClick={() => setIsContactModalOpen(false)}
                      className="text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Contact Details - Top Left */}
                  <div className="absolute top-12 left-12 text-white text-left">
                    <h3 className="font-syncopate font-normal mb-8 text-left" style={{fontSize: '48px'}}>MARCI METZGER</h3>
                    <div className="space-y-4 text-xl text-left">
                      <p className="font-bicylette text-left">marci@theridgerealtygroup.com</p>
                      <p className="font-bicylette text-left">702.555.0123</p>
                      <p className="font-bicylette text-left">123 Main Street<br />Pahrump, NV 89048</p>
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="flex space-x-6 mt-8 justify-start">
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="w-full bg-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo, Contact & Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Side - Logo & Contact */}
            <div className="text-left">
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-syncopate font-bold text-xl mr-3">
                    MM
                  </div>
                  <div>
                    <div className="text-2xl font-syncopate font-bold text-black">METZGER</div>
                    <div className="text-sm font-bicylette text-gray-600">THE RIDGE REALTY GROUP</div>
                  </div>
                </div>
              </div>
              
              {/* Contact Person */}
              <div className="mb-6">
                <h3 className="text-xl font-syncopate font-bold text-black mb-2">MARCI METZGER</h3>
                <p className="text-gray-700 mb-1">
                  <a href="tel:7025550123" className="underline hover:text-black transition-colors">702.555.0123</a>
                </p>
                <p className="text-gray-700">
                  <a href="mailto:marci@theridgerealtygroup.com" className="underline hover:text-black transition-colors">marci@theridgerealtygroup.com</a>
              </p>
            </div>
          </div>
            
            {/* Right Side - Address */}
            <div className="text-right">
              <h4 className="text-lg font-syncopate font-bold text-black mb-4">ADDRESS</h4>
              <p className="text-gray-700">
                123 Main Street<br />
                Pahrump, NV 89048
              </p>
        </div>
          </div>
          
          {/* Navigation Links & Social Media */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center lg:justify-start gap-8 mb-6 lg:mb-0">
              <a href="#home" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium">HOME</a>
              <a href="#about" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium">ABOUT MARCI</a>
              <a href="#listings" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium">FEATURED PROPERTIES</a>
              <a href="#communities" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium">NEIGHBORHOODS</a>
              <a href="#contact" className="text-black hover:text-gray-600 transition-colors font-bicylette font-medium">LET'S CONNECT</a>
            </nav>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Legal Disclaimers & Broker Information */}
          <div className="mb-8">
            <div className="space-y-2 mb-4">
              <p className="text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">Nevada Real Estate Commission Consumer Protection Notice</a>
              </p>
              <p className="text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">Nevada Real Estate Commission Information About Brokerage Services</a>
              </p>
              <p className="text-sm font-bicylette text-gray-600">
                <a href="#" className="underline hover:text-black transition-colors">NREC Disclaimer</a>
              </p>
              <p className="text-sm font-bicylette text-gray-600">
                The Ridge Realty Group | 702.555.0123
              </p>
              <p className="text-sm font-bicylette text-gray-600">
                Broker Of The Firm | Marci Metzger
              </p>
            </div>
            
            <p className="text-xs font-bicylette text-gray-500 leading-relaxed mb-4">
              The Ridge Realty Group® and The Ridge Realty Group Logo are service marks licensed to The Ridge Realty Group Affiliates LLC and used with permission. 
              The Ridge Realty Group fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated. 
              Any services or products provided by independently owned and operated franchisees are not provided by, affiliated with or related to The Ridge Realty Group 
              Affiliates LLC nor any of its affiliated companies.
            </p>
            
            {/* REALTOR and Equal Housing Logos */}
            <div className="flex space-x-6 mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold mr-2">R</div>
                <span className="text-xs font-bicylette text-gray-600">REALTOR</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold mr-2">=</div>
                <span className="text-xs font-bicylette text-gray-600">EQUAL HOUSING OPPORTUNITY</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Copyright & Powered By */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <p className="text-sm font-bicylette text-gray-500 mb-2 lg:mb-0">
                Powered by <a href="#" className="underline hover:text-black transition-colors">Luxury Presence</a>
              </p>
              <p className="text-sm font-bicylette text-gray-500">
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