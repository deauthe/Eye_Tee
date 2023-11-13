import React, { useState } from "react";
import { useRouter } from "next/router";
import DesignSelection from "@/components/Editor/ start";
import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import ImageOverlay from "@/components/Editor/image";
import Image from "next/image";
import illus from '../public/design.svg';
const editor = () => {
    const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDesign, setUserDesign] = useState(null);
  const handleDesignChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDesign(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditImage = (imageData) => {
    setSelectedImage(imageData);
    router.push(
        {
            pathname: '/image-editor/[mainImage]',
            query: {
              mainImage: "/t_hoodie.png",
              overlayImage: userDesign || "/logo_e.png",
            },
        }
          );
  };

  return (
    <>
      <Wrapper>
        <div>
          <div>
            <div className="border-2 border-black">
             <div className="flex flex-col  items-center">
             <img src={userDesign || "logo_e.png"} alt="User Design" width={300}  />
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleDesignChange}
                />
                <Button
                  variant="contained"
                  className= "text-black border border-black  rounded-full p-2 px-4 bg-transparent shadow-none hover:bg-black hover:text-white mt-3"
                  component="span"
                  style={{
                    border: "1px solid black",
                    boxShadow:"none",
                    
                  }}

                >
                  Change Design
                </Button>
              </label>
             </div>
             {/* <div>
                <Image src={illus} alt="image"/>
             </div> */}
            </div>

            <div>
              <div>
                <p>Your Creativity on T-shirts</p>
                <ImageOverlay
                  mainImage="t_shirt2.png"
                  overlayImage={userDesign || "logo_e.png"}
                  overlayPosition="10,20"
                  width={200}
                  height={200}
                />
                <Button
                  variant="outlined"
                  className="edit-button"
                  onClick={() => handleEditImage(selectedImage || userDesign)}
                >
                  Edit
                </Button>
              </div>

              <div>
                <p>Your Creativity on Hoodies</p>
                <ImageOverlay
                  mainImage="t_hoodie.png"
                  overlayImage={userDesign || "logo_e.png"}
                  overlayPosition="10,20"
                  width={300}
                  height={400}
                />
                <Button
                  variant="outlined"
                  className="edit-button"
                  onClick={() => handleEditImage(selectedImage || userDesign)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default editor;
