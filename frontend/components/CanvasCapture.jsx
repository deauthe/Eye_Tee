import React, { useRef, useEffect } from "react";

function CanvasCapture({ mainImageSrc, overlayImageSrc, canvasCaptureProps }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mainImage = new Image();
    mainImage.src = mainImageSrc;
    mainImage.onload = () => {
      const overlayImage = new Image();
      overlayImage.src = overlayImageSrc;
      overlayImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the main image
        ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
        console.log(
          "canvasCapture",
          mainImageSrc,
          overlayImageSrc,
          canvasCaptureProps,
          mainImage,
          overlayImage
        );
        // Apply transformations and draw the overlay image
        const { x, y } = canvasCaptureProps.overlayPosition;
        const width = overlayImage.width * canvasCaptureProps.overlayScale;
        const height = overlayImage.height * canvasCaptureProps.overlayScale;

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.8;

        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate((canvasCaptureProps.rotationAngle * Math.PI) / 180);
        ctx.drawImage(overlayImage, -width / 4, -height / 4, width, height);
        ctx.restore();
      };
    };
  }, [mainImageSrc, overlayImageSrc, canvasCaptureProps]);

  return <canvas ref={canvasRef} />;
}

export default CanvasCapture;
