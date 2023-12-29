import React, { useEffect, useRef } from 'react';

class Pixel3D {
  constructor(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
  }
}

const Pixel3DAnimation = ({ isDarkTheme }) => {
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

    const defaultColor = isDarkTheme ? [255, 255, 255] : [0, 0, 0];
    const pixels = [];

    for (let x = -1000; x < 1000; x += 10) {
      for (let z = -1000; z < 1000; z += 10) {
        const zOscillation = Math.sin(z * (Math.PI * 4 / 500));
        const xOscillation = Math.sin((x + z) * (Math.PI * 2 / 500));
        const pixel = new Pixel3D(x, (zOscillation + xOscillation) * 14 + 30, z, defaultColor);
        pixels.push(pixel);
      }
    }

    const render = () => {
      offsetX.current += (mouseX.current - offsetX.current) * 0.1;
      offsetY.current += (mouseY.current - offsetY.current) * 0.1;

      context.clearRect(0, 0, width, height);

      pixels.forEach(pixel => {
        const scale = fov / (fov + pixel.z);
        const x2d = ((pixel.x + offsetX.current) * scale) + halfWidth;
        const y2d = ((pixel.y + offsetY.current + 30) * scale) + halfHeight;
        const alpha = 255 - pixel.z - (0.65 * 255);
        context.fillStyle = `rgba(${pixel.color[0]}, ${pixel.color[1]}, ${pixel.color[2]}, ${alpha / 255})`;
        context.fillRect(x2d, y2d, 1, 1);
        pixel.z -= 1;
        if (pixel.z < -fov) {
          pixel.z += (fov * 2);
          pixel.color = isDarkTheme ? [255, 255, 255] : [0, 0, 0];
        }
      });

      requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      mouseX.current = (halfWidth - e.clientX) * 0.1;
      mouseY.current = (halfHeight - e.clientY) * 0.1;
    };

    document.body.addEventListener("mousemove", onMouseMove);
    render();

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, [width, height, halfWidth, halfHeight, isDarkTheme]);

  return <canvas ref={canvasRef} />;
};

export default Pixel3DAnimation;
