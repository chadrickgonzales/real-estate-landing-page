import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 added

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "SIXTH & BLANCO",
    price: "$30,000,000",
    tag: "Now Taking Reservations",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    title: "The Avery Tower",
    price: "$15,000,000",
    tag: "For Lease",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    title: "Marina Residence",
    price: "$22,000,000",
    tag: "Available",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600585154154-3d26d94e3d6f",
    title: "Ocean View Villa",
    price: "$12,500,000",
    tag: "For Lease",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "Downtown Loft",
    price: "$4,900,000",
    tag: "Available",
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
                  <div className="relative overflow-hidden shadow-lg">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-[550px] object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gray-900/70 text-white text-sm px-3 py-1 rounded">
                      {property.tag}
                    </div>

                    {/* ✅ Animated text section */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={property.id}
                          className="absolute bottom-6 left-6 text-white text-left"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <motion.h3
                            className="text-3xl font-semibold tracking-widest"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >
                            {property.title}
                          </motion.h3>
                          <motion.p
                            className="text-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                          >
                            {property.price}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {/* Arrows */}
          <div className="flex justify-start gap-6 mt-8 ml-48">
            <button onClick={prevSlide}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={nextSlide}>
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          {/* View All Button */}
          <div className="text-center mt-10 mr-48">
            <button className="border border-black px-10 py-4 text-sm font-medium tracking-widest hover:bg-black hover:text-white transition">
              VIEW ALL PROPERTIES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
