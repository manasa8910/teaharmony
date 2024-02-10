import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CardWithFlipAnimation = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    gsap.from(card, {
      // opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=200",
        end: "bottom center",
        scrub: true,
        // markers: true, // For debugging, remove in production
        toggleClass: "flipped",
        onToggle: () => {
          console.log("Toggled");
        },
      },
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        ref={cardRef}
        className="relative w-64 h-64 bg-white rounded-lg shadow-md transform transition-transform duration-500"
      >
        <div className="absolute inset-0 w-full h-full bg-blue-500 rounded-lg backface-hidden">
          {/* Front of the card */}
          <div className="flex justify-center items-center w-full h-full">
            <h2 className="text-white text-2xl font-semibold">Front Content</h2>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full bg-green-500 rounded-lg backface-hidden rotate-180">
          {/* Back of the card */}
          <div className="flex justify-center items-center w-full h-full">
            <h2 className="text-white text-2xl font-semibold">Back Content</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithFlipAnimation;
