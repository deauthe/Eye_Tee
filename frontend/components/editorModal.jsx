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
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import CanvasCapture from "@/components/CanvasCapture";

export default function EditorModal({
  selectedColor,
  category,
  overlayImg,
  canvasCaptureProps,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setBackdrop("opaque");
    onOpen();
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
          setImages(data[0].imageUrls);
          console.log(
            "modalImg",
            category,
            overlayImg,
            images,
            canvasCaptureProps
          );
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
          className=" flex  items-center  gap-1 bg-blue-400 hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full "
        >
          SAVE <MdSave />
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {category}
              </ModalHeader>
              <ModalBody>
                <div className="flex mt-5">
                  {loading ? (
                    <div>Loading images...</div>
                  ) : (
                    images.map((imageUrl, index) => (
                      <div
                        className="flex items-center justify-center w-[80px]  cursor-pointer border-2 border-black rounded-md"
                        key={index}
                      >
                        <CanvasCapture
                          mainImageSrc={imageUrl}
                          overlayImageSrc={overlayImg}
                          canvasCaptureProps={canvasCaptureProps}
                        />
                      </div>
                    ))
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
