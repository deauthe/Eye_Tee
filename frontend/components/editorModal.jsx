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
import { toast } from "react-toastify";

export default function EditorModal({
  designImageUrl,
  selectedColor,
  category,
  overlayImg,
  canvasCaptureProps,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedIds, setSelectedIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFinalImages, setSelectedFinalImages] = useState([]);
  const handleOpen = () => {
    setBackdrop("opaque");
    onOpen();
  };
  const handleImageSelect = (capturedImage, productId, imageUrl) => {
    console.log("Image Select", capturedImage, productId);

    // Check if an image with the same capturedImage and imageUrl already exists in prevArray
    const selected = selectedImages.find((img) => img.imageUrl === imageUrl);

    if (!selected) {
      setSelectedImages((prevArray) => [
        ...prevArray,
        { capturedImage, productId, imageUrl },
      ]);
    } else {
      console.log("Image is already selected.");
    }
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

  const handleSave = (imageUrl) => {
    // Check if the image with the same imageUrl already exists in selectedFinalImages
    const isImageSelected = selectedFinalImages.some(
      (img) => img.imageUrl === imageUrl
    );

    if (!isImageSelected) {
      // Find the corresponding object in selectedImages based on imageUrl
      const correspondingImage = selectedImages.find(
        (img) => img.imageUrl === imageUrl
      );

      if (correspondingImage) {
        setSelectedFinalImages((prevArray) => [
          ...prevArray,
          correspondingImage,
        ]);
      } else {
        console.log("Corresponding image not found in selectedImages.");
      }
    } else {
      console.log("Image is already selected.", selectedFinalImages);
    }
  };
  const handleSaveImages = async () => {
    try {
      const files = await Promise.all(
        selectedFinalImages.map(async (dataUrl, index) => {
          const { capturedImage, productId } = dataUrl;

          const res = await fetch(capturedImage);
          const blob = await res.blob();

          // Use the product ID to create a unique file name
          const fileName = `product_${productId}_image_${index + 1}.png`;
          console.log("SAVED IMAGES", fileName);
          const file = new File([blob], fileName, {
            type: "image/jpeg",
            lastModified: new Date(),
          });
          return file;
        })
      );

      // Create FormData and append files
      const formData = new FormData();
      files.forEach((file, index) => {
        console.log("in files", file);
        formData.append("image", file);
      });

      // Append designImageUrl
      formData.append("designImageUrl", designImageUrl);
      console.log("in formData", formData);

      // const apiUrl = "http://localhost:8080/api/designs/add-products";
      const apiUrl =
        "http://localhost:8080/api/finalproduct/create-final-products";

      const apiKey = "token";

      if (designImageUrl) {
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
      }
    } catch (err) {
      toast.error("Error in adding Product");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
` http://localhost:8080/api/product/images?category=${category}`,
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
                              selectedFinalImages.some(
                                (img) => img.imageUrl === imageUrl
                              )
                                ? "selected"
                                : ""
                            }`}
                            key={index}
                            onClick={() => {
                              handleSave(imageUrl);
                            }}
                          >
                            <FinalImage
                              mainImageSrc={imageUrl}
                              overlayImageSrc={overlayImg}
                              canvasCaptureProps={canvasCaptureProps}
                              scale={1}
                              url={imageUrl}
                              productId={selectedIds[Math.floor(index / 3)]}
                              onSave={handleImageSelect}
                            />
                            {selectedFinalImages.some(
                              (img) => img.imageUrl === imageUrl
                            ) && (
                              <div className="absolute top-2 right-2 text-green-500 w-[30px] h-[30px]">
                                <button>✅</button>
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
                  onClick={handleSaveImages}
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