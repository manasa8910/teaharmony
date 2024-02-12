import React, { useLayoutEffect, useRef } from "react";
import Button from "../Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

function Hero2() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          //markers: true,
          start: "top 50%",
          end: "200% 50%",
          toggleActions: "play reset play reset",
          pin: true,
          // stagger: 0.5,
        },
      });
      tl.from(
        ".para1",
        {
          duration: 0.5,
          opacity: 0,
          x: 100,
        },
        "a"
      )
        .from(
          ".para6",

          {
            opacity: 0,
            x: -100,
          },
          "a"
        )
        .from(
          ".para2",
          {
            opacity: 0,

            y: -20,
          },
          "b"
        )
        .from(".para5", {
          opacity: 0,

          y: 20,
        })
        .from(
          ".para4",
          {
            opacity: 0,

            x: -20,
          },
          "c"
        )
        .from(
          ".para3",
          {
            opacity: 0,

            x: 20,
          },
          "c"
        )
        .from(
          ".para7",
          {
            opacity: 0,
            y: 30,
          },
          "a"
        )
        .from(
          ".para8",
          {
            opacity: 0,
            x: 20,
          },
          "b"
        );
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={comp}
      className="h-[50vh] text-gray-300  w-full text-center py-36"
    >
      <div className="font-bold text-3xl lg:text-5xl lg:pb-5">
        <div className="para1 inline-block">Discover&nbsp;</div>
        <div className="para2 inline-block">the&nbsp;</div>
        <div className="para3 inline-block">Art</div>
      </div>
      <div className="font-bold text-3xl lg:text-5xl pb-5">
        <div className="para4 inline-block">of&nbsp;</div>
        <div className="para5 inline-block">Tea&nbsp;</div>
        <div className="para6 inline-block">Elegance</div>
      </div>
      <p className="font-semibold  lg:text-2xl para7 pb-5">
        Indulge in a Symphony of Flavors and Aromas
      </p>
      <div className="para8">
        <NavLink to="/tea">
          <Button text="Explore Our Collection" />
        </NavLink>
      </div>
    </div>
  );
}

export default Hero2;
