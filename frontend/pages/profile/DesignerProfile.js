import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../public/profileImage.png";
import EditProfile from "@/components/EditProfile";
import banerImage from "../../public/coverImage.png";
import DesignCarousel from "@/components/DesignCarousel";
import CreateProduct from "@/components/CreateProduct";
import Products from "../../utils/Products.json";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { MdPerson3 } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { getDesignerPublicProfile } from "../api/designerApi";
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

const ArtistInfoCard = () => {
	return (
		<>
			<h3 className="font-[600] text-3xl uppercase text-black">
				{" "}
				Samanvay Arya
			</h3>
			<div className="border-t-1  border-[#918b85] my-1"></div>
			<div className="flex flex-col mx-auto text-center">
				<span className="mr-2 text-md flex flex-row justify-center gap-5 text-black font-mono font-semibold ">
					300 Followers <MdPerson3 />
				</span>
				<span className="mr-2 text-md font-mono font-semibold flex flex-row justify-center gap-5">
					300 Following <RiUserFollowLine />
				</span>
				<button className="rounded-md w-1/2 text-center border-2 border-black/[0.7] mx-auto text-clip mt-4 bg-gradient-instagram-link opacity-90">
					<p className="w-full overflow-hidden overflow-ellipsis text-black/[0.9] py-1 opacity-90 text-sm">
						@Samanvay
					</p>
				</button>
			</div>
		</>
	);
};

const UserProfile = () => {
	const [selectedItem, setSelectedItem] = useState("all");
	const [filteredProducts, setFilteredProducts] = useState(Products);
	const [loading, setLoading] = useState(true);
	const [analytics, setAnalytics] = useState([]);
	const [profileImage, setProfileImage] = useState({ profile });
	const router = useRouter();

	// Access query parameters
	const { query } = router;
	const id = query.designer_id;
	const designerId = id;

	useEffect(() => {
		const fetchImages = async () => {
			try {
				let data;
				if (designerId) {
					data = await getDesignerPublicProfile(designerId);
				} else {
				}
			} catch (error) {
				// Handle error
				console.error("Error fetching su images:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
	}, []);

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
				<div className="absolute left-[200px] top-[80px] text-black bg-white/[0.8] p-2 rounded-lg  shadow-lg z-10 border-black/[0.5] border-1 ">
					<ArtistInfoCard />
				</div>
			</div>

			<div>
				<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
					Your Designs
				</div>

				<div className="w-3/4 mx-auto border-[#c1bcb6] border-1 pt-10 px-20 pb-0 border-b-0 drop-shadow-2xl shadow-[0px_-35px_25px_-30px_rgba(0,0,0,0.3)] rounded-lg">
					<DesignCarousel designerId={designerId} />
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
