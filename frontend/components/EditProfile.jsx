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

export default function EditProfile() {
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
        <button
          key="a"
          variant="flat"
          color="warning"
          onClick={() => handleOpen()}
          className=" p-1  rounded-full z-30"
        >
          Edit Profile 
     <span> +</span>
        </button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
               Edit Your Profile
              </ModalHeader>
              <ModalBody>
                <div className="max-w-md  mt-8 p-4  rounded-lg ">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold mb-2"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-semibold mb-2"
                      >
                        Address:
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold mb-2"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold mb-2"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="portfolioLinks"
                        className="block text-sm font-semibold mb-2"
                      >
                        Portfolio Links:
                      </label>
                      <input
                        type="text"
                        id="portfolioLinks"
                        name="portfolioLinks"
                        value={formData.portfolioLinks}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="socialMediaLinks"
                        className="block text-sm font-semibold mb-2"
                      >
                        Social Media Links:
                      </label>
                      <input
                        type="text"
                        id="socialMediaLinks"
                        name="socialMediaLinks"
                        value={formData.socialMediaLinks}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                    >
                      Submit
                    </button>

                    {errorMsg && (
                      <p className="text-red-500 mt-2">{errorMsg}</p>
                    )}
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
