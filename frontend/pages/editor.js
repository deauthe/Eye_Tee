import React, { useState } from "react";
import { useRouter } from "next/router";
import DesignSelection from "@/components/Editor/ start";
import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import ImageOverlay from "@/components/Editor/image";
import Image from "next/image";
import illus from "../public/design.svg";
import ip from "../public/upload.png";
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
    router.push({
      pathname: "/image-editor/[mainImage]",
      query: {
        mainImage: "/t_hoodie.png",
        overlayImage: userDesign || "/logo_e.png",
      },
    });
  };

  return (
    <>
      <Wrapper>
        <div>
          <div>
            <div className=" shadow-none image-pattern flex gap-[90px] justify-center items-center  h-[500px] bg-gray-100/75 my-6 rounded-md ">
              <div className="flex flex-col  items-center ">
               <div className="border-2 border-dashed border-black rounded-md shadow-sm p-2 h-[400px] flex justify-center items-center ">
               <img
                  src={userDesign || "logo_e.png"}
                  alt="User Design"
                  width={300}
                />
               </div>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleDesignChange}
                  />
                  <Button
                    variant="contained"
                    className="text-black border border-black  rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                    component="span"
                    style={{
                      border: "1px solid black",
                      
                      textDecoration:"none"
                    }}
                  >
                    Change Design
                  </Button>
                </label>
              </div>
              <div>
                <Image src={ip} alt="image" />
              </div>
            </div>

            <div>
              <div>
                <p className="text-2xl font-bold mb-5" >Your Design on T-shirts</p>
               <div className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-md inline-block w-[230px] p-5">
               <ImageOverlay
                  mainImage="t_shirt2.png"
                  overlayImage={userDesign || "logo_e.png"}
                  overlayPosition="10,20"
                  width={200}
                  height={200}
                />
                <Button
                  variant="outlined"
                  className="text-black border border-black  rounded-full p-1 px-[20px] bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                  onClick={() => handleEditImage(selectedImage || userDesign)}
                >
                  Edit
                </Button>
               </div>
              </div>

              <div>
                <p className="text-2xl font-bold mb-5 mt-2">Your Design on Hoodies</p>
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
