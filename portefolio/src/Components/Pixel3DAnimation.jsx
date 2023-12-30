import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Pixel3DAnimation = ({ isDarkTheme }) => {
  const mountRef = useRef(null);
  const particles = new Array();
  const particleMaterial = new THREE.PointsMaterial({ size: 1, color: isDarkTheme ? 0xffffff : 0x000000 });

  useEffect(() => {
    // Création de la scène et de la caméra
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Création du renderer avec fond transparent
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mountCurrent = mountRef.current;
    mountCurrent.appendChild(renderer.domElement);

    // Ajout des particules
    for (let x = -1000; x < 1000; x += 10) {
      for (let z = -1000; z < 1000; z += 10) {
        const y = (Math.sin(z * (Math.PI * 4 / 500)) + Math.sin((x + z) * (Math.PI * 2 / 500))) * 14 + 30;
        particles.push(new THREE.Vector3(x, y, z));
      }
    }

    const particleGeometry = new THREE.BufferGeometry().setFromPoints(particles);
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 500;

    // Fonction de rendu
    const render = () => {
      requestAnimationFrame(render);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    render();

    // Nettoyage
    return () => {
      mountCurrent.removeChild(renderer.domElement);
    };
  }, [isDarkTheme]); // Ajout de isDarkTheme comme dépendance

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}/>;
};

export default Pixel3DAnimation;
