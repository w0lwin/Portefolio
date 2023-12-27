import React, { useEffect, useRef, useState } from 'react';

class Pixel3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const Pixel3DAnimation = ({ isDarkTheme }) => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const canvasRef = useRef(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const fov = 250;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const pixels = [];

    for (let x = -1000; x < 1000; x += 5) {
      for (let z = -1000; z < 1000; z += 5) {
        const zOscillation = Math.sin(z * (Math.PI * 4 / 500));
        const xOscillation = Math.sin((x + z) * (Math.PI * 2 / 500));
        const pixel = new Pixel3D(x, (zOscillation + xOscillation) * 14 + 30, z);
        pixels.push(pixel);
      }
    }

    const render = () => {
      if (!isAnimationActive) {
        // Ne pas rendre l'animation si elle n'est pas activée
        return;
      }

      offsetX.current += (mouseX.current - offsetX.current) * 0.1;
      offsetY.current += (mouseY.current - offsetY.current) * 0.1;

      context.clearRect(0, 0, width, height);
      const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

      let i = pixels.length;
      while (i--) {
        const pixel = pixels[i];
        const scale = fov / (fov + pixel.z);
        const x2d = ((pixel.x + offsetX.current) * scale) + halfWidth;
        const y2d = ((pixel.y + offsetY.current + 30) * scale) + halfHeight;
        let color = [255, 255, 255];

        // if (isDarkTheme) {
        //   color = [0, 0, 0];
        // }

        const alpha = 255 - pixel.z - (0.65 * 255);
        setPixel(imagedata, x2d, y2d, ...color, alpha);
        pixel.z -= 1;

        if (pixel.z < -fov) pixel.z += (fov * 2);
      }

      context.putImageData(imagedata, 0, 0);
      requestAnimationFrame(render);
    };

    const setPixel = (imagedata, x, y, r, g, b, a) => {
      if ((x < 0) || (x > width) || (y < 0) || (y > width)) return;
      const i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = r;
      imagedata.data[i + 1] = g;
      imagedata.data[i + 2] = b;
      imagedata.data[i + 3] = a;
    };

    const onMouseMove = (e) => {
      mouseX.current = (halfWidth - e.clientX) * 0.1;
      mouseY.current = (halfHeight - e.clientY) * 0.1;
    };

    document.body.addEventListener("mousemove", onMouseMove);
    render();

    // Nettoyez l'écouteur d'événements lors du démontage du composant
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, [width, height, halfWidth, halfHeight, isDarkTheme, isAnimationActive]);

  // Mettez à jour l'état de l'animation lorsque le thème sombre change
  useEffect(() => {
    setIsAnimationActive(isDarkTheme);
  }, [isDarkTheme]);

  return <canvas ref={canvasRef} />;
};

export default Pixel3DAnimation;
