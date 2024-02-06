import gsap from "gsap";
import React, { useEffect, useRef } from "react";

function Button(props) {
  const glowBtn = useRef(null);
  useEffect(() => {
    const gradientEl = document.createElement("div");
    gradientEl.classList.add("gradient");
    glowBtn.current.appendChild(gradientEl);
  });

  function glow(e) {
    const rect = glowBtn.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowBtn.current, {
      "--pointer-x": `${x}px`,
      "--pointer-y": `${y}px`,
    });

    gsap.to(glowBtn.current, {
      "--button-glow": chroma
        .mix(
          getComputedStyle(glowBtn.current)
            .getPropertyValue("--button-glow-start")
            .trim(),
          getComputedStyle(glowBtn.current)
            .getPropertyValue("--button-glow-end")
            .trim(),
          x / rect.width
        )
        .hex(),
    });
  }
  return (
    <button
      ref={glowBtn}
      onPointerMove={glow}
      className="glow-button hover:scale-105 transform ease-linear duration-200"
    >
      <span className="px-10 py-[10px]">{props.text}</span>
    </button>
  );
}

export default Button;
