import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getAllDesigns, getArtistsDesigns } from "@/pages/api/designerApi";

const DesignCarousel = ({ designerId }) => {
	const [designData, setProductData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				let data;
				if (designerId) {
					console.log("id exists as", designerId);

					data = await getArtistsDesigns(designerId);
				} else {
					data = await getAllDesigns();
				}
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

	return <div className=" "></div>;
};

export default DesignCarousel;
