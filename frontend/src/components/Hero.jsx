import React from "react";

function Hero() {
  return (
    <>
      {/* hero left*/}
      <div className="hidden lg:absolute lg:h-full lg:w-[24.5%] lg:flex lg:flex-col lg:overflow-hidden lg:bg-[#ffffff]">
        <div className="scroll-content1">
          <img
            className="w-full object-cover "
            src="../../assets/navImages/OIG.jpeg"
            alt=""
          />
          <img src="../../assets/navImages/OIG (2).jpeg" alt="" />
          <img src="../../assets/navImages/OIG (3).jpeg" alt="" />
          <img
            className="w-full object-cover  mb-[10px]"
            src="../../assets/navImages/OIG (4).jpeg"
            alt=""
          />
          <img
            className="w-full object-cover "
            src="../../assets/navImages/OIG.jpeg"
            alt=""
          />
          <img src="../../assets/navImages/OIG (2).jpeg" alt="" />
          <img src="../../assets/navImages/OIG (3).jpeg" alt="" />
          <img
            className="w-full object-cover  mb-[10px]"
            src="../../assets/navImages/OIG (4).jpeg"
            alt=""
          />
        </div>
      </div>

      {/* hero right*/}
      <div className="hidden lg:absolute lg:h-full lg:w-[24.2%] lg:flex lg:flex-col lg:right-2 lg:overflow-hidden lg:bg-[#ffffff]">
        <div className="scroll-content2">
          <img
            className="w-full object-cover "
            src="../../assets/navImages/OIG.jpeg"
            alt=""
          />
          <img src="../../assets/navImages/OIG (2).jpeg" alt="" />
          <img src="../../assets/navImages/OIG (3).jpeg" alt="" />
          <img
            className="w-full object-cover  mb-[10px]"
            src="../../assets/navImages/OIG (4).jpeg"
            alt=""
          />
          <img
            className="w-full object-cover "
            src="../../assets/navImages/OIG.jpeg"
            alt=""
          />
          <img src="../../assets/navImages/OIG (2).jpeg" alt="" />
          <img src="../../assets/navImages/OIG (3).jpeg" alt="" />
          <img
            className="w-full object-cover  mb-[10px]"
            src="../../assets/navImages/OIG (4).jpeg"
            alt=""
          />
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
        <div className=" flex flex-col justify-center items-center gap-2  pb-60 text-[#1A3838]">
          <div className="text-3xl italic font-bold">
            Discover the Art of Tea Elegance
          </div>
          <div className="text-xl italic font-semibold">
            Indulge in a Symphony of Flavors and Aromas
          </div>
          <button className="text-xl italic font-semibold border-[1px]  rounded border-black px-4 py-1">
            Explore Our Collection
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
