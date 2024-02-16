import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

const ThreeJsCanvas = () => {
  const containerRef = useRef();
  let model;

  const canvasStyle = {
    position: "absolute",
    top: "0",
    background: "transparent",
  };

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const canvasElement = renderer.domElement;

    Object.assign(canvasElement.style, canvasStyle);

    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    loader.load(
      "./modals/teapot/teapot.glb",
      function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(2.9, 2.9, 2.9);
        model.position.set(0, 0.2, 0);

        gsap.from(model.position, {
          y: -4,
          duration: 1,
          startAt: { x: 0, y: 0.2, z: 0 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
            // markers: true,
          },
        });
        gsap.from(model.rotation, {
          duration: 1,
          startAt: { x: 0, y: 0, z: 0 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
            // markers: true,
          },
        });

        gsap.to(model.rotation, {
          duration: 1,
          y: -Math.PI / 4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "250% 50%",
            end: "300% 50%",
            //markers: true,
            scrub: true,
          },
        });
        gsap.to(model.position, {
          duration: 1,
          x: 2,
          startAt: { x: model.position.x },

          scrollTrigger: {
            trigger: containerRef.current,
            start: "250% 50%",
            end: "300% 50%",
            // markers: true,
            scrub: true,
          },
        });

        gsap.to(model.rotation, {
          duration: 1,
          y: Math.PI / 4,
          x: Math.PI / 4,
          startAt: { y: -Math.PI / 4 },

          scrollTrigger: {
            trigger: containerRef.current,
            start: "400% 50%",
            end: "450% 50%",
            //markers: true,
            scrub: true,
          },
        });
        gsap.to(model.position, {
          duration: 1,
          x: -2,
          y: -0.7,
          startAt: { x: 2, y: 0 },

          scrollTrigger: {
            trigger: containerRef.current,
            start: "400% 50%",
            end: "470% 50%",
            //markers: true,
            scrub: true,
          },
        });
        gsap.to(model.position, {
          duration: 1,
          z: -10,
          y: -20,
          x: -30,
          startAt: { x: -2, y: -0.7 },

          scrollTrigger: {
            trigger: containerRef.current,
            start: "620% 50%",
            end: "700% 50%",
            // markers: true,
            scrub: true,
          },
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    camera.position.z = 5;

    const loader1 = new RGBELoader();
    loader1.load("/assets/farm_sunset_1k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="threeJsContainer"
      ref={containerRef}
      style={{
        visibility: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
      </Canvas>
    </div>
  );
};

export default ThreeJsCanvas;
