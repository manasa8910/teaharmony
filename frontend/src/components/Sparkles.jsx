import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Sparkles = ({ size = 0.02, color = 0xffffff, scale = [1, 1, 1] }) => {
  const containerRef = useRef();
  const rendererRef = useRef(); // Reference to the renderer

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Save the reference

    const sparkles = createSparkles(size, color);

    // Adjust scale
    sparkles.scale.set(scale[0], scale[1], scale[2]);

    scene.add(sparkles);

    // Set up camera position
    camera.position.z = 5;

    // Set up animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update sparkles animation
      updateSparkles(sparkles);

      renderer.render(scene, camera);
    };

    animate();

    // Handle cleanup on component unmount
    return () => {
      if (rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose(); // Dispose of the renderer
      }
    };
  }, [size, color, scale]);

  // Function to create sparkles
  const createSparkles = (size, color) => {
    const sparklesGeometry = new THREE.BufferGeometry();
    const sparklesMaterial = new THREE.PointsMaterial({
      color: color,
      size: size,
    });

    const sparklesVertices = [];

    for (let i = 0; i < 500; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      sparklesVertices.push(x, y, z);
    }

    sparklesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(sparklesVertices, 3)
    );

    return new THREE.Points(sparklesGeometry, sparklesMaterial);
  };

  // Function to update sparkles animation
  const updateSparkles = (sparkles) => {
    const positions = sparkles.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.random() * 0.005;
      positions[i + 1] += Math.random() * 0.005;
      positions[i + 2] += Math.random() * 0.005;

      if (positions[i] > 5) positions[i] = -5;
      if (positions[i + 1] > 5) positions[i + 1] = -5;
      if (positions[i + 2] > 5) positions[i + 2] = -5;
    }

    sparkles.geometry.attributes.position.needsUpdate = true;
  };

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
        overflow: "hidden",
      }}
    />
  );
};

export default Sparkles;
