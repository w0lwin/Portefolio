import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Pixel3DAnimation = ({ isDarkTheme }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Création de la scène et de la caméra
    const scene = new THREE.Scene();
    const mount = mountRef.current;

    // Configuration du renderer pour qu'il s'adapte à la taille du conteneur
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Configuration de la caméra
    const aspectRatio = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 500;

    // Création des particules
    const particles = [];
    const particleMaterial = new THREE.PointsMaterial({ size: 1, color: isDarkTheme ? 0xffffff : 0x000000 });

    for (let x = -1000; x < 1000; x += 10) {
      for (let z = -1000; z < 1000; z += 10) {
        const y = (Math.sin(z * (Math.PI * 4 / 500)) + Math.sin((x + z) * (Math.PI * 2 / 500))) * 14 + 30;
        particles.push(new THREE.Vector3(x, y, z));
      }
    }

    const particleGeometry = new THREE.BufferGeometry().setFromPoints(particles);
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Fonction de rendu
    const render = () => {
      requestAnimationFrame(render);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    render();

    // Gestion du redimensionnement
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkTheme]); // Ajout de isDarkTheme comme dépendance

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Pixel3DAnimation;
