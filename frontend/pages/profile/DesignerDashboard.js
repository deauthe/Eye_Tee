import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import Image from "next/image";
import profile from "../../public/profileImage.png";
import EditProfile from "@/components/EditProfile";
import banerImage from "../../public/coverImage.png";
import DesignCarousel from "@/components/DesignCarousel";
import CreateProduct from "@/components/CreateProduct";
import products from "../../utils/Products.json";
import ProductCard from "@/components/ProductCard";
import LineChart from "@/components/utils/LineChart";
import BarChart from "@/components/utils/BarCharts";
const items = [
	{ item: "Hoodie", color: "red" },
	{ item: "T-Shirts", color: "blue" },
	{ item: "Z-Hoodies", color: "red" },
	{ item: "Mugs", color: "purple" },
	{ item: "Z-Shirts", color: "blue" },
	{ item: "Bottles", color: "" },
	{ item: "Stickers", color: "" },
	{ item: "Tote Bags", color: "" },
	{ item: "Phone Covers", color: "" },
];

const Analytics = () => {
	const lineChartData = [
		{ name: "Jan", value: 30 },
		{ name: "Feb", value: 50 },
		{ name: "Mar", value: 70 },
		// Add more data as needed
	];
	const barChartData = [
		{ name: "Hoodies", value: 20 },
		{ name: "Shirts", value: 40 },
		{ name: "Tshirts", value: 60 },
		// Add more data as needed
	];
	return (
		<div className="grid grid-cols-4 gap-10">
			<div className="">
				<LineChart data={lineChartData} />
			</div>
			<div className="">
				<BarChart data={barChartData} />
			</div>
		</div>
	);
};

const Products = () => {
	const [selectedItem, setSelectedItem] = useState("all");
	const [filteredProducts, setFilteredProducts] = useState(products);
	const handleItemChange = (event) => {
		const selectedCategory = event.target.value;
		setSelectedItem(selectedCategory);

		if (selectedCategory === "all") {
			setFilteredProducts(Products);
		} else {
			const filteredItems = Products.filter(
				(product) => product.category.toLowerCase() === selectedCategory
			);
			setFilteredProducts(filteredItems);
		}
	};

	return (
		<div>
			<div className="flex flex-row justify-end">
				<div className="">
					{/* <label htmlFor="itemDropdown">Select an item:</label> */}
					<select
						id="itemDropdown"
						value={selectedItem}
						onChange={handleItemChange}
						className="p-2 text-xl bg-transparent border-1 text-[#504d4a] border-[#c1bcb6] rounded-xl"
					>
						<option value="all">All</option>
						{items.map((item, index) => (
							<option
								key={index}
								value={item.item.toLowerCase().replace(" ", "")}
							>
								{item.item}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
				{filteredProducts.map((e, index) => (
					<ProductCard
						card_type="dashboard"
						key={index}
						product={e}
						product_photo="/C_hoodie.png"
					/>
				))}
			</div>
		</div>
	);
};

const DesignerDashboard = () => {
	return (
		<Wrapper>
			<div className="grid grid-cols-2 gap-10  my-5">
				<div className="artist_photo h-48 ">
					<div className="border-2  w-48 h-48 object-cover mx-auto">
						<Image src={profile} alt="haha" className="object-cover ml-auto" />
					</div>
				</div>
				<div className="artist_info grid grid-rows-3 h-48 font-extrabold text-2xl gap-10">
					<div className="flex flex-col ">
						<div className="uppercase">total sales</div>
						<div className="text-xl">$400</div>
					</div>
					<div className="flex flex-col">
						<div className="uppercase">revenue</div>
						<div className="text-xl">$250</div>
					</div>
					<div className="flex flex-col">
						<div className="uppercase">artist cut</div>
						<div className="text-xl">$100</div>
					</div>
				</div>
			</div>
			<div className="mx-10 mt-32 mb-10">
				<Analytics />
			</div>

			<div className="mx-10 my-10">
				<Products />
			</div>
		</Wrapper>
	);
};

export default DesignerDashboard;
