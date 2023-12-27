import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Editor from "./Editor";

export default function CreateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = () => {
    setBackdrop("opaque");
    onOpen();
  };

  // body content

  const [formData, setFormData] = useState({
    description: "",
    address: "",
    firstName: "",
    lastName: "",
    portfolioLinks: "",
    socialMediaLinks: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for blank inputs
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // Clear error message
    setErrorMsg("");

    // Perform other actions (e.g., submit the form)
    // Add your logic here

    // Close the modal after submission
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          key="a"
          variant="flat"
          color="warning"
          onPress={() => handleOpen()}
          className="flex items-center gap-1 bg-black hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full"
        >
          Create a Product
          <span>
            <MdOutlineProductionQuantityLimits />
          </span>
        </Button>
      </div>
      <Modal
        size="5xl"
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        className="w-[800px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Your Profile
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Editor />
                </div>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" variant="ghost" onPress={onClose}>
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
