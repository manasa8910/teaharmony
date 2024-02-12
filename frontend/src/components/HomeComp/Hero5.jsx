import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import Button from "../Button";
import TextPlugin from "gsap/TextPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

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
        scrollTrigger: {
          trigger: "#clipPath",
          start: "0% 50%",
          end: "200% 100%",
          toggleActions: "play none none reverse",

          //markers: true,
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

    const onMouseEnter = (circle) => {
      gsap.to(circle, { scale: 1.2, duration: 0.3 });
    };

    const onMouseLeave = (circle) => {
      gsap.to(circle, { scale: 1, duration: 0.3 });
    };

    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle) => {
      circle.addEventListener("mouseenter", () => onMouseEnter(circle));
      circle.addEventListener("mouseleave", () => onMouseLeave(circle));
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
              className="text-2xl md:text-4xl font-semibold text-center md:pb-[2vh] pt-[1vh] md:pt-[3vh]"
            ></div>
            <div className="md:text-xl pb-[1vh] md:pb-[3vh] text-center circle">
              Shop By Category
            </div>

            {/* circles */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2  md:grid-cols-4 gap-3 md:gap-12 md:gap-x-20 gap-x-10 md:justify-center items-center pb-[2vh]">
                {teaWareCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-[#202020] h-[18vh] w-[16vh]
                     rounded-t-[16vh]
                    rounded-b-[3vh]
                    md:h-[24vh] md:w-[17vh] 
                    md:rounded-t-[17vh] md:rounded-b-[5vh] text-center flex flex-col justify-between overflow-hidden items-center cursor-pointer
                    duration-200 circle"
                  >
                    <div
                      className="pt-1 font-semibold text-sm md:text-base"
                      id={`${category}`}
                    >
                      {category}
                    </div>
                    <img
                      className="object-cover mt-[-20%] w-[90%] md:w-full md:mt-[0%]"
                      src={`./assets/category/TeaWare_${category}.png`}
                      alt="category"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-[100vw] text-center mt-[3vh]">
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
            <div className="text-2xl md:text-4xl font-semibold text-center md:pb-[2vh] pt-[1vh] md:pt-[3vh]">
              Tea Collections
            </div>
            <div className="md:text-xl pb-[1vh] text-center md:pb-[3vh]">
              Shop By Category
            </div>

            {/* circles */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2  md:grid-cols-4 gap-3 md:gap-12 md:gap-x-20 gap-x-10 md:justify-center items-center pb-[2vh]">
                {teaCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white h-[18vh] w-[16vh]
                  rounded-t-[16vh]
                 rounded-b-[3vh]
                 md:h-[24vh] md:w-[17vh] 
                 md:rounded-t-[17vh] md:rounded-b-[5vh]  text-center text-black flex flex-col justify-between items-center hover:scale-125 hover:brightness-100 duration-300 overflow-hidden brightness-[90%]"
                  >
                    <div
                      className="pt-1 font-bold text-sm md:text-base z-10 "
                      id={`${category}`}
                    >
                      {category}
                    </div>
                    <img
                      className="h-full object-cover  w-[90%] md:w-full md:mt-[0%] scale-[1.4]"
                      src={`./assets/category/Tea_${category}.jpg`}
                      alt="category"
                    />
                  </div>
                ))}
              </div>{" "}
            </div>

            <div className="hidden md:block w-[100vw] text-center mt-[3vh]">
              <Button text="View All" />
            </div>
          </div>
        </div>

        <div className="hidden md:block text-sm font-normal absolute bottom-[5vh] w-full text-center mt-[7vh] scrollDown z-20">
          Scroll Down ￬
        </div>
      </div>
    </div>
  );
}

export default Hero5;
