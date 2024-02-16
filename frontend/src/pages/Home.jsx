import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    fetchTotalCartSum();
  }, []);
  return (
    <div className=" mt-[7vh] overflow-hidden">
      <ScrollProgressBar />
      <ThreeJsCanvas />
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
      <Hero5 />
      <Hero6 />
    </div>
  );
}

export default Home;
