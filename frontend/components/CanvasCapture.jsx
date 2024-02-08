import React, { useRef, useEffect } from "react";

function CanvasCapture({
  mainImageSrc,
  overlayImageSrc,
  canvasCaptureProps,
  scale,
}) {
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

        canvas.width = mainImage.width * scale;
        canvas.height = mainImage.height * scale;

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
        let { x, y } = canvasCaptureProps.overlayPosition;
        x = x * scale;
        y = y * scale;
        const width =
          overlayImage.width * canvasCaptureProps.overlayScale * scale;
        const height =
          overlayImage.height * canvasCaptureProps.overlayScale * scale;

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