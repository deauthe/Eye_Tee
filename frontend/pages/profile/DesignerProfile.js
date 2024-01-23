import DesignPattern from "@/components/DesignPattern";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import Image from "next/image";
import profile from "../../public/profileImage.png";
import NextModel from "@/components/NextModel";
import { BsPiggyBank } from "react-icons/bs";
import wish from "../../public/wish.png";
import art from "../../public/art.png";
import EditProfile from "@/components/EditProfile";
import banerImage from "../../public/coverImage.png";
import DropzoneComponent from "@/components/Dropzone";
import DesignCarousel from "@/components/DesignCarousel";
import Design from "../../public/design.png";
import hoodie from "../../public/C_hoodie.png";
import shirt from "../../public/C_shirt.png";
import mug from "../../public/C_mug.png";
import CreateProduct from "@/components/CreateProduct";
import Products from "../../utils/Products.json";
import ProductCard from "@/components/ProductCard";
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

const UserProfile = () => {
	const [selectedItem, setSelectedItem] = useState("all");
	const [filteredProducts, setFilteredProducts] = useState(Products);

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
		<Wrapper>
			<div className="bg-[#f7d59c] h-[11em] relative mb-[60px] mt-2">
				<div className="  h-[11em] overflow-hidden relative rounded-md">
					<Image
						src={banerImage}
						alt="Banner"
						className="w-full h-full object-cover -z-10"
					></Image>
				</div>
				<div className="overflow-hidden rounded-md  inline-block absolute bottom-[-40px] left-[20px]">
					<Image src={profile} alt="profile" width={170} height={170} />
				</div>
				<div>
					<div className=" text-white font-[500] flex items-center justify-center gap-1 rounded-full  absolute right-[200px] bottom-[-15px]">
						<CreateProduct />
					</div>
				</div>

				<div className="text-white font-[500] flex items-center justify-center gap-1 bg-blue-400 rounded-full p-1 px-3 absolute right-[40px] bottom-[-15px]">
					<EditProfile />
				</div>
				<div className="absolute left-[675px] top-[70px] text-[#555555] bg-[#eee2dcf1] p-2 rounded-lg  shadow-lg z-10 border-[#a1a1a1] border-1 ">
					<h3 className="font-[600] text-3xl uppercase"> Samanvay Arya</h3>
					<div className="border-t-1  border-[#c1bcb6] my-1"></div>
					<div className="flex flex-col">
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
				<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
					Your Designs
				</div>

				<div className="w-3/4 mx-auto border-[#c1bcb6] border-1 pt-10 px-20 pb-0 border-b-0 drop-shadow-2xl shadow-[0px_-35px_25px_-30px_rgba(0,0,0,0.3)] rounded-lg">
					<DesignCarousel />
				</div>
			</div>

			<p className=" flex gap-3  justify-center   text-4xl text-[#595957] ">
				Your Products
			</p>
			<div className="border-t-1  border-[#c1bcb6] my-2"></div>
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
					<ProductCard key={index} product={e} product_photo="/C_hoodie.png" />
				))}
			</div>
		</Wrapper>
	);
};

export default UserProfile;
