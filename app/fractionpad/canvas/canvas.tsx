import React, { useRef, useEffect } from "react";

export const Canvas = ({ draw, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const drawFn = draw(context, canvas);

    let animationFrameId;
    let lastTime = Date.now();

    const render = (currentTime) => {
      drawFn(currentTime - lastTime);
      lastTime = currentTime;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render(Date.now());

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...props} />;
};
