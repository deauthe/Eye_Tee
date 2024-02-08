import Wrapper from "@/components/Wrapper";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import profile from "../../public/profileImage.png";
import EditProfile from "@/components/EditProfile";
import bannerImage from "../../public/coverImage.png";
import DesignCarousel from "@/components/DesignCarousel";
import CreateProduct from "@/components/CreateProduct";
import Products from "../../utils/Products.json";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { MdPerson3 } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import {
	getDesignerMadeFinalProducts,
	getDesignerPersonalData,
	getDesignerPublicProfile,
} from "../api/designerApi";
import ShareButton from "@/components/utils/ShareButton";
import useDesignerProducts from "@/components/utils/useDesignerProducts";
import ModelWindow from "@/components/modelWindow";

const ArtistInfoCard = ({ designerId }) => {
	const [name, setName] = useState("eye eye tee user");
	const [followerData, setFollowerData] = useState({
		followers: 0,
		following: 0,
	});
	const [socialMediaLinks, setSocialMediaLinks] = useState([]);

	useEffect(() => {
		const fetchArtistInfo = async () => {
			try {
				let data;
				let publicData;
				if (designerId) {
					data = await getDesignerPersonalData(designerId);
					publicData = await getDesignerPublicProfile(designerId);
					console.log("designerData = ", data, publicData);
					if (data) {
						setName(data.fullname);
						if (data.socialMedia) {
							setSocialMediaLinks(data.socialMedia);
						}
					}
					if (publicData) {
						setFollowerData({
							following: publicData.followers
								? length(publicData.following)
								: 0,
							followers: publicData.followers
								? length(publicData.followers)
								: 0,
						});
					}
				}
			} catch (error) {
				console.error("Error fetching designer Data, please check Id:", error);
			}
		};
		fetchArtistInfo();
	}, []);
	return (
		<>
			<h3 className="font-[600] text-3xl uppercase text-center text-black">
				{" "}
				{name}
			</h3>
			<div className="border-t-1  border-[#918b85] my-1"></div>
			<div className="flex flex-col mx-auto text-center">
				<span className="mr-2 text-lg flex flex-row justify-center gap-5 text-black font-mono font-semibold ">
					{followerData.followers} Followers <MdPerson3 />
				</span>
				<span className="mr-2 text-lg font-mono font-semibold flex flex-row justify-center gap-5">
					{followerData.following} Following <RiUserFollowLine />
				</span>
				{socialMediaLinks[0] ? (
					<button className="rounded-md w-1/2 text-center border-2 border-black/[0.7] mx-auto text-clip mt-4 bg-gradient-instagram-link opacity-90">
						<p className="w-full overflow-hidden overflow-ellipsis text-black/[0.9] py-1 opacity-90 text-sm">
							{socialMediaLinks[0] ? socialMedia[0] : 0}
						</p>
					</button>
				) : null}
			</div>
		</>
	);
};

const UserProfile = () => {
	const router = useRouter();

	// Access query parameters
	const { query } = router;
	const id = query.designer_id;
	let designerId = id;
	if (!designerId) designerId = "651515097dfd1f7338a6b04b"; //TODO:remove static data

	const [products, loadingproducts] = useDesignerProducts(designerId);
	const [selectedItem, setSelectedItem] = useState("all");
	const [filteredProducts, setFilteredProducts] = useState(products);
	console.log("filtered products", filteredProducts);
	const [loading, setLoading] = useState(true);
	const [designerData, setDesignerData] = useState();
	const [analytics, setAnalytics] = useState([]);
	const [profileImage, setProfileImage] = useState({ profile });
	const [coverImage, setCoverImage] = useState(bannerImage);
	const parentRef = useRef(null);

	useEffect(() => {
		setFilteredProducts(products);
	}, [products]);

	// Function to update the image width based on the parent width
	const updateCoverParentWidth = () => {
		const parentWidth = parentRef.current.clientWidth;
		// Set the width of the image to the parent width
		setImageWidth(parentWidth);
	};

	// State to store the image width
	const [imageWidth, setImageWidth] = useState(0);

	useEffect(() => {
		updateCoverParentWidth();

		// Event listener for parent element resize
		window.addEventListener("resize", updateCoverParentWidth);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", updateCoverParentWidth);
		};
	}, []);

	useEffect(() => {
		const fetchDesignerData = async () => {
			try {
				let data;
				if (designerId) {
					data = await getDesignerPublicProfile(designerId);
					console.log("profile Image: ", data.profileImage);
					if (data.profileImage) setProfileImage(data.profileImage);
					if (data.coverImage) setCoverImage(data.coverImage);
				}
			} catch (error) {
				console.error("Error fetching designer Data, please check Id:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDesignerData();
	}, []);

	const handleItemChange = (event) => {
		const selectedCategory = event.target.value;
		setSelectedItem(selectedCategory);
		console.log("current products:", products);

		if (selectedCategory === "all") {
			setFilteredProducts(products);
			console.log("current products:", products);
		} else {
			const filteredItems = products.filter(
				(product) => product.category.toLowerCase() === selectedCategory
			);
			setFilteredProducts(filteredItems);
		}
	};

	console.log("designerID:", designerId);
	return (
		<Wrapper>
			<div className="bg-[#f7d59c] h-[11em] relative mb-[60px] mt-2">
				<div
					ref={parentRef}
					className="h-[11em] overflow-hidden relative rounded-md"
				>
					<Image
						src={coverImage}
						alt="Banner"
						className="w-full h-full object-cover -z-10"
						width={imageWidth}
						height={"200"}
					></Image>
				</div>
				<div className="overflow-hidden rounded-md  inline-block absolute bottom-[-40px] left-[20px]">
					<Image src={profileImage} alt="profile" width={170} height={170} />
				</div>
				<div>
					<div className=" text-white font-[500] flex items-center justify-center gap-1 rounded-full  absolute right-[250px] bottom-[-15px]">
						<CreateProduct />
					</div>
					{/* <div className=" text-white font-[500] flex items-center justify-center gap-1 rounded-full  absolute right-[410px] bottom-[-15px] shadow-sm">
						<ShareButton />
					</div> */}
					<div className=" text-white font-[500] flex items-center justify-center gap-1 rounded-full  absolute right-[610px] bottom-[-15px]">
						<Link href="localhost:3000/profile/DesignerProfile">dashboard</Link>
					</div>
				</div>

				<div className="text-white font-[500] flex items-center justify-center gap-1 bg-blue-400 rounded-full py-2 p-1 px-3 absolute right-[40px] bottom-[-15px]">
					<EditProfile />
				</div>
				<div className="absolute left-[200px] top-[80px] text-black bg-white/[0.8] p-2 rounded-lg  shadow-lg z-10 border-black/[0.5] border-1 w-80 ">
					<ArtistInfoCard designerId={designerId} />
				</div>
			</div>

			<div>
				<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
					Your Designs
				</div>

				<div className="w-3/4 mx-auto mt-10 mb-14 border-[#c1bcb6] border-1 pt-10 px-20 pb-0 border-b-0  rounded-lg md:w-[97%]">
					<DesignCarousel designerId={designerId} />
				</div>
			</div>

			<p className=" flex gap-3  justify-center   text-4xl text-[#595957] ">
				Your Products
			</p>
			<div className="border-t-1  border-[#c1bcb6] my-2"></div>
			<div className="flex flex-row justify-end">
				<div className="">
					<label htmlFor="itemDropdown">Select an item:</label>
					<select
						id="itemDropdown"
						value={selectedItem}
						onChange={handleItemChange}
						className="p-2 text-xl bg-transparent border-1 text-[#504d4a] border-[#c1bcb6] rounded-xl"
					>
						<option value="all">All</option>
						{!products ? (
							<div>loading</div>
						) : (
							products.map((item, index) => (
								<option
									key={index}
									value={item.category.toLowerCase().replace(" ", "")}
								>
									{item.category}
								</option>
							))
						)}
					</select>
				</div>
			</div>

<<<<<<< HEAD
		

			{/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
=======
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
>>>>>>> refs/remotes/origin/main
				{filteredProducts.map((e, index) => (
					// <ProductCard key={index} product={e} product_photo="/C_hoodie.png" />
				))}
				{console.log("inside component", filteredProducts)}
			</div> */}
		</Wrapper>
	);
};

export default UserProfile;
