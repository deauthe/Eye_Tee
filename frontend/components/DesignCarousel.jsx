import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import DesignerCard from "./DesignerCard";
import { getAllDesigns } from "@/pages/api/designerApi";

const DesignCarousel = () => {
	const [designData, setProductData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const data = await getAllDesigns();
				console.log("designData = ", data);
				setProductData(data.designs);
			} catch (error) {
				// Handle error
				console.error("Error fetching su images:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
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
		<div className=" ">
			<Carousel
				responsive={responsive}
				containerClass="-mx-[10px]"
				itemClass="px-[10px]"
			>
				{designData.map((product, index) => (
					<div>
						<DesignerCard
							key={index}
							cardNo={index}
							photo={product.designImages[0].url}
							description={product.description}
						/>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default DesignCarousel;
