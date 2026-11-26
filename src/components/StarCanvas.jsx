
import { useEffect, useRef } from "react";

import { Particle } from "../animations/particles";

import {
  generateTextPoints,
  generateHeartPoints,
} from "../animations/formations";

import { assignFormation } from "../animations/transitions";

export default function StarCanvas({ formation }) {
  const canvasRef = useRef(null);
  const formationRef = useRef(formation);
  const applyFormationRef = useRef(null);

  formationRef.current = formation;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
    });

    if (!ctx) return;

    const isMobile = window.innerWidth < 600;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let animationFrame;
    let resizeTimeout;
    let time = 0;

    // Resolución adaptada al dispositivo.
    let ratio = Math.min(
      window.devicePixelRatio || 1,
      isMobile ? 1.25 : 1.5
    );

    // Menos partículas en celulares.
    const particleCount = isMobile ? 650 : 1400;

    const particles = Array.from(
      { length: particleCount },
      () => new Particle(width, height)
    );

    let backgroundStars = [];

    function createBackgroundStars() {
      const area = width * height;

      const starCount = Math.min(
        Math.floor(area / (isMobile ? 4500 : 3000)),
        isMobile ? 250 : 600
      );

      backgroundStars = Array.from(
        { length: starCount },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.9 + 0.3,
          alpha: Math.random() * 0.5 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.025 + 0.008,
          color: [
            "#ffffff",
            "#d8c7ff",
            "#a5c8ff",
            "#f9d78a",
          ][Math.floor(Math.random() * 4)],
        })
      );
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;

      ratio = Math.min(
        window.devicePixelRatio || 1,
        width < 600 ? 1.25 : 1.5
      );

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      createBackgroundStars();
    }

    function createFormation() {
      const current = formationRef.current;

      if (!current) return;

      let points = [];

      const mobile = width < 600;

      if (current.type === "heart") {
        points = generateHeartPoints(
          width,
          height,
          mobile ? 550 : 1200
        );
      } else {
        const fontSize = Math.min(
          width * (mobile ? 0.09 : 0.085),
          height * 0.13,
          mobile ? 48 : 100
        );

        points = generateTextPoints(
          current.value,
          width,
          height,
          {
            fontSize,
            gap: mobile ? 6 : 4,
          }
        );
      }

      assignFormation(particles, points);
    }

    applyFormationRef.current = createFormation;

    resizeCanvas();
    createFormation();

    function drawBackground() {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        height
      );

      gradient.addColorStop(0, "#020611");
      gradient.addColorStop(0.6, "#080b20");
      gradient.addColorStop(1, "#160d2c");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.55
      );

      glow.addColorStop(
        0,
        "rgba(110, 80, 190, 0.16)"
      );

      glow.addColorStop(
        1,
        "rgba(2, 6, 17, 0)"
      );

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }

    function drawBackgroundStars() {
      backgroundStars.forEach((star) => {
        star.phase += star.speed;

        const twinkle =
          0.5 + Math.sin(time + star.phase) * 0.5;

        const alpha =
          star.alpha * (0.45 + twinkle * 0.55);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;

        // Sin sombra para las estrellas pequeñas.
        ctx.beginPath();
        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }

    function animate() {
      time += 0.025;

      drawBackground();
      drawBackgroundStars();

      particles.forEach((particle) => {
        particle.update(time);
        particle.draw(ctx);
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createFormation();
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(resizeTimeout);

      window.removeEventListener(
        "resize",
        handleResize
      );

      applyFormationRef.current = null;
    };
  }, []);

  useEffect(() => {
    applyFormationRef.current?.();
  }, [formation]);

  return (
    <canvas
      ref={canvasRef}
      className="star-canvas"
    />
  );
}
