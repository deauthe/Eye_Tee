import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getProductImages } from "@/pages/api/productApis";

const ExploreSection = () => {
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const data = await getProductImages({});
				console.log("productData = ", data);
				setProductData(data);
			} catch (error) {
				// Handle error
				console.error("Error fetching super images:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
	}, []);
	return (
		<>
			<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
				Explore the latest Products
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
				{productData.map((product, index) => (
					<ProductCard key={index} product_photo={product.imageUrls[0]} />
				))}
				{/* {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
					<ProductCard key={index} />
				))} */}
			</div>
		</>
	);
};

export default ExploreSection;
