import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import React, { useLayoutEffect, useRef } from "react";
import SplitTextJS from "split-text-js";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function Hero3() {
  const comp = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to("#para", {
        text: "Welcome to Tea Harmony, where passion meets perfection in every sip. Immerse yourself in the world of handcrafted teas and exquisite accessories curated to elevate your tea experience. From the soothing embrace of herbal blends to the bold richness of black teas, each cup tells a story of craftsmanship and dedication.",
        stagger: 1,
        duration: 2,
        scrollTrigger: {
          trigger: comp.current,
          // markers: true,
          start: "0% 40%",
          end: "150% 40%",
          toggleActions: "play reset play reset",
          pin: true,
        },
      });

      gsap.to("#label", {
        rotation: 180, // Initial rotation value
        duration: 1,
        scrollTrigger: {
          trigger: comp.current,
          //markers: true,
          start: "0% 40%",
          end: "150% 40%",
          toggleActions: "play reverse play reverse",
        },
      });

      const titles = gsap.utils.toArray("p");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          //markers: true,
          start: "0% 40%",
          end: "150% 40%",
          toggleActions: "restart reset restart reset",
        },
      });

      titles.forEach((title) => {
        const splitTitle = new SplitTextJS(title);

        tl.from(
          splitTitle.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
          },
          "<"
        ).to(
          splitTitle.chars,
          {
            opacity: 0,

            y: -20,
            rotateX: 90,
            stagger: 0.02,
          },
          "<1"
        );
      });
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={comp} className="h-[60vh] text-gray-300 w-full lg:w-1/2 ">
      <div
        id="para"
        className="p-5 mt-[-15vh] text-xl font-semibold mx-2 lg:w-2/3 m-auto border-r-2 border-gray-500 bg-black bg-opacity-35 lg:bg-none border-b-2 rounded-2xl lg:ml-[20vh] lg:mt-0"
      ></div>
      <div
        id="label"
        className=" mt-[-50px] ml-[70vw] lg:ml-[35vw] flex items-center justify-center h-[100px] w-[100px]"
      >
        <img
          className="rounded-[50%]  w-2/3 lg:w-full"
          src="/assets/label.png"
          alt=""
        />
      </div>
      <div
        id="slider3d"
        className="lg:text-2xl font-bold w-2/3 lg:mt-5 mx-auto "
      >
        <div className="text-wrapper">
          <p className="text-center leading-[0px] m-0">UNIQUE STYLE</p>
          <p className="text-center leading-[0px]">PREMIUM QUALITY</p>
          <p className="text-center leading-[0px]">THE BEST PRICE</p>
          <p className="text-center leading-[0px]">EXTENSIVE COLLECTIONS</p>
        </div>
      </div>
    </div>
  );
}

export default Hero3;
