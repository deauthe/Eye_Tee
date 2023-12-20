import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ImageOverlay from "./Editor/image";


const PrevArrow = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const {onClick} = props;
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // Adjust the timeout duration based on your preference
    onClick();
  };

  return (
    <div
      className={`absolute right-[70px] -top-[50px] ${
        isClicked ? "scale-90" : ""
      }`}
      onClick={handleClick}
    >
      <div className="border-2 border-white rounded-full shadow-md text-2xl h-[50px] w-[50px] grid place-items-center cursor-pointer focus:scale-75">
        <FaArrowLeft />
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const {onClick}= props;

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // Adjust the timeout duration based on your preference
    onClick();
  };

  return (
    <div
      className={`absolute right-[5px] -top-[50px] ${
        isClicked ? "scale-90" : ""
      }`}
      onClick={handleClick}
    >
      <div className="border-2 border-white rounded-full shadow-md text-2xl h-[50px] w-[50px] grid place-items-center cursor-pointer">
        <FaArrowRight />
      </div>
    </div>
  );
};

const ProductDesignSectioin = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }    

  return (
    <>
      <div className="flex gap-3 m-0 text-start border text-[28px] md:text-[34px] mb-1 font-semibold leading-tight">
        <div className="bg-black w-2 h-full">.</div>
        <div>
          <p>Unleash The Unique Style Categories</p>
        </div>
      </div>

      <div className="relative">
        <Slider {...settings}>
        {[0, 1, 2].map((e, index) => (
                  <div className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-[30px] inline-block w-[230px] p-5 bg-red-300 border-3 border-zinc-600">
                    <ImageOverlay
                      mainImage="/t_shirt2.png"
                      overlayImage={userDesign || "/logo_e.png"}
                      overlayPosition="10,20"
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductDesignSectioin;
