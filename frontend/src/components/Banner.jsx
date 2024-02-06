import React from "react";

function Banner({ type }) {
  console.log(type);
  return (
    <div className="bg-blue-300 mt-[7vh] h-[80vh]">
      <p className="absolute text-white text-5xl font-bold w-[470px] right-0 m-10 z-10">
        {type === "Teaware"
          ? "Brewing Happiness, One Cup at a Time"
          : "Sip the Elegance, Taste the Tradition"}
      </p>
      <img
        className="h-full w-full object-cover scale-[101%]"
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
