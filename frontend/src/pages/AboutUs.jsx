import React from "react";
import Hero1 from "../components/Hero";
import AboutUsIntro from "../components/AboutUsIntro";

function AboutUs() {
  return (
    <div className="mt-[7vh] w-full h-[93vh] overflow-y-auto pr-2  box-content perspective-[10px] overflow-x-hidden ">
      <Hero1 />
      <AboutUsIntro />
    </div>
  );
}

export default AboutUs;
