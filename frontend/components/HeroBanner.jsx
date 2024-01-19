import React, { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import Slider from "react-slick";

const CustomArrow = ({ onClick, icon: Icon, direction }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // Adjust the timeout duration based on your preference
    onClick();
  };

  return (
    <div
      className={`custom-arrow ${direction} ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <Icon />
    </div>
  );
};

const HeroBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomArrow onClick={() => {}} icon={GoArrowLeft} direction="prev" />
    ),
    nextArrow: (
      <CustomArrow onClick={() => {}} icon={GoArrowRight} direction="next" />
    ),
  };

  return (
    <div className="m-auto relative">
      <div className="flex justify-center mt-6 flex-col text-center gap-3 ">
        <p className="text-6xl font-bold">Design it, Wear it, Love it</p>
        <p className="text-3xl text-[#595957]">Your Signature Style Awaits</p>
      </div>

      <div className="absolute left-[50px]">
        <Image src="/sparkle_img.png" alt="sparkle_img.png" width={80} height={80} />
      </div>

      <div className="flex justify-center mt-3  ">
        <button className="flex items-center gap-2 border border-[#c1bcb6] p-2 rounded-full pl-5 pr-4 text-[#70706f] hover:bg-black/10 trasitions-all duration-300 hover:gap-3 ">
          Explore
          <span className="text-xl ">
            <GoArrowRight />
          </span>
        </button>
      </div>

      <div className="absolute right-[40px] bottom-[-80px]">
        <Image src="/sparkle_img.png" alt="sparkle_img.png" width={80} height={80} />
      </div>

      <div className="mt-[20px] mx-[10%] ">
        <Slider {...settings} className="">
          <div className="">
            <Image src="/banner_image.png" width="700" height="200" />
          </div>
          <div>
            <Image src="/banner_image.png" width="700" height="200" />
          </div>
          <div>
            <Image src="/banner_image.png" width="700" height="200" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HeroBanner;
