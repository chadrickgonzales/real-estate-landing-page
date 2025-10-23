import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import property images
import property1 from "../assets/images/property1.jpg";
import property2 from "../assets/images/property2.jpg";
import property3 from "../assets/images/property3.jpg";
import property4 from "../assets/images/property4.jpg";
import property5 from "../assets/images/property5.jpg";
import property6 from "../assets/images/property6.jpg";
import property7 from "../assets/images/property7.jpg";
import property8 from "../assets/images/property8.jpg";
import property9 from "../assets/images/property9.jpg";
import property10 from "../assets/images/property10.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "5520 N Leslie Street, Pahrump, Nevada NV -1147",
    price: "$1,490,999",
    tag: "Available",
  },
  {
    id: 2,
    image: property2,
    title: "4751 W Adkisson Street, Pahrump, Nevada NV -3541",
    price: "$1,950,000",
    tag: "For Sale",
  },
  {
    id: 3,
    image: property3,
    title: "2301 Zephyr Avenue, Pahrump, Nevada NV -5532",
    price: "$900,000",
    tag: "Available",
  },
  {
    id: 4,
    image: property4,
    title: "760 Fort Churchill Road, Pahrump, Nevada NV -1203",
    price: "$1,280,000",
    tag: "For Sale",
  },
  {
    id: 5,
    image: property5,
    title: "4892 Quail Run Road, Pahrump, Nevada NV -3002",
    price: "$1,100,000",
    tag: "Available",
  },
  {
    id: 6,
    image: property6,
    title: "2851 Winchester Avenue, Pahrump, Nevada NV -0733",
    price: "$975,000",
    tag: "For Sale",
  },
  {
    id: 7,
    image: property7,
    title: "1221 Marion Miller, Pahrump, Nevada NV -0791",
    price: "$970,000",
    tag: "Available",
  },
  {
    id: 8,
    image: property8,
    title: "1830 E Fuchsia Street, Pahrump, Nevada NV -8355",
    price: "$959,900",
    tag: "For Sale",
  },
  {
    id: 9,
    image: property9,
    title: "3600 E Bridger Street, Pahrump, Nevada NV",
    price: "$950,000",
    tag: "Available",
  },
  {
    id: 10,
    image: property10,
    title: "2181 E Winery Road, Pahrump, Nevada NV -6294",
    price: "$949,000",
    tag: "For Sale",
  },
];

const loopedProperties = [...properties, ...properties, ...properties];

export default function PropertyCarousel() {
  const n = properties.length;
  const middleIndex = n;
  const transitionMs = 700;

  const [index, setIndex] = useState(middleIndex);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const jumpingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransitionEnabled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (jumpingRef.current) return;
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (jumpingRef.current) return;
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!transitionEnabled) return;

    if (index >= n && index < 2 * n) return;

    jumpingRef.current = true;
    let newIndex;

    if (index >= 2 * n) newIndex = index - n;
    else if (index < n) newIndex = index + n;
    else newIndex = middleIndex;

    const t = setTimeout(() => {
      setTransitionEnabled(false);
      setIndex(newIndex);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setTransitionEnabled(true);
          jumpingRef.current = false;
        }, 20);
      });
    }, transitionMs);

    return () => {
      clearTimeout(t);
      jumpingRef.current = false;
    };
  }, [index, n, transitionMs, transitionEnabled]);

  const cardVw = 80;
  const translateCalc = `calc(50vw - ${(index + 0.5) * cardVw}vw)`;

  return (
    <div className="w-screen overflow-hidden bg-white py-16">
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            className={`flex ${
              transitionEnabled ? "transition-transform duration-700 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(${translateCalc})`,
            }}
          >
            {loopedProperties.map((property, i) => {
              const isActive = i === index;
              return (
                <div
                  key={`${property.id}-${i}`}
                  className="flex-shrink-0 w-[80vw] px-4"
                  style={{
                    transform: `scale(${isActive ? 1 : 0.92})`,
                    opacity: isActive ? 1 : 0.65,
                    transition: "transform 400ms, opacity 400ms",
                  }}
                >
                  <div className="relative overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-md group">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute top-4 right-4 bg-gray-900/70 text-white text-sm px-3 py-1 rounded z-10">
                      {property.tag}
                    </div>

                    {/* ✅ Animated text section */}
                    <div className="absolute bottom-6 left-6 text-white text-left z-10 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-boska font-medium tracking-widest">
                        {property.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg font-switzer font-normal">
                        {property.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

         <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mt-8 px-8 md:px-0">
           {/* Arrows */}
           <div className="flex justify-center md:justify-start gap-6 md:ml-52">
             <button onClick={prevSlide}>
               <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
             </button>
             <button onClick={nextSlide}>
               <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
             </button>
           </div>

           {/* View All Button */}
           <div className="text-center md:mr-56">
             <button className="border border-black px-6 py-3 md:px-10 md:py-4 text-xs md:text-sm font-medium tracking-widest hover:bg-black hover:text-white transition rounded-md">
               VIEW ALL PROPERTIES
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}