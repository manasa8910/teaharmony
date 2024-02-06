import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import Button from "./Button";

import TextPlugin from "gsap/TextPlugin";

const teaWareCategories = [
  "Ceramic",
  "Porcelain",
  "Steel",
  "Cast-Iron",
  "Glass",
  "Clay",
  "Chinese",
  "Japanese",
];

const teaCategories = [
  "Black",
  "Flavoured",
  "Fruit",
  "Oolong",
  "White",
  "Green",
  "Flower",
  "English",
];

const teaWareCards = [
  {
    productId: 23,
    img: "./assets/cards/p23_3.jpg",
    name: "Ceramic Tea set",
    price: "5999",
  },
  {
    productId: 12,
    img: "./assets/cards/p12_3.jpg",
    name: "Glass Teapot, Stainless Steel Infuser",
    price: "6999",
  },
  {
    productId: 18,
    img: "./assets/cards/p18_1.jpg",
    name: "Kiln Altered Glaze Porcelain Tea Set",
    price: "6999",
  },
  {
    productId: 19,
    img: "./assets/cards/p19_1.jpg",
    name: "Portable Gongfu Tea Set",
    price: "7999",
  },
];

const teaCards = [
  {
    productId: 42,
    img: "./assets/cards/p42_1.jpg",
    name: "berry creme compote",
    price: "600",
  },
  {
    productId: 52,
    img: "./assets/cards/p52_1.jpg",
    name: "matcha",
    price: "400",
  },

  {
    productId: 40,
    img: "./assets/cards/p40_1.jpg",
    name: "blood orange",
    price: "400",
  },
  {
    productId: 37,
    img: "./assets/cards/p37_1.jpg",
    name: "mindful mint chai",
    price: "500",
  },
];

function Hero5() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    teaWareCategories.forEach((category) => {
      const element = document.getElementById(`${category}`);
      if (element) {
        new CircleType(element).radius(60);
      }
    });
    teaCategories.forEach((category) => {
      const element = document.getElementById(`${category}`);
      if (element) {
        new CircleType(element).radius(60);
      }
    });

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 25,
      speed: 400,
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    let ctx = gsap.context(() => {
      gsap.to("#clipPath", {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: 1,
        scrollTrigger: {
          trigger: comp.current,
          start: "0% 7%",
          end: "200% 100%",
          scrub: 0.8,
          //markers: true,
          pin: true,
        },
      });
      gsap.to(".scrollDown", {
        y: 10,
        repeat: -1,
        duration: 0.3,
        yoyo: true,
      });

      gsap.from(".circle", {
        duration: 0.5,
        opacity: 0,
        x: -30,
        // stagger: 0.2,
        scrollTrigger: {
          trigger: "#clipPath",
          start: "0% 50%",
          end: "200% 100%",
          toggleActions: "play reverse play reverse",

          //markers: true,
        },
      });
      gsap.from(".move", {
        duration: 0.5,
        opacity: 0,
        x: -30,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#clipPath",
          start: "0% 50%",
          end: "200% 100%",
          toggleActions: "play reverse play reverse",

          // markers: true,
        },
      });

      gsap.to("#typeWritter", {
        duration: 1,
        text: "Teaware Collections",
        stagger: 1,
        scrollTrigger: {
          trigger: "#clipPath",
          start: "0% 50%",
          end: "200% 100%",
          toggleActions: "play reverse play reverse",

          // markers: true,
        },
      });
    }, comp);

    const circles = document.querySelectorAll(".circle");

    circles.forEach((circle) => {
      const onMouseEnter = () => {
        gsap.to(circle, { scale: 1.1, duration: 0.3 });
      };

      const onMouseLeave = () => {
        gsap.to(circle, { scale: 1, duration: 0.3 });
      };

      circle.addEventListener("mouseenter", onMouseEnter);
      circle.addEventListener("mouseleave", onMouseLeave);
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="w-full h-[186vh]">
      <div ref={comp} className="text-white absolute w-full h-[93vh]">
        {/* Teaware collections */}
        <div id="clipPath" className=" absolute bg-black w-full h-full z-[2]">
          <div className="w-full h-full">
            <div
              id="typeWritter"
              className="text-4xl font-semibold text-center pb-[2vh] pt-[1vh]"
            ></div>
            <div className="text-xl pb-[1vh] text-center move">
              Shop By Category
            </div>

            {/* circles */}
            <div className="flex gap-10 flex-wrap  justify-center items-center  pb-[2vh]">
              {teaWareCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#202020] h-[24vh] w-[17vh] rounded-t-[17vh] rounded-b-[5vh] text-center flex flex-col justify-between cursor-pointer
                   duration-200 circle"
                >
                  <div className="pt-1 font-semibold" id={`${category}`}>
                    {category}
                  </div>
                  <img
                    className=" object-cover"
                    src={`./assets/category/TeaWare_${category}.png`}
                    alt="category"
                  />
                </div>
              ))}
            </div>

            <div className="text-xl pb-[2vh] text-center move">
              Featured Products
            </div>

            {/* Cards */}
            <div className="flex gap-20 justify-center flex-wrap">
              {teaWareCards.map((card) => (
                <div
                  key={card.productId}
                  className="relative w-[35vh] h-[40vh] rgb tilt cursor-pointer transform-style-3d move"
                >
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
              ))}
            </div>
            <div className="text-sm font-normal w-full text-center  scrollDown mt-[5vh]">
              Scroll Down ￬
            </div>
            <div className="w-[100vw] text-right mt-[-5vh] pr-[10vw]">
              <Button text="View All" />
            </div>
          </div>
        </div>

        {/* Tea collections */}
        <div
          style={{ backgroundImage: "linear-gradient(black, #303030,black)" }}
          className=" absolute w-full h-full z-[1]"
        >
          <div className="w-full h-full">
            <div className="text-4xl font-semibold text-center pt-[1vh] pb-[2vh]">
              Tea Collections
            </div>
            <div className="text-xl pb-[1vh] text-center">Shop By Category</div>

            {/* circles */}
            <div className="flex gap-10 flex-wrap  justify-center items-center pb-[2vh] cursor-pointer">
              {teaCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white h-[24vh] w-[17vh] rounded-t-[17vh] rounded-b-[5vh] text-center text-black flex flex-col justify-between hover:scale-110 hover:brightness-100 duration-200 overflow-hidden brightness-[90%]"
                >
                  <div className="pt-1 z-10 font-bold" id={`${category}`}>
                    {category}
                  </div>
                  <img
                    className="h-full object-cover scale-[1.4]"
                    src={`./assets/category/Tea_${category}.jpg`}
                    alt="category"
                  />
                </div>
              ))}
            </div>

            <div className="text-xl pb-[2vh] text-center">
              Featured Products
            </div>

            {/* Cards */}
            <div className="flex gap-20 justify-center flex-wrap">
              {teaCards.map((card) => (
                <div
                  key={card.productId}
                  className="relative w-[35vh] h-[40vh]  tilt cursor-pointer transform-style-3d"
                >
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
              ))}
            </div>

            <div className="w-[100vw] text-right mt-[2.5vh] pr-[10vw]">
              <Button text="View All" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero5;
