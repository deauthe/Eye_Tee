import React, { useEffect, useState } from "react";
import { PiHoodieBold } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { FaMugHot } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import useProductByDesign from "@/components/utils/useProductByDesign";
import { useRouter } from "next/router";

const Domain_url = process.env.Domain_url || "localhost:3000";

const DesignProducts = () => {
	const router = useRouter();

	const designId = "65be8c7ffa296f5cbb4d3335";
	const [designData, loading] = useProductByDesign(designId);

	const [designName, setDesignName] = useState("Kreechar");

	useState(() => {
		console.log(designData);
	}, [designData]);

	const getDesignName = async (designId) => {};

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<Wrapper>
			<div className="mx-auto w-fit mt-20 mb-16">
				{"all products for $(design name)"}
				<div className="mx-auto my-4 px-3 py-3 bg-white/[0.6] shadow-md rounded-md">
					<Image src={designData.designUrl} height={250} width={250} />
				</div>
			</div>
			<div className="mx-auto grid grid-cols-4 gap-10 h-96 my-5 ">
				{designData?.products.map((e) => {
					return (
						<ProductCardLocal
							design_name={designName}
							product_category={e.category}
							imageUrl={e.prodImages[0].url}
						/>
					);
				})}
			</div>
		</Wrapper>
	);
};

const ProductCardLocal = ({ design_name, product_category, imageUrl }) => {
	return (
		<Link
			href="/productDetails"
			className="transform overflow-hidden bg-white/[0.5] rounded-md shadow-md"
		>
			<div className="h-[250px] w-[200px] mx-auto">
				<div className="mt-2 mx-2 rounded-lg flex-row flex justify-center ">
					{imageUrl ? (
						<Image
							width={250}
							height={250}
							src={imageUrl}
							alt="shirt"
							className="object-cover"
						/>
					) : (
						<Image width={200} height={200} src="/shirt.png" alt="shirt" />
					)}
				</div>
			</div>

			<div className="p-2 mt-5 px-3 items-center w-fit mx-auto">
				<div className="flex  text-black/[0.5] text-center">{design_name}</div>
				<div className="my-2 w-fit  flex flex-row text-center mx-auto">
					{product_category}
				</div>
			</div>
		</Link>
	);
};

export default DesignProducts;
