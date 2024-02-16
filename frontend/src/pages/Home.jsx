import React, { useContext, useEffect, useState } from "react";
import ScrollProgressBar from "../components/HomeComp/ScrollProgressBar";

import Hero1 from "../components/HomeComp/Hero1";
import Hero2 from "../components/HomeComp/Hero2";
import Hero3 from "../components/HomeComp/Hero3";
import Hero4 from "../components/HomeComp/Hero4";
import Hero5 from "../components/HomeComp/Hero5";
import Hero6 from "../components/HomeComp/Hero6";
import ThreeJsCanvas from "../components/HomeComp/ThreeJsCanvas";

import { ShopContext } from "../Context/ShopContext";
function Home() {
  const { fetchTotalCartSum } = useContext(ShopContext); // Access totalCartSum and authToken from the context
  const [hero1Loaded, setHero1Loaded] = useState(false);
  const handleHero1Load = () => {
    setHero1Loaded(true);
    console.log("Mounted");
  };
  useEffect(() => {
    fetchTotalCartSum();
  }, []);
  return (
    <>
      {!hero1Loaded && (
        <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center text-white font-bold text-lg font-sans">
          Loading...
        </div>
      )}
      <div className=" mt-[7vh] overflow-hidden">
        <>
          <ScrollProgressBar />
          <ThreeJsCanvas />
          <Hero1 onHero1Load={handleHero1Load} />
          <Hero2 />
          <Hero3 />
          <Hero4 />
          <Hero5 />
          <Hero6 />
        </>
      </div>
    </>
  );
}

export default Home;
