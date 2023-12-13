import DesignPattern from "@/components/DesignPattern";
import Wrapper from "@/components/Wrapper";
import React from "react";
import Image from "next/image";
import profile from "../../public/lady.jpg";
import NextModel from "@/components/NextModel";
import { BsPiggyBank } from "react-icons/bs";
import wish from "../../public/wish.png";
import art from "../../public/art.png";
import EditProfile from "@/components/EditProfile";
import banerImage from "../../public/banner.webp";
import DropzoneComponent from "@/components/Dropzone";
import DesignCarousel from "@/components/DesignCarousel";
import Design from "../../public/design.png";
import hoodie from "../../public/C_hoodie.png";
import shirt from "../../public/C_shirt.png";
import mug from "../../public/C_mug.png";
import CreateProduct from "@/components/CreateProduct";
const UserProfile = () => {
  return (
    <Wrapper>
      <div className="bg-[#f7d59c] h-[11em] relative mb-[60px]">
        <div className="  h-[11em] overflow-hidden relative">
          <Image
            src={banerImage}
            alt="Banner"
            className="w-full h-full object-cover -z-10"
          ></Image>

        </div>
        <div className="overflow-hidden rounded-full inline-block absolute bottom-[-40px] left-[20px]">
          <Image src={profile} alt="profile" width={170} height={170} />
        </div>
        <div>
          <button className=" text-white font-[500] flex items-center justify-center gap-1 rounded-full  absolute right-[200px] bottom-[-15px]">
            <CreateProduct />
          </button>
        </div>

        <div className="text-white font-[500] flex items-center justify-center gap-1 bg-blue-400 rounded-full p-1 px-3 absolute right-[40px] bottom-[-15px]">
         <EditProfile/>
        </div>
        <div className="absolute left-[200px] top-[70px] text-[#ebd9bb]">
          <h3 className="font-[600] text-3xl"> Samanvay Arya</h3>

          <div className="flex gap-4">
            <p>
              <span className="mr-2 font-[700]">300</span>Followers
            </p>
            <p>
              <span className="mr-2 font-[700]">300</span>Following
            </p>
          </div>
          <p>@asamanvay</p>
        </div>
      </div>
      <div>
        <DropzoneComponent />
      </div>
      {/* <div className="flex  gap-4 mb-4 ">
        {[0, 1, 2, 4].map((e) => (
          <div className="design cursor-pointer border-2 border-black shadow-md rounded-lg ">
            <Image src={Design} alt="" width={200} />
          </div>
        ))}
      </div> */}
      <div>
        <div className="text-[28px] md:text-[34px] my-4  font-semibold leading-tight">
          Your Designs
        </div>

        <div>
          <DesignCarousel />
        </div>
      </div>

      <div className="bg-white rounded-md flex mb-6  ">
        {/* <div className=" border-gray-300 border-dashed border-2 rounded-md m-5">
        <Image src={Design} alt="design" width={270} />
          
        </div> */}
      </div>
    </Wrapper>
  );
};

export default UserProfile;
