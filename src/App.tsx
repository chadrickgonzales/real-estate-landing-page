import { useState, useEffect, useRef } from 'react'
import './App.css'
import PropertyCarousel from './components/PropertyCarousel'

function App() {
  const [displayValue, setDisplayValue] = useState(1)
  const [showK, setShowK] = useState(false)
  
  const [lastYearValue, setLastYearValue] = useState(1)
  const [showLastYearK, setShowLastYearK] = useState(false)
  
  const [fiveYearValue, setFiveYearValue] = useState(1)
  const [showFiveYearK, setShowFiveYearK] = useState(false)
  
  const [loanAmountValue, setLoanAmountValue] = useState(1)
  
  const [grossRentValue, setGrossRentValue] = useState(1)
  
  const [lastYearPercent, setLastYearPercent] = useState(0)
  const [fiveYearPercent, setFiveYearPercent] = useState(0)
  
  const [isVideoSticky, setIsVideoSticky] = useState(true)
  const heroRef = useRef(null)

  // Scroll detection for video sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect()
        // When hero section is completely scrolled past, make video scroll normally
        setIsVideoSticky(heroRect.bottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 1
      const interval = setInterval(() => {
        currentValue += Math.ceil(950 / 60) 
        
        if (currentValue >= 950) {
          currentValue = 950
          setDisplayValue(currentValue)
          clearInterval(interval)
          
          setTimeout(() => {
            setShowK(true)
          }, 100) 
        } else {
          setDisplayValue(currentValue)
        }
      }, 16) 

      return () => clearInterval(interval)
    }, 400) 

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 1
      const interval = setInterval(() => {
        currentValue += Math.ceil(920 / 60) // Slower counting for longer duration
        
        if (currentValue >= 920) {
          currentValue = 920
          setLastYearValue(currentValue)
          clearInterval(interval)
          
          setTimeout(() => {
            setShowLastYearK(true)
          }, 100) // Faster K appearance
        } else {
          setLastYearValue(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 600) // Start when Last Year section slides up (delay-6)

    return () => clearTimeout(timer)
  }, [])

  // Animation for $524K (5 Years)
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 1
      const interval = setInterval(() => {
        currentValue += Math.ceil(524 / 60) // Slower counting for longer duration
        
        if (currentValue >= 524) {
          currentValue = 524
          setFiveYearValue(currentValue)
          clearInterval(interval)
          
          setTimeout(() => {
            setShowFiveYearK(true)
          }, 100) // Faster K appearance
        } else {
          setFiveYearValue(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 800) // Start when 5 Years section slides up (delay-8)

    return () => clearTimeout(timer)
  }, [])

  // Animation for $760,000 (Loan Amount)
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 1
      const interval = setInterval(() => {
        currentValue += Math.ceil(760000 / 60) // Slower counting for longer duration
        
        if (currentValue >= 760000) {
          currentValue = 760000
          setLoanAmountValue(currentValue)
          clearInterval(interval)
        } else {
          setLoanAmountValue(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 1200) // Start when Loan Amount row slides up (delay-12)

    return () => clearTimeout(timer)
  }, [])

  // Animation for $14,250 (Gross Rent)
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 1
      const interval = setInterval(() => {
        currentValue += Math.ceil(14250 / 60) // Slower counting for longer duration
        
        if (currentValue >= 14250) {
          currentValue = 14250
          setGrossRentValue(currentValue)
          clearInterval(interval)
        } else {
          setGrossRentValue(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 1500) // Start when Gross Rent row slides up (delay-15)

    return () => clearTimeout(timer)
  }, [])

  // Animation for 3.26% (Last Year percentage)
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 0
      const interval = setInterval(() => {
        currentValue += 0.1 // Slower counting for longer duration
        
        if (currentValue >= 3.26) {
          currentValue = 3.26
          setLastYearPercent(currentValue)
          clearInterval(interval)
        } else {
          setLastYearPercent(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 600) // Start when Last Year section slides up (delay-6)

    return () => clearTimeout(timer)
  }, [])

  // Animation for 81.30% (5 Years percentage)
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 0
      const interval = setInterval(() => {
        currentValue += 1.5 // Slower counting for longer duration
        
        if (currentValue >= 81.30) {
          currentValue = 81.30
          setFiveYearPercent(currentValue)
          clearInterval(interval)
        } else {
          setFiveYearPercent(currentValue)
        }
      }, 16) // Slower interval for longer duration

      return () => clearInterval(interval)
    }, 800) // Start when 5 Years section slides up (delay-8)

    return () => clearTimeout(timer)
  }, [])

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
                    src="/src/assets/images/logo.png" 
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

      {/* Video Background - Conditional Sticky */}
      <div className={`${isVideoSticky ? 'fixed top-0 left-0 w-screen h-screen' : 'relative h-0'} -z-10`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/src/assets/images/hero.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Section - Full Screen */}
      <section ref={heroRef} className="h-screen w-full flex items-center justify-center relative z-20">
        <div className="w-full flex items-center justify-between">
          {/* All text aligned to left */}
          <div className="text-white flex flex-col justify-center h-screen text-left -mt-14 w-full">
              <h2 className="text-extra-large font-helvetica-now font-semibold drop-shadow-lg leading-tightest letter-spacing-tightest text-left">
                OPENING<br />MORE<br />DOORS
              </h2>
            <h1 className="text-6xl md:text-2xl drop-shadow-lg font-cinzel font-semibold mt-6 text-left ml-4">
              MARCI METZGER - THE RIDGE REALTY GROUP
            </h1>
            <p className="text-3xl md:text-2xl mb-8 drop-shadow-md font-cinzel font-semibold text-left ml-4">
              Pahrump Realtor
            </p>
          </div>
          
          {/* Phone Icon - Right Side */}
          <div className="flex items-center justify-center h-screen mr-80 mb-40 relative ">
            {/* Perfect phone-shaped blurred background */}
            <div className="bg-white/0 backdrop-blur-md phone-background-perfect"></div>
            
            {/* Additional blurred rectangle in front */}
            <div className="bg-white/10 backdrop-blur-lg phone-background-front"></div>
            
            {/* Property Management Interface */}
            <div className="absolute inset-0 flex flex-col justify-center z-20 mb-10 mt-5">
                {/* Property Address - Left positioned */}
                <div className="text-left mb-2 ml-4 mt-10">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg phone-content-animate phone-content-delay-1">9876 Lexington Ave</h3>
                  <p className="text-white text-lg drop-shadow-md phone-content-animate phone-content-delay-2">New York, NY 11221</p>
                </div>
              
              {/* Main Content Card - Centered */}
              <div className="flex justify-center">
                <div className=" rounded-2xl p-6 w-80">
                {/* Current Value Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white text-sm phone-content-animate phone-content-delay-3">Current Value</p>
                      <h2 className="text-3xl font-bold text-white phone-content-animate phone-content-delay-4">
                        ${displayValue.toLocaleString()}{showK ? 'K' : ''}
                      </h2>
                    </div>
                    {/* Graph Section */}
                    <div className="w-32 h-20 relative overflow-hidden phone-content-animate phone-content-delay-5">
                      {/* Smooth wavy line chart */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 80">
                        {/* Smooth curved line with realistic market fluctuations */}
                        <path
                          d="M 8,60 Q 20,50 35,55 T 55,45 Q 70,35 85,40 T 110,30 Q 120,20 125,15"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="graph-line-animate"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Historical Performance */}
                  <div className="flex justify-between pt-2">
                    <div className="text-center phone-content-animate phone-content-delay-6">
                      <p className="text-white text-xs">Last Year</p>
                      <p className="text-lg font-semibold text-white">
                        ${lastYearValue.toLocaleString()}{showLastYearK ? 'K' : ''}
                      </p>
                      <p className="text-white text-sm">↗ {lastYearPercent.toFixed(2)}%</p>
                    </div>
                    <div className="w-0.5 bg-white mx-4 h-16 phone-content-animate phone-content-delay-7 divider-grow-animate"></div>
                    <div className="text-center phone-content-animate phone-content-delay-8">
                      <p className="text-white text-xs">5 Years</p>
                      <p className="text-lg font-semibold text-white">
                        ${fiveYearValue.toLocaleString()}{showFiveYearK ? 'K' : ''}
                      </p>
                      <p className="text-white text-sm">↗ {fiveYearPercent.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
                
                {/* Loan Details */}
                <div className="space-y-3 mt-14">
                  <div className="flex justify-between items-center phone-content-animate phone-content-delay-9">
                    <span className="text-white text-sm">Status</span>
                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs">Clear To Close</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-10">
                    <span className="text-white text-sm">Loan Purpose</span>
                    <span className="text-white text-sm">Purchase</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-11">
                    <span className="text-white text-sm">Term</span>
                    <span className="text-white text-sm">30 Years I/O</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-12">
                    <span className="text-white text-sm">Loan Amount</span>
                    <span className="text-white text-sm">${loanAmountValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-13">
                    <span className="text-white text-sm">LTV</span>
                    <span className="text-white text-sm">80%</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-14">
                    <span className="text-white text-sm">DSCR</span>
                    <span className="text-white text-sm">1.35</span>
                  </div>
                  <div className="flex justify-between phone-content-animate phone-content-delay-15">
                    <span className="text-white text-sm">Gross Rent</span>
                    <span className="text-white text-sm">${grossRentValue.toLocaleString()}</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
            
            <img
              src="/src/assets/images/phone.svg"
              alt="Phone"
              className="phone-icon-large text-white drop-shadow-lg relative z-10"
            />
          </div>
        </div>
      </section>

      {/* About Section - Luxury Real Estate Layout */}
      <section className="min-h-screen w-full bg-white py-20 relative">
        {/* Brown background rectangle spanning full width */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen brown-bg-rectangle" style={{marginTop: '-40px', backgroundColor: '#F5F2ED'}}></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-64 relative z-10">
          {/* Header Section */}
          <div className="text-right mb-16 pr-8">
            <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
              PAHRUMP'S #1 LUXURY REALTOR®
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Top Producer Company-wide for The Ridge Realty Group for Six Consecutive Years
            </p>
          </div>
          
          {/* Three Feature Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Panel 1 - Who You Work With Matters */}
            <div className="relative h-80 overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src="/src/assets/images/1.webp" 
                alt="Modern Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2">WHO YOU WORK WITH MATTERS</h3>
                <p className="text-white/90 text-sm">Experience the difference of working with a top-tier professional</p>
              </div>
            </div>

            {/* Panel 2 - Property Valuation */}
            <div className="relative h-80 overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src="/src/assets/images/2.webp" 
                alt="Luxury Property" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2">PROPERTY VALUATION</h3>
                <p className="text-white/90 text-sm">Accurate market analysis for optimal pricing strategies</p>
              </div>
            </div>

            {/* Panel 3 - Press */}
            <div className="relative h-80 overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src="/src/assets/images/3.webp" 
                alt="Professional Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2">PRESS</h3>
                <p className="text-white/90 text-sm">Featured in top publications and media outlets</p>
              </div>
            </div>
          </div>

          {/* Meet Marci Metzger Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Side - Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">
                MEET MARCI METZGER
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Marci's connections to the top of the industry affords her access to the most coveted properties, 
                many of which are never listed in the highly competitive Pahrump luxury market. With over a decade 
                of experience and a proven track record, she delivers exceptional results for her clients.
              </p>
              
            </div>

            {/* Right Side - Portrait */}
            <div className="relative">
              <div className="aspect-[45/39] overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/images/owner1.webp" 
                  alt="Professional Portrait of Marci Metzger" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Achievement Quote Section */}
          <div className="text-center mb-16">
            <blockquote className="text-2xl font-medium text-gray-800 leading-relaxed max-w-4xl mx-auto mb-6">
              "With $50 million in sales volume last year — averaging out to almost $140,000 a day — 
              she earned the No. 1 spot in the individual agent category of the Residential Real Estate Awards 
              for the second year in a row."
            </blockquote>
            <cite className="text-lg font-semibold text-gray-600">
              PAHRUMP BUSINESS JOURNAL
            </cite>
          </div>

          {/* Media Logos Section */}
          <div className="border-t border-gray-200 pt-12">
            <div className="text-center mb-8">
              <p className="text-gray-600 font-medium">As Featured In</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-gray-500 font-bold text-lg">MANSION GLOBAL</div>
              <div className="text-gray-500 font-bold text-lg">AD</div>
              <div className="text-gray-500 font-bold text-lg">The New York Times</div>
              <div className="text-gray-500 font-bold text-lg">WSJ</div>
              <div className="text-gray-500 font-bold text-lg">BUSINESS INSIDER</div>
              <div className="text-gray-500 font-bold text-lg">dw</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Background Image */}
      <section className="h-[80vh] w-full relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/src/assets/images/hero.webp)'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-[80vh] flex items-center justify-center">
          <div className="w-full h-full">
            <div className="w-full h-full">
              {/* Three Big Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full h-full">
                {/* Button 1 - Bespoke Marketing */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 p-8 h-full flex items-center justify-center hover:backdrop-blur-sm transition-all duration-300 w-full">
                    <h3 className="text-white text-[25px] font-syncopate  text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
                      REAL ESTATE DONT RIGHT
                    </h3>
                  </div>
                </div>

                {/* Button 2 - Property Valuation */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 border-l-white border-r-white p-8 h-full flex items-center justify-center hover:backdrop-blur-sm transition-all duration-300 w-full">
                    <h3 className="text-white text-[25px] font-syncopate  text-center tracking-wide group-hover:-translate-y-2 transition-transform duration-300">
                      COMMERCIAL & RESIDENTIAL
                    </h3>
                  </div>
                </div>

                {/* Button 3 - Market Leaders */}
                <div className="group cursor-pointer w-full h-full">
                  <div className="bg-transparent border border-white/20 p-8 h-full flex items-center justify-center hover:backdrop-blur-sm transition-all duration-300 w-full">
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
      <section className="min-h-screen w-full relative" style={{backgroundColor: '#DDCDBB'}}>
        {/* Text Content - Centered at Top */}
        <div className="w-full flex flex-col items-center justify-start pt-20 px-16">
          {/* Main Title */}
            <h1 className="text-[56px] font-syncopate font-normal text-white mb-6 tracking-wider text-center">
              PROVEN RESULTS
            </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl font-bicylette font-normal text-white mb-8 tracking-wide text-center uppercase">
            CONSISTENTLY HONORED AMONG PAHRUMP'S SELECT MULTI-MILLION DOLLAR PRODUCERS
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-lg font-bicylette font-normal text-white mb-12 text-center max-w-4xl mx-auto leading-relaxed">
            With over a decade of experience, Marci Metzger is the face of Pahrump's luxury real estate market, 
            with unparalleled passion and commitment to the Pahrump Lifestyle. As the #1 Realtor in Pahrump, NV 
            for the last 6 consecutive years, Marci has sold over $50 Million throughout her career.
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
                  <div className="text-7xl font-bicylette font-normal text-white mb-2">$50M</div>
                  <div className="text-lg font-bicylette font-normal text-white">in Career Sales</div>
                </div>
                
                {/* Stat 2 */}
                <div>
                  <div className="text-7xl font-bicylette font-normal text-white mb-2">#1</div>
                  <div className="text-lg font-bicylette font-normal text-white">Realtor in Pahrump</div>
                </div>
                
                {/* Stat 3 */}
                <div>
                  <div className="text-7xl font-bicylette font-normal text-white mb-2">$950K</div>
                  <div className="text-lg font-bicylette font-normal text-white">Total Sales in 2023</div>
                </div>
                
                {/* Stat 4 */}
                <div>
                  <div className="text-7xl font-bicylette font-normal text-white mb-2">#1</div>
                  <div className="text-lg font-bicylette font-normal text-white">The Ridge Realty Group Agent</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image Collage */}
          <div className="flex-1 relative ">
            {/* Main Exterior Image (Right Side) */}
            <div className="absolute bottom-0 right-80 w-2/4 h-full">
              <img 
                src="/src/assets/images/hero.webp" 
                alt="Luxury Property Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Interior Kitchen/Living Image (Left Side, Overlapping) */}
            <div className="absolute top-1/4 -left-32 w-2/5 h-2/5 z-50">
              <img 
                src="/src/assets/images/1.webp" 
                alt="Luxury Interior Kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kumara's Current Inventory Section */}
      <section className="h-screen w-full bg-white py-12 overflow-hidden relative z-10">
        <div className="w-full   ">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
              MARCI METZGER'S CURRENT INVENTORY
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              REPRESENTING A BESPOKE COLLECTION OF PARHUM'S FINEST PROPERTIES
            </p>
          </div>
          
          {/* Property Carousel */}
          <div className="relative w-screen overflow-x-hidden">
          <PropertyCarousel />
          </div>
        </div>
      </section>

      {/* Another Sample Section */}
      <section className="min-h-screen w-full bg-gray-100/90 backdrop-blur-sm py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">More Content</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This is another section to demonstrate the scrolling effect. The background image remains fixed 
              while all this content scrolls over it, creating a beautiful parallax-like effect.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-12 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Sample Article</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App