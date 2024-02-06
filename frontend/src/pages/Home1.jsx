import React, { useContext, useEffect } from "react";

import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import ThreeJsCanvas from "../components/ThreeJsCanvas";
import Hero3 from "../components/Hero3";
import Hero4 from "../components/Hero4";
import Hero5 from "../components/Hero5";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { ShopContext } from "../Context/ShopContext";
function Home1() {
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
    </div>
  );
}

export default Home1;
