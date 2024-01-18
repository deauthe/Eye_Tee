import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const categoryImages = {
	Hoodie: "/hoodie_category.png",
	Tshirt: "/t_shirt.png",
	Mugs: "/C_mug.png",
	"T-Shirts": "/C_shirt.png",
	"Z-Shirts": "/C_shirt.png",
	"Z-Hoodies": "/hoodie_category.png",
	Stickers: "/t_shirt.png",
	Bottles: "/C_mug.png",
	"Phone Covers": "/C_shirt.png",
	"Tote Bags": "/C_mug.png",

	// Add other categories and their images as needed
};

const CategoryCard = (props) => {
	const router = useRouter();

	const handleCategoryClick = (category) => {
		// Get the existing query parameters
		const existingQuery = { ...router.query };

		// Add or update the 'category' parameter
		existingQuery.category = category;

		// Use the router to replace the URL with the updated query parameters
		router.replace({
			pathname: router.pathname,
			query: existingQuery,
		});
	};

	return (
		<div
			className={`border-5 border-white rounded-[50px] w-[180px] h-[200px] bg-${props.color}-400 flex flex-col gap-3 justify-center items-center shadow-md cursor-pointer`}
			onClick={() => {
				handleCategoryClick(props.category);
			}}
		>
			<p className="text-2xl font-bold text-white">{props.name}</p>
			<Image
				src={categoryImages[props.category]}
				alt="none"
				width={95}
				height={95}
			/>
			{`${[props.category]}`}
		</div>
	);
};

export default CategoryCard;
