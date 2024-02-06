import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function Hero1() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".title", {
        opacity: 0,
        y: -30,
        duration: 1,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          duration: 1,
          trigger: comp.current,
          start: "47% 50%",
          end: "100% 50%",
          scrub: 0.2,
          pin: true,
          // markers: true,
        },
      });
      tl.to(
        "#top",
        {
          top: "-50%",
        },
        "a"
      ).to(
        "#bottom",
        {
          bottom: "-50%",
        },
        "a"
      );
    });
    gsap.to(".scrollDown", {
      y: 15,
      repeat: -1,
      duration: 0.3,
      yoyo: true,
    });

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={comp} className="h-[94vh]  text-white w-full  overflow-hidden">
        <div
          id="top"
          className="w-full h-[47vh] absolute top-0 z-10 overflow-hidden"
        >
          <div
            className="absolute top-[50%] left-1/2 font-black transform translate-x-[-50%] translate-y-[-50%] mt-[25.5vh] font-sans "
            style={{
              fontSize: "clamp(40px, 9vw + 1rem, 300px)",
              whiteSpace: "nowrap",
            }}
          >
            <div className=" absolute stroke title"> TEA HARMONY</div>
            <div className=" wave-animate title"> TEA HARMONY</div>
          </div>
        </div>
        <div id="center" className=" w-full bg-none relative ">
          <div className="h-[0vh] w-full "></div>
        </div>
        <div
          id="bottom"
          className="h-[47vh] w-full absolute bottom-0 overflow-hidden"
        >
          <div
            className="absolute  top-1/2 left-1/2  font-black transform translate-x-[-50%] translate-y-[-50%] mt-[-21.5vh] font-sans "
            style={{
              fontSize: "clamp(40px, 9vw + 1rem, 300px)",
              whiteSpace: "nowrap",
            }}
          >
            <div className=" absolute stroke title"> TEA HARMONY</div>
            <div className=" wave-animate title"> TEA HARMONY</div>
            <div className="text-sm font-normal w-full text-center absolute mt-[20vh] scrollDown">
              Scroll Down ￬
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero1;
