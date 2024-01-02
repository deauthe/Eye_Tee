import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdSave } from "react-icons/md";
import FinalImage from "@/components/finalImage";
import CanvasCapture from "./CanvasCapture";

export default function EditorModal({
  selectedColor,
  category,
  overlayImg,
  canvasCaptureProps,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setBackdrop("opaque");
    onOpen();
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageUrl)
        ? prevSelected.filter((img) => img !== imageUrl)
        : [...prevSelected, imageUrl]
    );
  };

  const handleSaveImages = async () => {
    // You can now use selectedImages to send the chosen images to your API using FormData
    console.log(selectedImages);
    const formData = new FormData();
    selectedImages.forEach((imageUrl) => {
      // Append each image URL to FormData
      formData.append("selectedImages[]", imageUrl);
    });

    // Now, you can perform a POST request to your API with the formData
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          // Add any headers needed, e.g., authorization
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Images uploaded successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to upload images");
      }
    } catch (error) {
      // Handle network error
      console.error("Error uploading images:", error);
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
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
          const mergedImages = data.flatMap((item) => item.imageUrls);
          setImages(mergedImages);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          key="a"
          variant="flat"
          color="warning"
          onPress={() => handleOpen()}
          className="flex items-center gap-1 bg-blue-400 hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full"
        >
          SAVE <MdSave />
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent style={{ maxWidth: "800px" }}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create your products for <b>{category}</b> category
              </ModalHeader>
              <ModalBody>
                <div className="flex overflow-x-auto gap-3">
                  {loading ? (
                    <div>Loading images...</div>
                  ) : (
                    images.map(
                      (imageUrl, index) =>
                        (index + 1) % 3 !== 0 && (
                          <div
                            className={`relative flex-shrink-0 w-[390px] h-[550px] cursor-pointer border-2 border-black rounded-md ${
                              selectedImages.includes(imageUrl)
                                ? "selected"
                                : ""
                            }`}
                            key={index}
                            onClick={() => handleImageSelect(imageUrl)}
                          >
                            {/* <FinalImage
                              mainImageSrc={imageUrl}
                              overlayImageSrc={overlayImg}
                              canvasCaptureProps={canvasCaptureProps}
                              scale={1}
                            /> */}
                            <CanvasCapture
                              mainImageSrc={imageUrl}
                              overlayImageSrc={overlayImg}
                              canvasCaptureProps={canvasCaptureProps}
                              scale={1}
                            />
                            {selectedImages.includes(imageUrl) && (
                              <div className="absolute top-2 right-2 text-green-500 w-[30px] h-[30px]">
                                ✓
                              </div>
                            )}
                          </div>
                        )
                    )
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onPress={handleSaveImages}
                  disabled={selectedImages.length === 0}
                >
                  Save Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
