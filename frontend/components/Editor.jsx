import React, { useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import ImageOverlay from "@/components/Editor/image";
import Image from "next/image";
import illus from "../public/design.svg";
import ip from "../public/upload.png";
const Editor = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDesign, setUserDesign] = useState(null);
  // const handleDesignChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setUserDesign(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleEditImage = (imageData) => {
    setSelectedImage(imageData);
    router.push({
      pathname: "/image-editor/images",
      query: {
        mainImage: "/t_hoodie.png",
        overlayImage: userDesign || "/logo_e.png",
      },
    });
  };

  const handleCreateDesign = async (e) => {
    const designerId = sessionStorage.getItem("idDesigner");
    const apiUrl = "http://localhost:8080/api/designer/createDesign";
    const file = e.target.files.item(0);

    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      setUserDesign(e.target.result);
      const formData = new FormData();

      formData.append("designerId", designerId);
      formData.append("image", userDesign);
      console.log(formData);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "x-api-key": "token",
          },
          body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Wrapper>
        <div className="">
          <div>
            <div className=" shadow-none image-pattern flex gap-[90px] justify-center items-center  h-[400px] bg-gray-100/75 my-6 rounded-md ">
              <div className="flex flex-col  items-center ">
                <div className="border-2 border-dashed border-black rounded-md shadow-sm p-2 h-[300px] flex justify-center items-center ">
                  <img
                    src={userDesign || "/logo_e.png"}
                    alt="User Design"
                    width={300}
                  />
                </div>

                {/* <label>
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

                      textDecoration: "none",
                    }}
                  >
                    Change Design
                  </Button>
                </label> */}

                <label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleCreateDesign}
                  />
                  <Button
                    variant="contained"
                    className="text-black border border-black  rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                    component="span"
                    style={{
                      border: "1px solid black",

                      textDecoration: "none",
                    }}
                  >
                    Create Design
                  </Button>
                </label>
              </div>
              <div>
                <Image src={ip} alt="image" />
              </div>
            </div>

            <p className="text-2xl font-bold mb-5">
              Check Out Products of Your Designs
            </p>

            <div className="flex">
              <div>
                <div className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-md inline-block w-[230px] p-5">
                  <ImageOverlay
                    mainImage="/t_shirt2.png"
                    overlayImage={userDesign || "/logo_e.png"}
                    overlayPosition="10,20"
                    width={200}
                    height={200}
                  />
                  <button
                    variant="outlined"
                    className="text-black border border-black  rounded-full p-1 px-[20px] bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                    onClick={() => handleEditImage(selectedImage || userDesign)}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-md inline-block w-[230px] p-5">
                <ImageOverlay
                  mainImage="/t_hoodie.png"
                  overlayImage={userDesign || "/logo_e.png"}
                  overlayPosition="10,20"
                  width={200}
                  height={200}
                />
                <button
                  variant="outlined"
                  onClick={() => handleEditImage(selectedImage || userDesign)}
                  className="text-black border border-black  rounded-full p-1 px-[20px] bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Editor;
