import React from "react";
import Hero from "../components/Hero";
function Home() {
  return (
    <div
      id="home"
      className=" w-full h-[91.5vh] overflow-y-auto pr-2  box-content perspective-[10px] overflow-x-hidden "
    >
      <Hero />
    </div>
  );
}

export default Home;
