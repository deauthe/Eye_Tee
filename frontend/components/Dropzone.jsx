import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import image from "../public/upload.gif";
import check from "../public/double-check.gif";

const DropzoneComponent = () => {
  const [droppedImage, setDroppedImage] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const [file, setFile] = useState({});

  const toastify = (a) => {
    if (a) {
      toast.success("File accepted successfully!");
    } else {
      toast.success("file Uplad succesfully");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const droppedFile = acceptedFiles[0];
      setFile(droppedFile);
      console.log("this is file", file);
      setDroppedImage(URL.createObjectURL(droppedFile));
      setIsDropped(isDropped);
      toastify(isDropped);
    },
    [isDropped]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: [".jpeg", ".jpg", ".png", ".gif"], // Accept all image formats
  });

  let borderColor = "#E2E8F0"; // Default border color

  if (isDragActive) {
    borderColor = isDragAccept ? "#48BB78" : "#F56565";
  }

  const handleButtonClick = () => {
    // Trigger click on the hidden input to select images
    const input = document.getElementById("fileInput");
    input.click();
  };

  const handleUploadDesign = ()=>{
    
  }



  return (
    <div
      className="bg-white h-[400px] mb-6 rounded-md p-3 grid grid-cols-2 gap-7"
      {...getRootProps()}
      style={{ borderColor }}
    >
      <div className="grid grid-rows-8 gap-3">
        <div
          className={`border-3 flex flex-col items-center justify-center  border-gray-500 border-dashed rounded-md row-span-5 p-0 ${
            isDragActive ? "bg-green-100" : ""
          }`}
        >
          {isDragAccept ? (
            <Image src={check} alt="gif" width={220} height={150} />
          ) : (
            <Image src={image} alt="gif" width={220} height={150} />
          )}
          <p>{isDragActive ? "Drop here " : "Drag 'n' drop your Designs"}</p>
        </div>

        <div className="flex justify-center items-center grid-rows-2 row-span-3">
          {Object.keys(file).length == 0 ? (
            <button
              className="border-3 border-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-250 "
              onClick={handleButtonClick}
            >
              <span className={`font-[600]`}>Upload Design</span>
            </button>
          ) : (
            <button
              className="border-3 border-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-250 "
              onClick={handleUploadDesign}
            >
              <span className={`font-[600]`}>Upload Design</span>
            </button>
          )}

          {/* Hidden input for selecting images */}
          <input
            {...getInputProps()}
            id="fileInput"
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="border-2 border-gray-500 border-dashed rounded-md overflow-hidden object-fit">
        {droppedImage && (
          <img
            src={droppedImage}
            alt="dropped"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DropzoneComponent;
