import React from "react";

function Hero() {
  return (
    <>
      {/* hero left*/}
      <div className="hidden lg:absolute lg:h-full lg:w-[24.5%] lg:flex lg:flex-col lg:overflow-hidden lg:bg-[#ffffff]">
        <div className="scroll-content1">
          <img src="/assets/gallery/gallery1.jpeg" />
          <img src="/assets/gallery/gallery2.jpeg" />
          <img src="/assets/gallery/gallery3.jpeg" />
          <img src="/assets/gallery/gallery4.jpeg" />
          <img src="/assets/gallery/gallery5.jpeg" />
          <img src="/assets/gallery/gallery6.jpeg" />
          <img src="/assets/gallery/gallery7.jpeg" />
        </div>
      </div>

      {/* hero right*/}
      <div className="hidden lg:absolute lg:h-full lg:w-[24.2%] lg:flex lg:flex-col lg:right-2 lg:overflow-hidden lg:bg-[#ffffff]">
        <div className="scroll-content2">
          <img src="/assets/gallery/gallery8.jpeg" />
          <img src="/assets/gallery/gallery9.jpeg" />
          <img src="/assets/gallery/gallery10.jpeg" />
          <img src="/assets/gallery/gallery11.jpeg" />
          <img src="/assets/gallery/gallery12.jpeg" />
          <img src="/assets/gallery/gallery13.jpeg" />
          <img src="/assets/gallery/gallery14.jpeg" />
        </div>
      </div>

      {/* hero center*/}
      <div className="w-full  relative flex justify-center items-center h-full transform-style-3d -z-10">
        <img
          className="absolute h-full w-full object-cover -z-10 transform  translate-z-[-45px]  scale-[5.5]"
          src="../../assets/parallax/parallax0.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-40px] scale-[5]"
          src="../../assets/parallax/parallax1.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10  transform translate-z-[-35px] scale-[4.5]"
          src="../../assets/parallax/parallax2.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-30px] scale-[4]"
          src="../../assets/parallax/parallax3.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-25px] scale-[3.5]"
          src="../../assets/parallax/parallax4.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-20px] scale-[3]"
          src="../../assets/parallax/parallax5.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-15px] scale-[2.5]"
          src="../../assets/parallax/parallax6.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-10px] scale-[2]"
          src="../../assets/parallax/parallax7.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[-5px] scale-[1.5]"
          src="../../assets/parallax/parallax8.png"
          alt=""
        />
        <img
          className="absolute h-full w-full object-cover -z-10 transform translate-z-[0px] scale-[1]"
          src="../../assets/parallax/parallax9.png"
          alt=""
        />
        <div className=" flex flex-col justify-center items-center gap-1 md:gap-2  pb-60 text-[#1A3838]">
          <div className=" text-2xl md:text-3xl italic font-bold">
            Savor Serenity in Every Sip
          </div>
          <div className="text-lg md:text-xl italic font-bold md:font-semibold">
            Unwind and Infuse Life with Every Steep
          </div>
          <button className="text-xl italic font-semibold border-[1px]  rounded border-[#1A3838] hover:text-white hover:bg-[#1A3838] px-4 py-1">
            Explore Our Collection
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
