import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ImageEditor from "@/components/Editor/index2";
import CanvasCapture from "@/components/CanvasCapture";
import Image from "next/image";
// import { Switch } from "antd";
import EditorModal from "./editorModal";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { HashLoader } from "react-spinners";

const ColorSelection = ({ onColorChange }) => {
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  const categoryC = router.query.category || "shirt";
  const [category, setCategory] = useState(`${categoryC}`);

  useEffect(() => {
    setCategory(categoryC);

    const fetchColors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/getColor?category=${category}`,
          {
            headers: {
              "x-api-key": "token",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(
            `http://localhost:8080/api/product/getColor?category=${category}`,
            data.colors
          );
          setColors(data.colors);
        } else {
          console.error("Failed to fetch colors");
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        console.log(
          `http://localhost:8080/api/product/getColor?category=${category}`
        );
        setLoading(false); // Set loading to false when done
      }
    };

    fetchColors();
  }, [categoryC]);

  const handleColorChange = (color) => {
    const isColorSelected = selectedColors.includes(color);
    setSelectedColors((prevSelectedColors) => [...prevSelectedColors, color]);
    toast.success("Fetching color");
    onColorChange(color);
  };

  // Add a loading state check

    if (loading) {
      return (
        <div className="flex items-center justify-center">
          <HashLoader color="#36d7b7" />
        </div>
      );
    }
  

  return (
    <div className="flex items-center space-x-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`w-[5em] h-[2em] cursor-pointer rounded-full`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        ></div>
      ))}
    </div>
  );
};

const EditorDesignCarasoul = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [selectedMainImage, setSelectedMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [backImage, setBackImage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [canvasCaptureProps, setCanvasCaptureProps] = useState({
    overlayScale: 1,
    overlayPosition: { x: 0, y: 0 },
    rotationAngle: 0,
  });
  // console.log("this is ", backImage);
  // console.log(typeof images[0]);
  const router = useRouter();
  const overlayImageSrc = router.query.url || "";
  const categoryR = router.query.category || "shirt";
  console.log("category-R", categoryR);
  const [category, setCategory] = useState(`${categoryR}`);
  console.log("category", categoryR);
  // handle funcitons
  const handleImageClick = (img) => {
    setBackImage(img);
    const canvasCaptureProps = {
      overlayPosition: { x: 4, y: 0 },
      overlayScale: 0.5,
      rotationAngle: 0,
      // Customize these values based on your requirements
    };
    setCanvasCaptureProps(canvasCaptureProps);
  };

  const handleColorChange = async (color) => {
    console.log("in api handlecolor", color);
    setSelectedColor(color); // Update the selected color state
    try {
      console.log(
        "getting new color",
        `http://localhost:8080/api/product/images?color=${color}&category=${category}`
      );
      const response = await fetch(
        `http://localhost:8080/api/product/images?color=${color}&category=${category}`,
        {
          headers: {
            "x-api-key": "token",
          },
        }
        
      );
      console.log( "this is color response",response)

      if (response.ok) {
        const data = await response.json();
        setImages(data[0].imageUrls);
        setSelectedMainImage(data[0].imageUrls[0]);
        setBackImage(data[0].imageUrls[0]);
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    // Fetch images based on color and category
    const fetchData = async () => {
      try {
        console.log(
          "in api useeffect",
          `http://localhost:8080/api/product/images?category=${category}`
        );
        const response = await fetch(
          `http://localhost:8080/api/product/images?category=${category}`,
          {
            headers: {
              "x-api-key": "token",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data[0].imageUrls);
          setImages((prevImages) => {
            const newImages = data[0].imageUrls;
            setSelectedMainImage(newImages[0]);
            setBackImage(newImages[0]);

            return newImages;
          });
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Check if categoryR is available and different from the current category
    if (categoryR !== null && categoryR !== category) {
      // Use the functional form of setCategory to ensure the latest state
      setCategory(categoryR);
    }

    // Fetch data if the component mounts with an initial category
    if (category !== "") {
      fetchData();
    }
  }, [category, categoryR]);

  const handleImageSelect = (imageSrc) => {
    setSelectedMainImage(imageSrc);
  };

  const handleCanvasCapturePropsChange = (newProps) => {
    // Update the canvasCaptureProps state
    setCanvasCaptureProps((prevProps) => ({
      ...prevProps,
      ...newProps,
    }));

    console.log("editor state", newProps);
  };

  return (
    <div className="relative">
      <div className="  flex gap-4 text-white text-[20px] w-full max-w-[1360px] mx-auto top-[50px] object-contain  ">
        <div className=" h-[550px] object-contain w-full bg-[#f5f5f5] rounded-[30px]  ">
          {backImage && (
            <ImageEditor
              mainImageSrc={backImage}
              overlayImageSrc={overlayImageSrc}
              showBoundingBox={true}
              imageSize={1}
              onCapturePropsChange={handleCanvasCapturePropsChange}
            />
          )}
          <div className="absolute top-2 right-2 ">
            {overlayImageSrc && (
              <EditorModal
                category={category}
                selectedColor={selectedColor}
                overlayImg={overlayImageSrc}
                canvasCaptureProps={canvasCaptureProps}
              />
            )}
          </div>
        </div>
      </div>

      <div className=" absolute top-[-2em] right-[-6.5em] flex flex-col items-center justify-center  h-[300px] overflow-hidden    z-2  ">
        {images.slice(0, 2).map((imageUrl, index) => (
          <div
            className="flex items-center justify-center border bg-[#f5f5f5]   cursor-pointer  mt-4 rounded-[20px]"
            key={index}
            onClick={() => handleImageClick(imageUrl)}
          >
            <CanvasCapture
              mainImageSrc={imageUrl}
              overlayImageSrc={overlayImageSrc}
              canvasCaptureProps={canvasCaptureProps}
              scale={0.2}
            />
          </div>
        ))}
      </div>

      <div className=" flex  mt-4 justify-center bg-[#f5f5f5] py-1 rounded-full">
        <ColorSelection onColorChange={handleColorChange} />
      </div>
    </div>
  );
};

export default EditorDesignCarasoul;
