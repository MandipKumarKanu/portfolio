import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./randomshape.css";

const RandomShape = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Colors from src/index.css
    const colors = [
      new THREE.Color("rgb(214, 34, 59)"), // --secondary-color (Red)
      new THREE.Color("#FFFFFF"), // White
      new THREE.Color("#F0F0F0"), // Light Grey
      new THREE.Color("#CCCCCC"), // Grey
    ];

    // Shapes
    const shapes = [];
    const geometryTypes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16),
      new THREE.ConeGeometry(0.6, 1.2, 32),
      new THREE.DodecahedronGeometry(0.7),
    ];

    const numShapes = 15;
    for (let i = 0; i < numShapes; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)].clone();
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.5,
        metalness: 0.1,
      });
      const shape = new THREE.Mesh(geometry, material);

      // Random positions within a larger area to allow for movement
      shape.position.x = (Math.random() - 0.5) * 15;
      shape.position.y = (Math.random() - 0.5) * 10;
      shape.position.z = (Math.random() - 0.5) * 5 - 5; // Position them slightly in front

      // Random initial rotation
      shape.rotation.x = Math.random() * 2 * Math.PI;
      shape.rotation.y = Math.random() * 2 * Math.PI;
      shape.rotation.z = Math.random() * 2 * Math.PI;

      // Store random animation parameters
      shape.userData = {
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        bobSpeed: (Math.random() - 0.5) * 0.005,
        bobOffset: Math.random() * Math.PI * 2, // Ensures varied bobbing start
      };

      shapes.push(shape);
      scene.add(shape);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0001; // Time for bobbing calculation

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Bobbing effect
        shape.position.y += Math.sin(time + shape.userData.bobOffset) * shape.userData.bobSpeed;
      });
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      shapes.forEach(shape => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) {
            if (Array.isArray(shape.material)) {
                shape.material.forEach(mat => mat.dispose());
            } else {
                shape.material.dispose();
            }
        }
      });
      scene.remove(...shapes); // Efficiently remove all shapes
      // Dispose scene children geometries and materials if any were directly added to scene
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (currentMount && renderer.domElement) {
        // Check if domElement is still a child before removing
        if (currentMount.contains(renderer.domElement)) {
            currentMount.removeChild(renderer.domElement);
        }
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return <div ref={mountRef} className="random-shapes" />;
};

export default RandomShape;
