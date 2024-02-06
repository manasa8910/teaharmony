// Carousel.js

import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  const disablePrev = currentImage === 0;
  const disableNext = currentImage === images.length - 1;

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentImage * (100 / images.length)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="object-contain w-full h-[91.5vh]"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevImage}
        disabled={disablePrev}
        className={`absolute left-5 top-1/2 transform -translate-y-1/2 bg-green text-white p-2 rounded-full focus:outline-none ${
          disablePrev ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        disabled={disableNext}
        className={`absolute right-5 top-1/2 transform -translate-y-1/2 bg-green text-white p-2 rounded-full focus:outline-none ${
          disableNext ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
