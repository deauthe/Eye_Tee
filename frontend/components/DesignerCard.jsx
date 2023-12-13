import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { PiHoodieBold } from "react-icons/pi";
import { CiMug1 } from "react-icons/ci";
import { IoShirtOutline } from "react-icons/io5";
import { MdMapsUgc } from "react-icons/md";
import { FaMugHot } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const DesignerCard = (props) => {
  console.log(props);
  const [imgSrc, setImgSrc] = useState("/shirt.png");
  const [fade, setFade] = useState(false);

  const handleButtonClick = (newSrc) => {
    setFade(true);
    setTimeout(() => {
      setImgSrc(newSrc);
      setFade(false);
    }, 500); // Adjust the timeout duration to match your transition duration
  };

  const handleRoute=()=>{
console.log("hello");
  }
  return (
    <div>
      <div className="relative">
        <div className="absolute right-4 top-3 ">
          <div className="flex flex-col gap-3">
            <span className="text-xl p-1.5 rounded-full shadowbg-blue-400 transition-all  bg-blue-400 duration-200">
              {" "}
              <FiShare2 />
            </span>

            <span className="text-xl p-1.5 rounded-full shadow bg-red-400 transition-all duration-200">
              {" "}
              <AiOutlineHeart />
            </span>

            <button onClick={()=>handleButtonClick('/shirt.png')} className="text-xl p-1.5 rounded-full shadow bg-red-400 transition-all duration-200">
              {" "}
              <AiOutlineHeart />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`transition-opacity ${
          fade ? "opacity-0 duration-100 ease-in-out" : "opacity-100"
        }`}
      >
        <Image
          width={500}
          height={500}
          src={imgSrc}
          alt="shirt"
          className="object-cover"
        />
      </div>
      {/* <div className="h-[1px] mx-9 bg-zinc-300"></div> */}
      <div className=" text-black/[0.9] flex justify-center gap-4 ">
        <button
          onClick={() => handleButtonClick("/art.png")}
          className="text-3xl border-1 border-zinc-300 p-2 rounded-md hover:bg-zinc-200 transition-all duration-500"
        >
          {" "}
          <PiHoodieBold />
        </button>
        <button
          onClick={() => handleButtonClick("/art.png")}
          className="text-3xl border-1 border-zinc-300 p-2 rounded-md hover:bg-zinc-200 transition-all duration-500"
        >
          {" "}
          <IoShirtOutline />
        </button>
        <button
          onClick={() => handleButtonClick("/art.png")}
          className="text-3xl border-1 border-zinc-300 p-2 rounded-md hover:bg-zinc-200 transition-all duration-500"
        >
          {" "}
          <FaMugHot />
        </button>
        <Link href={`http://localhost:3000/design/${props.cardNo}`}>
        <button
         
          className="text-3xl border-1 border-zinc-300 p-2 rounded-md hover:bg-zinc-200 transition-all duration-500"
        >
          {" "}
          <IoIosMore />{" "}
        </button>
        </Link>
      </div>

      <div className="flex justify-center p-3">
        <button onClick={handleRoute} className="p-1.5 px-4 border-black border-2 hover:bg-black hover:text-white transition-all duration-500 rounded-full">
          Create Product
        </button>
      </div>
    </div>
  );
};

export default DesignerCard;
