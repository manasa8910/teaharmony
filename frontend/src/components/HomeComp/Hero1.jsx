import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function Hero1() {
  const comp = useRef(null);
  const [allowScroll, setAllowScroll] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".title1 span ", {
        opacity: 0,
        x: "-=30",
        stagger: 0.3,
        duration: 2,
        delay: 1,
      });

      gsap.from(".title2 span ", {
        opacity: 0,
        x: "-=30",
        stagger: 0.3,
        duration: 2,
        delay: 1,
      });

      gsap.from(".title3 span ", {
        opacity: 0,
        x: "-=30",
        stagger: 0.3,
        duration: 2,
        delay: 1,
      });

      gsap.from(".title4 span ", {
        opacity: 0,
        x: "-=30",
        stagger: 0.3,
        duration: 2,
        delay: 1,
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

    const videos = document.querySelectorAll(".smoke");
    const videoArray = Array.from(videos);
    const handleVideoEnd = () => {
      videoArray.forEach((video) => video.remove());
      document.getElementById("top").style.backgroundColor = "black";
      document.getElementById("bottom").style.backgroundColor = "black";
      setAllowScroll(true);
    };

    videoArray.forEach((video) => {
      video.playbackRate = 1.5;
      video.addEventListener("ended", handleVideoEnd);
    });

    return () => {
      videoArray.forEach((video) => {
        video.removeEventListener("ended", handleVideoEnd);
      });
      ctx.revert();
    };

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!allowScroll) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [allowScroll]);

  return (
    <>
      <div
        ref={comp}
        className="h-[94vh] text-white w-full  overflow-hidden relative"
      >
        <video
          className="smoke top-0"
          src="/assets/videos/smoke.mp4"
          autoPlay
          muted
        ></video>
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
            <div className=" absolute stroke title1 ">
              <span>T</span>
              <span>E</span>
              <span>A</span>
              <span> </span>
              <span>H</span>
              <span>A</span>
              <span>R</span>
              <span>M</span>
              <span>O</span>
              <span>N</span>
              <span>Y</span>
            </div>
            <div className=" wave-animate title2">
              <span>T</span>
              <span>E</span>
              <span>A</span>
              <span> </span>
              <span>H</span>
              <span>A</span>
              <span>R</span>
              <span>M</span>
              <span>O</span>
              <span>N</span>
              <span>Y</span>
            </div>
          </div>
        </div>

        <div id="center" className=" w-full bg-none relative">
          <div className="h-[0vh] w-full "></div>
        </div>

        <div
          id="bottom"
          className="h-[47vh] w-full absolute bottom-0 overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2  font-black transform translate-x-[-50%] translate-y-[-50%] mt-[-21.5vh] font-sans "
            style={{
              fontSize: "clamp(40px, 9vw + 1rem, 300px)",
              whiteSpace: "nowrap",
            }}
          >
            <div className=" absolute stroke title3">
              <span>T</span>
              <span>E</span>
              <span>A</span>
              <span> </span>
              <span>H</span>
              <span>A</span>
              <span>R</span>
              <span>M</span>
              <span>O</span>
              <span>N</span>
              <span>Y</span>
            </div>
            <div className=" wave-animate title4">
              <span>T</span>
              <span>E</span>
              <span>A</span>
              <span> </span>
              <span>H</span>
              <span>A</span>
              <span>R</span>
              <span>M</span>
              <span>O</span>
              <span>N</span>
              <span>Y</span>
            </div>
          </div>
          <div className="text-sm font-normal w-full text-center absolute bottom-[5vh] scrollDown">
            Scroll Down ￬
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero1;
