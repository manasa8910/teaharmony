import React, { useEffect, useState } from "react";

function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState("0%");

  const updateProgressBar = () => {
    const { scrollTop, scrollHeight } = document.documentElement;
    const newScrollPercent =
      (scrollTop / (scrollHeight - window.innerHeight)) * 100 + "%";
    setScrollPercent(newScrollPercent);
  };
  useEffect(() => {
    document.addEventListener("scroll", updateProgressBar);

    return () => {
      // Cleanup: Remove the scroll event listener when the component is unmounted
      document.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <div
      style={{ "--progress": scrollPercent, width: "var(--progress)" }}
      id="progress-bar"
      className="bg-gray-600  h-[1px] fixed z-50 top-[7vh] left-0"
    ></div>
  );
}

export default ScrollProgressBar;
