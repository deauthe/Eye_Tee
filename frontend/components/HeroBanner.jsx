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
		// prevArrow: (
		//   <CustomArrow onClick={() => {}} icon={GoArrowLeft} direction="prev" />
		// ),
		// nextArrow: (
		//   <CustomArrow onClick={() => {}} icon={GoArrowRight} direction="next" />
		// ),
	};

	return (
		<div className="m-auto relative">
			<div className="flex justify-center mt-6 flex-col text-center gap-3 ">
				<p className="text-7xl font-bold">Design it, Wear it, Love it</p>
				<p className="text-3xl mt-3 text-[#595957]">
					Your Signature Style Awaits
				</p>
			</div>

			<div className="absolute left-[50px] lg:left-[15%]">
				<Image
					src="/sparkle_img.png"
					alt="sparkle_img.png"
					width={100}
					height={80}
				/>
			</div>

			{/* <div className="absolute -left-9 ">
        <Image src="/blob_pattern_1.png" alt="blob_pattern" width={400} height={400} />
      </div> */}

			<div className="flex justify-center mt-3  ">
				<button className="flex items-center gap-2 border border-[#c1bcb6] p-3 rounded-full pl-6 pr-4 text-[#70706f] hover:bg-black/10 trasitions-all duration-300 hover:gap-3 ">
					Explore
					<span className="text-3xl ">
						<GoArrowRight />
					</span>
				</button>
			</div>

			{/* <div className="blob_1 w-6 h-5 absolute ">.</div> */}

			<div className="absolute right-[40px] bottom-[-80px] lg:right-[15%]">
				<Image
					src="/sparkle_img.png"
					alt="sparkle_img.png"
					width={80}
					height={80}
				/>
			</div>

			<div className="mt-[20px] mx-[10%] lg:mx-[30%] ">
				<Slider {...settings} className="">
					<div className="">
						<Image src="/banner_image.png" width="800" height="300" />
					</div>
					<div>
						<Image src="/banner_image.png" width="800" height="300" />
					</div>
					<div>
						<Image src="/banner_image.png" width="00" height="300" />
					</div>
				</Slider>
			</div>
		</div>
	);
};

export default HeroBanner;
