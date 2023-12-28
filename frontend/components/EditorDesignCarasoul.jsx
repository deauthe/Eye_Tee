import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ImageEditor from "@/components/Editor/index2";
import Image from "next/image";
import { Switch } from "antd";

const colors = [
  "bg-[#3498db]", // Dodger Blue
  "bg-[#2ecc71]", // Emerald Green
  "bg-[#e74c3c]", // Alizarin Red
  "bg-[#f39c12]", // Sunflower Yellow
  "bg-[#9b59b6]"  // Amethyst Purple
];



const ColorSelection = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  console.log("this is selected color",selectedColors)
  const handleColorChange = (value) => {
    console.log("this is value", value);
    const isColorSelected = selectedColors.includes(value);

    if (!isColorSelected) {
      setSelectedColors((prevSelectedColors) => prevSelectedColors.push(value));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-[5em] h-[2em] cursor-pointer rounded-full ${color}`}
          onClick={() => handleColorChange(color)}
        ></div>
      ))}
    </div>
  );
};

const EditorDesignCarasoul = () => {
  const [isSelected, setIsSelected] = useState(true);
  const [selectedMainImage, setSelectedMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [backImage, setBackImage] = useState("");
  console.log("this is ", backImage);
  console.log(typeof images[0]);
  const router = useRouter();
  const overlayImageSrc = router.query.url || "";

  // handle funcitons
  const handleImageClick = (img) => {
    setBackImage(img);
  };

  useEffect(() => {
    // Fetch images based on color and category
    const fetchData = async () => {
      try {
        const color = "blue"; // Set your color dynamically
        const category = "hoodie"; // Set your category dynamically

        const response = await fetch(
          `http://localhost:8080/api/product/images?color=${color}&category=${category}`,
          {
            headers: {
              "x-api-key": "token",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data[0].imageUrls);
          setImages(data[0].imageUrls); // Assuming the API response has an 'images' property
          setSelectedMainImage(data[0].imageUrls[0]);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();

    setBackImage(images[0]);
  }, []);

  const handleImageSelect = (imageSrc) => {
    setSelectedMainImage(imageSrc);
  };

  return (
    <>
      <div className="  border-2 border-green-500 flex gap-4 text-white text-[20px] w-full max-w-[1360px] mx-auto top-[50px] object-contain  ">
        <div className="absolute right-[80px] top-2 z-40 gap-2 flex mr-4 items-center border-2 border-black p-1 px-2 rounded-full bg-zinc-700">
          <Switch
            checkedChildren="Back"
            unCheckedChildren="Front"
            defaultChecked
          />
        </div>

        <div className=" border-2 border-red-500 h-[500px] object-contain w-full ">
          {backImage && (
            <ImageEditor
              mainImageSrc={backImage}
              overlayImageSrc={overlayImageSrc}
            />
          )}
        </div>
       
      </div>

      <div className="flex  h-[80px] overflow-hidden my-3  gap-2 z-2 border-5 border-black ">
          {images.map((imageUrl, index) => (
            <div
              className=" flex items-center justify-center w-[80px] cursor-pointer border-2 border-black rounded-md "
              key={index}
              onClick={() => handleImageClick(imageUrl)}
            >
              <Image src={imageUrl} alt="mockup" width={50} height={50}></Image>
            </div>
          ))}
        </div>

      <div>
        <ColorSelection />
      </div>
    </>
  );
};

export default EditorDesignCarasoul;
