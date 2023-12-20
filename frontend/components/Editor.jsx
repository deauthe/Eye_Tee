import React, { useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import ImageOverlay from "@/components/Editor/image";
import Image from "next/image";
import illus from "../public/design.svg";
import ip from "../public/upload.png";
import { userAgent } from "next/server";

const Editor = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDesign, setUserDesign] = useState(null);
  const [isDesignUploaded, setIsDesignUploaded] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleUploadDesign = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDesign(e.target.result);
        setIsDesignUploaded(true);
        console.log(userDesign);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAgain = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDesign(e.target.result);
        setIsDesignUploaded(true);
        console.log("a", userDesign);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDesign = async () => {
    const designerId = sessionStorage.getItem("designerID");
    const apiUrl = "http://localhost:8080/api/designer/createDesign";

    if (!isDesignUploaded) {
      console.error("No design uploaded");
      return;
    }

    const headers = {
      "x-api-key": "token",
    };

    const formData = new FormData();
    formData.append("designerId", designerId);
    formData.append("image", userDesign);
    // console.log(formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (name === "") {
      setNameError("Name cannot be empty");
      return;
    }

    if (description === "") {
      setDescriptionError("Description cannot be empty");
      return;
    }

    console.log("Name:", name);
    console.log("Description:", description);
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
                    src={userDesign || "/image_editor.png"}
                    alt="User Design"
                    width={300}
                  />
                </div>

                {!isDesignUploaded && (
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadDesign}
                    />
                    <button
                      className="text-black border border-black rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                      style={{
                        border: "1px solid black",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.querySelector("input[type=file]").click()
                      }
                    >
                      Upload Design
                    </button>
                  </label>
                )}

                {isDesignUploaded && (
                  <>
                     <label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadAgain}
                    />
                    <button
                      className="text-black border border-black rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                      style={{
                        border: "1px solid black",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.querySelector("input[type=file]").click()
                      }
                    >
                      Upload Design
                    </button>
                  </label>

                    {/* <Button
                      variant="contained"
                      className="text-black border border-black  rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                      onClick={handleCreateDesign}
                    >
                      Create Design
                    </Button> */}
                  </>
                )}
              </div>
              <div className="relative">
                <Image src={ip} alt="image" />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                  <div className="flex flex-col gap-5 items-center glass p-7 pt-[1em]">
                    <p className="text-white font-bold text-2xl">
                      Design Details
                    </p>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={handleNameChange}
                      className="border p-2 mb-2 rounded-full px-7"
                    />
                    {nameError && <p className="text-red-500">{nameError}</p>}

                    <input
                      placeholder="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border p-2 mb-2 rounded-[30px] px-7"
                    />
                    {descriptionError && (
                      <p className="text-red-500">{descriptionError}</p>
                    )}

                    <button
                      // onClick={handleSubmit}
                      className="bg-blue-500 text-white font-bold text-xl p-3 px-6 rounded-full hover:bg-transparent hover:border-5 hover:border-blue-400 transitions-all duration-100 "
                    >
                      Create Design
                    </button>
                  </div>
                </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Editor;
