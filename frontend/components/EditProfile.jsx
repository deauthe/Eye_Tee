import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {MdAddIcCall} from 'react-icons/md';
import {BsFacebook} from 'react-icons/bs';
import {AiFillInstagram} from 'react-icons/ai';
import {RiTwitterXFill} from 'react-icons/ri';
export default function EditProfile() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')

 

  const handleOpen = () => {
    setBackdrop("opaque")
    onOpen();
  }

  return (
    <>


      <div className="flex flex-wrap gap-3">
      
          <Button  
            key="a"
            variant="flat" 
            color="warning" 
            onPress={() => handleOpen()}
            className=" flex  items-center  gap-1 bg-black hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full "
          >
             Edit Profile <span>+</span>
          </Button>
         
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Connect Through</ModalHeader>
              <ModalBody>
              <div className="flex  text-5xl gap-5 justify-center items-center">

                <RiTwitterXFill/>
                <AiFillInstagram/>
                <BsFacebook/>


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
