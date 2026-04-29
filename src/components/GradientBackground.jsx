import { useEffect, useRef } from "react";

export const GradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;
    const orbs = [
      {
        x: 0.2,
        y: 0.3,
        r: 0.35,
        color: "rgba(0, 240, 255, 0.12)",
        dx: 0.0003,
        dy: 0.0002,
      },
      {
        x: 0.7,
        y: 0.6,
        r: 0.4,
        color: "rgba(184, 41, 221, 0.1)",
        dx: -0.0002,
        dy: 0.0003,
      },
      {
        x: 0.5,
        y: 0.2,
        r: 0.3,
        color: "rgba(0, 255, 157, 0.08)",
        dx: 0.0002,
        dy: -0.0002,
      },
    ];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let anim;
    const draw = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;
        if (orb.x < -0.2 || orb.x > 1.2) orb.dx *= -1;
        if (orb.y < -0.2 || orb.y > 1.2) orb.dy *= -1;

        const g = ctx.createRadialGradient(
          orb.x * w,
          orb.y * h,
          0,
          orb.x * w,
          orb.y * h,
          orb.r * Math.min(w, h),
        );
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      anim = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
};
