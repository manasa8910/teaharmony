import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

// const hdrTextureURL = new URL(".assets\farm_sunset_1k.hdr", import.meta.url);

const ThreeJsCanvas = () => {
  const containerRef = useRef();
  let model;

  const canvasStyle = {
    // Add your styles for the canvas element here
    position: "absolute",
    top: "0",
    background: "transparent",

    // Add more styles as needed
  };

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();

    const light = new THREE.SpotLight(0xffffff, Math.PI * 1000);
    light.position.set(20, 20, 20);
    // scene.add(light);

    // scene.background = new THREE.Color(0x141414);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);

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

    // Load GLB model
    const loader = new GLTFLoader();

    loader.load(
      "./modals/teapot/teapot.glb",
      function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            const m = child;
            m.receiveShadow = true;
            m.castShadow = true;

            // m.material.specular = new THREE.Color(0xffffff); // Set the specular color to white
          }
          if (child.isLight) {
            const l = child;
            l.castShadow = true;
            l.shadow.bias = -0.003;
            l.shadow.mapSize.width = 2048;
            l.shadow.mapSize.height = 2048;
          }
        });
        model = gltf.scene;
        scene.add(model);
        model.scale.set(2.9, 2.9, 2.9);
        model.position.set(0, 0.2, 0);

        gsap.from(model.position, {
          y: -4,
          duration: 1, // Duration for initial appearance
          startAt: { x: 0, y: 0.2, z: 0 }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom", // Trigger when the bottom of the container is reached
            end: "bottom center", // End the animation when the top of the container reaches the center of the viewport
            scrub: true,
            // markers: true,
          },
        });
        gsap.from(model.rotation, {
          duration: 1, // Duration for initial appearance
          startAt: { x: 0, y: 0, z: 0 }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom", // Trigger when the bottom of the container is reached
            end: "bottom center", // End the animation when the top of the container reaches the center of the viewport
            scrub: true,
            // markers: true,
          },
        });

        gsap.to(model.rotation, {
          duration: 1, // Duration for initial appearance
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
          duration: 1, // Duration for initial appearance
          x: 2,
          startAt: { x: model.position.x }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "250% 50%",
            end: "300% 50%",
            // markers: true,
            scrub: true,
          },
        });

        gsap.to(model.rotation, {
          duration: 1, // Duration for initial appearance
          y: Math.PI / 4,
          x: Math.PI / 4,
          startAt: { y: -Math.PI / 4 }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "400% 50%",
            end: "450% 50%",
            //markers: true,
            scrub: true,
          },
        });
        gsap.to(model.position, {
          duration: 1, // Duration for initial appearance
          x: -2,
          y: -0.7,
          startAt: { x: 2, y: 0 }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "400% 50%",
            end: "470% 50%",
            //markers: true,
            scrub: true,
          },
        });
        gsap.to(model.position, {
          duration: 1, // Duration for initial appearance
          z: -10,
          y: -20,
          x: -30,
          scale: 0.2,
          opacity: 0,
          startAt: { x: -2, y: -0.7 }, // Set the starting position to the current position

          scrollTrigger: {
            trigger: containerRef.current,
            start: "620% 50%",
            end: "650% 50%",
            // markers: true,
            scrub: 3,
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

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }
    camera.position.z = 5;

    const loader1 = new RGBELoader();
    loader1.load("./assets/farm_sunset_1k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      //scene.background = texture;
      scene.environment = texture;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      // Check if the model is loaded before applying transformations
      if (model) {
        // Rotate the model (if needed)
        // glbModelRef.current.rotation.x += 0.01;
        // glbModelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // // Handle cleanup on component unmount
    // return () => {
    //   containerRef.current.removeChild(renderer.domElement);
    // };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden", // Ensure proper handling of scrollTrigger
      }}
    >
      <Canvas
      // gl={{
      //   antialias: true,
      //   alpha: true,
      //   powerPreference: "high-performance",
      // }}
      >
        <color attach="background" args={["#000000"]} />
        <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
      </Canvas>
    </div>
  );
};

export default ThreeJsCanvas;
