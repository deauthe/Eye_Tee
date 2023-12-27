import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Switch } from "@nextui-org/react";
import ImageEditor from "@/components/Editor/index2";

const EditorDesignCarasoul = () => {
  const [isSelected, setIsSelected] = useState(true);
  const [selectedMainImage, setSelectedMainImage] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter();
  const overlayImageSrc = router.query.url || "";
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
  }, []);

  const handleImageSelect = (imageSrc) => {
    setSelectedMainImage(imageSrc);
  };

  return (
    <div className=" text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="absolute right-1 top-3 z-40 gap-2 flex mr-4 items-center border-2 border-black p-1 px-2 rounded-full bg-zinc-300">
        <span className="text-black text-sm">Front</span>
        <Switch
          className=""
          isSelected={isSelected}
          onValueChange={setIsSelected}
        ></Switch>
        <span className="text-black text-sm ml-[-7px]">Back</span>
      </div>
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Product ${index + 1}`}
            onClick={() => handleImageSelect(imageUrl)}
          />
        ))}
      </Carousel>

      {/* Pass selectedMainImage to ImageEditor */}
      <ImageEditor
        mainImageSrc={selectedMainImage}
        overlayImageSrc={overlayImageSrc}
      />
    </div>
  );
};

export default EditorDesignCarasoul;
