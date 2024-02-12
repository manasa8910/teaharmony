import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import Button from "../Button";
gsap.registerPlugin(ScrollTrigger);

function Hero4() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".para", {
        opacity: 0,
        y: "+=30",
        stagger: 0.1,
        delay: 0.3,

        scrollTrigger: {
          trigger: comp.current,
          //markers: true,
          start: "top 7%",
          end: "200% 100%",
          toggleActions: "play reverse play reverse",
          pin: true,
        },
      });
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={comp} className="h-[100vh] text-gray-300 w-full ">
      <div className="marquee text-xl para">
        <div className="marquee__item">
          Small Batch Blends
          <span className="marquee__seperator"></span>
          Trusted by 100k+ Customers
          <span className="marquee__seperator"></span>
          Whole leaf Teas
          <span className="marquee__seperator"></span>
          Certified Plastic neutral
          <span className="marquee__seperator"></span>
          100% natural ingredients
          <span className="marquee__seperator"></span>
          Shipping worldwide
          <span className="marquee__seperator"></span>
          30K+ Verified Reviews <span className="marquee__seperator"></span>
        </div>
        <div className="marquee__item">
          Small Batch Blends
          <span className="marquee__seperator"></span>
          Trusted by 100k+ Customers
          <span className="marquee__seperator"></span>
          Whole leaf Teas
          <span className="marquee__seperator"></span>
          Certified Plastic neutral
          <span className="marquee__seperator"></span>
          100% natural ingredients
          <span className="marquee__seperator"></span>
          Shipping worldwide
          <span className="marquee__seperator"></span>
          30K+ Verified Reviews <span className="marquee__seperator"></span>
        </div>
      </div>
      <div className="absolute text-justify right-0 w-full md:w-1/2 px-[3vh] md:pl-[10vh] pt-[8vh] font-semibold  md:pt-[20vh] para">
        <p className=" text-xl md:text-2xl md:pr-[10vw]  pb-10">
          Our curated teaware collection blends elegance with functionality,
          making each sip a delightful experience. Each product is a story
          waiting to be told, and your journey begins with a single click.
        </p>
        <div className="text-white flex gap-5 mb-10 bg-black bg-opacity-35 rounded-lg p-2 md:bg-none text-center md:text-left ">
          <div>
            <div className="text-4xl  para">150+</div>
            <div className="text-xl">Unique Designs</div>
          </div>
          <div className="para border-l-[1px]"></div>
          <div>
            <div className="text-4xl para">1 Cr+</div>
            <div className="text-xl">Cups of Tea Brewed</div>
          </div>
        </div>
        <div className="para text-center md:text-left">
          <a href="https://manasa8910.github.io/galleryTH/" target="_blank">
            <Button text="View Our Gallery" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero4;
