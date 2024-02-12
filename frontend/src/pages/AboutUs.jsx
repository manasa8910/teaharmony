import React, { useEffect } from "react";
import Hero1 from "../components/Hero";
import AboutUsIntro from "../components/AboutUsIntro";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, []);
  return (
    <div className="mt-[7vh] w-full h-[93vh] overflow-y-auto pr-2  box-content perspective-[10px] overflow-x-hidden scale-[1.02] md:scale-[1]">
      <Hero1 />
      <AboutUsIntro />
    </div>
  );
}

export default AboutUs;
