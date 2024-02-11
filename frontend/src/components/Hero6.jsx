import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import Button from "./Button";
import TextPlugin from "gsap/TextPlugin";
import VanillaTilt from "vanilla-tilt";
const teaWareCards = [
  {
    productId: 23,
    img: "/assets/cards/p23_3.jpg",
    name: "Ceramic Tea set",
    price: "5999",
  },
  {
    productId: 12,
    img: "/assets/cards/p12_3.jpg",
    name: "Glass Teapot, Stainless Steel Infuser",
    price: "6999",
  },
  {
    productId: 18,
    img: "/assets/cards/p18_1.jpg",
    name: "Kiln Altered Glaze Porcelain Tea Set",
    price: "6999",
  },
  {
    productId: 19,
    img: "/assets/cards/p19_1.jpg",
    name: "Portable Gongfu Tea Set",
    price: "7999",
  },
];

const teaCards = [
  {
    productId: 42,
    img: "/assets/cards/p42_1.jpg",
    name: "berry creme compote",
    price: "600",
  },
  {
    productId: 52,
    img: "/assets/cards/p52_1.jpg",
    name: "matcha",
    price: "400",
  },

  {
    productId: 40,
    img: "/assets/cards/p40_1.jpg",
    name: "blood orange",
    price: "400",
  },
  {
    productId: 37,
    img: "/assets/cards/p37_1.jpg",
    name: "mindful mint chai",
    price: "500",
  },
];

function Hero6() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 25,
      speed: 400,
    });
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    let ctx = gsap.context(() => {
      gsap.from(comp.current, {
        scrollTrigger: {
          trigger: comp.current,
          start: "0% 7%",
          end: "250% 100%",
          //markers: true,
          pin: true,
        },
      });

      gsap.to(".flip", {
        duration: 1,
        rotationY: -180,

        scrollTrigger: {
          trigger: ".flip",
          start: "200% 50%",
          end: "400% 50%",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      // Animation for "Teaware Collections"
      gsap.to("#typeWritter", {
        duration: 1,
        text: "Teaware Collections",
        stagger: 0.1,
        scrollTrigger: {
          trigger: comp.current,
          start: "0% 7%",
          end: "105% 50%",
          toggleActions: "play reset play reset",
          //markers: true,
        },
      });
      gsap.to("#typeWritter", {
        duration: 1,
        text: "Tea Collections",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".flip",
          start: "230% 50%",
          end: "400% 50%",
          toggleActions: "play reset play reset",
          // markers: true,
        },
      });

      gsap.from(".move", {
        duration: 0.5,
        opacity: 0,
        x: -30,
        stagger: 0.1,
        scrollTrigger: {
          trigger: comp.current,
          start: "0% 7%",
          end: "250% 100%",
          toggleActions: "play reverse play reverse",

          //markers: true,
        },
      });
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={comp} className=" h-[93vh] w-full z-10 text-white">
      <div
        id="typeWritter"
        className="text-2xl md:text-4xl font-semibold text-center py-[3vh] "
      ></div>
      <div className="text-xl text-center move">Featured Products</div>

      {/* Cards */}
      <div className="overflow-x-auto pt-[5vh] h-[60vh]">
        <div className="flex gap-5 lg:gap-20 mx-5 flex-shrink-0 lg:justify-center ">
          {teaWareCards.map((card, index) => (
            <div
              key={card.productId}
              className="relative w-[35vh] h-[40vh] flex-shrink-0 perspective-800"
            >
              <div className="flip absolute w-full h-full transform-style-3d transition duration-500 ease-linear">
                {/* front  */}
                <div className=" absolute w-full h-full backface-hidden ">
                  <div className="relative w-full h-full  tilt cursor-pointer transform-style-3d move">
                    <div className=" absolute top-0 left-0 w-full h-full ">
                      <img
                        className="h-full object-cover rounded-lg translate-z-5"
                        src={card.img}
                        alt="img"
                      />
                    </div>
                    <div className="contentBx p-2">
                      <div className="mx-4 font-semibold text-lg leading-5">
                        {card.name}
                      </div>
                      <div className="mx-4 mt-2 text-sm">₹ {card.price}</div>
                    </div>
                  </div>
                </div>
                {/* back  */}
                <div className=" absolute w-full h-full transform rotate-y-180 backface-hidden ">
                  <div className="relative w-full h-full  tilt cursor-pointer transform-style-3d move">
                    <div className=" absolute top-0 left-0 w-full h-full ">
                      <img
                        className="h-full object-cover rounded-lg translate-z-5"
                        src={teaCards[index].img}
                        alt="img"
                      />
                    </div>
                    <div className="contentBx p-2">
                      <div className="mx-4 font-semibold text-lg leading-5">
                        {teaCards[index].name}
                      </div>
                      <div className="mx-4 mt-2 text-sm">
                        ₹ {teaCards[index].price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-[100vw]  text-center move">
        <Button text="View All" />
      </div>
      <div className=" text-sm font-normal w-full text-center mt-[5vh] scrollDown move">
        Scroll Down ￬
      </div>
    </div>
  );
}

export default Hero6;
