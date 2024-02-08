import React, { useRef, useEffect, useState } from "react";

function FinalImage({
  mainImageSrc,
  overlayImageSrc,
  canvasCaptureProps,
  scale,
  productId,
  onSave,
  url,
}) {
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mainImage = new Image();
    mainImage.setAttribute("crossOrigin", "anonymous");
    mainImage.src = mainImageSrc;
    mainImage.onload = () => {
      const overlayImage = new Image();
      overlayImage.setAttribute("crossOrigin", "anonymous");
      overlayImage.src = overlayImageSrc;
      overlayImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = mainImage.width * scale;
        canvas.height = mainImage.height * scale;

        // Draw the main image
        ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

        // Apply transformations and draw the overlay image
        const { x, y } = canvasCaptureProps.overlayPosition;
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

        // Capture the canvas content as an image
        const capturedImageData = canvas.toDataURL("image/png");
        setCapturedImage(capturedImageData);
        // console.log("finalImage", productId, capturedImageData);
        onSave(capturedImageData, productId, url);
      };
    };
  }, [mainImageSrc, overlayImageSrc, canvasCaptureProps, scale]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </div>
  );
}

export default FinalImage;