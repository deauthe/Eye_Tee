import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const categoriesData = [
	{ item: "Hoodie", color: "red" },
	{ item: "T-Shirts", color: "blue" },
	{ item: "Z-Hoodies", color: "red" },
	{ item: "Mugs", color: "purple" },
	];

const PrevArrow = (props) => {
	const [isClicked, setIsClicked] = useState(false);
	const { onClick } = props;
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
	const { onClick } = props;

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

const CategorySection = () => {
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
	};

	return (
		<>
			<div className="flex justify-center gap-3 m-0 text-start border text-[28px] md:text-[34px] mb-1  leading-tight">
				{/* <div className="bg-black w-2 h-full">.</div> */}
				<div>
					<p className="text-4xl text-[#595957]">Unleash The Unique Style Categories</p>
				</div>
			</div>

			<div className=" flex  flex-wrap gap-[40px] mt-[60px] justify-center ">
				{/* <Slider {...settings}> */}
					{categoriesData.map((category, index) => (
						<div key={index} className="mt-[30px]">
							<CategoryCard
								key={index}
								name={category.item}
								color={category.color}
								category={category.item}
							/>
						</div>
					))}
				{/* </Slider> */}
			</div>
		</>
	);
};

export default CategorySection;
