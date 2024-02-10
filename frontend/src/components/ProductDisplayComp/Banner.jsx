import React from "react";

function Banner({ type }) {
  return (
    <div className="relative bg-blue-300 mt-[7vh]  lg:h-[80vh]">
      <p
        id="tagline"
        className="absolute text-white font-bold right-0 p-2 rounded-lg  m-10 z-10 sm:text-3xl bg-black bg-opacity-50 md:text-2xl lg:text-3xl xl:text-4xl"
      >
        {type === "Teaware"
          ? "Brewing Happiness, One Cup at a Time"
          : "Sip the Elegance, Taste the Tradition"}
      </p>
      <img
        className="h-full w-full object-cover scale-[102%] lg:scale-[101%]"
        src={
          type === "Teaware"
            ? "https://images.unsplash.com/photo-1596379913483-1c619cbc1e09"
            : "https://images.unsplash.com/photo-1514733670139-4d87a1941d55"
        }
        alt="banner"
      />
    </div>
  );
}

export default Banner;
