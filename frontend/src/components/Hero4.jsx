import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import Button from "./Button";

function Hero4() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

    let ctx = gsap.context(() => {
      gsap.from(".para", {
        opacity: 0,
        y: "+=30",
        stagger: 0.1,
        //scale: 0.8,
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
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Trusted by 100k+ Customers
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Whole leaf Teas
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Certified Plastic neutral
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          100% natural ingredients
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Shipping worldwide
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          30K+ Verified Reviews{" "}
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
        </div>
        <div className="marquee__item">
          Small Batch Blends
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Trusted by 100k+ Customers
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Whole leaf Teas
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Certified Plastic neutral
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          100% natural ingredients
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          Shipping worldwide
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
          30K+ Verified Reviews{" "}
          <span className="marquee__seperator">
            <MdOutlineEmojiFoodBeverage />
          </span>
        </div>
      </div>
      <div className="absolute right-0 w-1/2 pl-[10vh]  pt-[20vh] para">
        <p className=" text-2xl pr-[10vw]  pb-10">
          Our curated teaware collection blends elegance with functionality,
          making each sip a delightful experience. Each product is a story
          waiting to be told, and your journey begins with a single click.
        </p>
        <div className="flex gap-5 pb-10">
          <div>
            <div className="text-4xl text-left para">150+</div>
            <div className="text-xl">Unique Designs</div>
          </div>
          <div className="para border-l-[1px]"></div>
          <div>
            <div className="text-4xl text-left para">1 Cr+</div>
            <div className="text-xl">Cups of Tea Brewed</div>
          </div>
        </div>
        <div className="para">
          <Button text="View Our Gallery" />
        </div>
      </div>
    </div>
  );
}

export default Hero4;
