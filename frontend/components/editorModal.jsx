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
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setBackdrop("opaque");
    onOpen();
  };

  const handleImageSelect = (imageUrl, productId) => {
    const selectedImage = { imageUrl, productId };
    console.log(selectedImages);
    setSelectedImages((prevSelected) =>
      prevSelected.some((img) => img.imageUrl === imageUrl)
        ? prevSelected.filter((img) => img.imageUrl !== imageUrl)
        : [...prevSelected, selectedImage]
    );
  };

  // function dataURLtoBlob(dataurl) {
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], { type: mime });
  // }
  const handleSaveImages = async () => {
    // Convert each data URL to a Blob and create a File
    const files = selectedImages.map(async (dataUrl, index) => {
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const file = new File([blob], "image_${index + 1}.png", {
        type: "image/jpeg",
        lastModified: new Date(),
      });
      return file;
    });

    // Create FormData and append files
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("image", file);
    });

    console.log("SAVED IMAGES", files, selectedImages);

    const apiUrl = "http://localhost:8080/api/designer/createDesign";
    const apiKey = "token";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        toast.success("Added Product Successfully");
      }
    } catch (err) {
      toast.error("Error in adding Product");
      console.log(err);
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
          const mergedIds = data.flatMap((item) => item.productId);
          setImages(mergedImages);
          setSelectedIds(mergedIds);
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
                              selectedImages.some(
                                (img) => img.imageUrl === imageUrl
                              )
                                ? "selected"
                                : ""
                            }`}
                            key={index}
                            onClick={() =>
                              handleImageSelect(
                                imageUrl,
                                selectedIds[Math.floor(index / 3)]
                              )
                            }
                          >
                            <FinalImage
                              mainImageSrc={imageUrl}
                              overlayImageSrc={overlayImg}
                              canvasCaptureProps={canvasCaptureProps}
                              scale={1}
                            />
                            {selectedImages.some(
                              (img) => img.imageUrl === imageUrl
                            ) && (
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
