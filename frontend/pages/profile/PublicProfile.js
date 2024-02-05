import Wrapper from "@/components/Wrapper";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../public/lady.jpg";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DesignerCards from "@/components/DesignerCards";
import NextModel from "@/components/NextModel";
import ShareButton from "@/components/utils/ShareButton";
import DesignCarousel from "@/components/DesignCarousel";
import bannerImage from "../../public/coverImage.png";

import { useRouter } from "next/router";
import { getDesignerPublicProfile } from "../api/designerApi";

const PublicProfile = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [designerData, setDesignerData] = useState();
	const [analytics, setAnalytics] = useState([]);
	const [profileImage, setProfileImage] = useState({ profile });
	const [coverImage, setCoverImage] = useState(bannerImage);
	const parentRef = useRef(null);

	const updateCoverParentWidth = () => {
		const parentWidth = parentRef.current.clientWidth * 1.25;
		// Set the width of the image to the parent width
		setImageWidth(parentWidth);
	};
	const [imageWidth, setImageWidth] = useState(0);

	const { query } = router;
	const id = query.designer_id;
	let designerId = id;
	if (!designerId) designerId = "656f24446f2ab5347da947bd";

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
		const fetchData = async () => {
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

		fetchData();
	}, []);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1023, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 767, min: 0 },
			items: 1,
		},
	};

	return (
		<Wrapper>
			<div
				ref={parentRef}
				className="h-[15em] overflow-hidden relative rounded-md w-full border-2 border-black"
			>
				<Image
					src={coverImage}
					alt="Banner"
					className="w-full h-full object-cover -z-10"
					width={imageWidth}
					height={"300"}
				></Image>
			</div>
			<div className="overflow-hidden rounded-full inline-block absolute top-[100px] left-[200px]">
				<Image src={profileImage} alt="profile" width={170} height={170} />
			</div>
			<div className="absolute right-[300px] top-[210px] flex flex-row gap-5">
				<button className="bg-black hover:bg-black hover:text-white transition-all duration-300 px-5 py-2 rounded-full  text-white">
					Follow <span>+</span>
				</button>
				<div>
					<NextModel />
				</div>
				<div className="text-2xl">
					<ShareButton />
				</div>
			</div>

			<div className="absolute left-[400px] top-[100px] bg-white/[0.8] p-5">
				<h3 className="font-[600] text-3xl"> Samanvay Arya</h3>
				<p>@asamanvay</p>
				<div className="flex gap-4">
					<p>
						<span className="mr-2 font-[700]">300</span>Followers
					</p>
					<p>
						<span className="mr-2 font-[700]">300</span>Following
					</p>
				</div>
			</div>

			{/* <h2 className="text-3xl font-[700] mt-9">About </h2> */}

			{/* <div className=" bg-white/80 p-2 my-4  shadow rounded-md">
        <p>
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div> */}

			{/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5 md:px-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
        ))}
      </div> */}

			<div className=" mb-[1.4em] flex gap-3  justify-center uppercase text-2xl text-[#595957] mt-10">
				{"{name}"}'s Designs
			</div>
			<div className="w-3/4 mx-auto mt-10 mb-14 border-[#c1bcb6] border-1 pt-10 px-20 pb-0 border-b-0 drop-shadow-lg shadow-[0px_-35px_25px_-40px_rgba(0,0,0,0.3)] rounded-lg">
				<DesignCarousel designerId={designerId} />
			</div>

			<hr className="text-black mb-5" />
			<div className=" mb-[1.4em] flex gap-3  justify-center uppercase text-2xl text-[#595957] ">
				other designers
			</div>

			<div className=" mt-4  mb-[100px] md:mb-0">
				<Carousel
					responsive={responsive}
					containerClass="-mx-[10px]"
					itemClass="px-[10px]"
				>
					{[0, 1, 2, 3, 4, 5, 6].map((product, index) => (
						<DesignerCards key={index} />
					))}
				</Carousel>
			</div>

			<hr className="text-black mb-5" />

			<div className=" mb-[1.4em] flex gap-3  justify-center uppercase text-2xl text-[#595957] ">
				other products
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
					<ProductCard key={index} />
				))}
			</div>
		</Wrapper>
	);
};

export default PublicProfile;
