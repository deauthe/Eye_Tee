import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
//TODO: tshirt animations vertical, pnHover: show backside image
//later on TODO: add models in conjunction with
const ProductCard = ({
	product_photo,
	product_colors,
	product_price,
	product_stock,
}) => {
	return (
		<Link
			href="/"
			className="transform overflow-hidden  shadow-sm border border-black/90 md duration-200  cursor-pointer rounded-[7px] backdrop-blur-md shadow-sm"
		>
			<div className=" ">
				<div className="-mt-4 mx-2 rounded-lg flex-row flex justify-center ">
					<Image width={300} height={300} src="/shirt.png" alt="shirt" />
					<div className="flex flex-col md:flex-col absolute bottom-48 right-4 justify-center p-1">
						{/* <div className="border-2 border-black bg-white/[0.8]  rounded-full w-10 h-10 mr-2"></div> */}
					</div>
				</div>
			</div>

			<div className="p-2 -mt-5 px-3   shadow-md">
				<h3 className="text-xs  text-black/[0.4]">T-Shirt</h3>
				<h2 className="text-[0.9em]">Game Over Black Men T-Shirt</h2>
				<h2 className="text-xs text-black/60 ">designed by jatt</h2>
				<div className="my-2 flex flex-row justify-start">
					<div className="border-1 border-black/20 bg-red-600 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-blue-400 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-yellow-300 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-white rounded-full w-7 h-7 mr-2"></div>
				</div>
				<div className="flex items-center text-black/[0.5] mb-2 ">
					<p className="mr-2 text-lg font-semibold bg-[#bdcd5b] px-1 skew-x-3 ">
						&#8377; 1234
					</p>

					{true && (
						<>
							<p className="text-base  font-medium line-through">&#8377;3468</p>
							<button className="skew-x-1 text-sm ml-auto px-2  text-black/90 rounded-sm py-1 border border-black/90 hover:bg-black/[0.05] transition-all duration-200 ">
								Add to cart
							</button>
						</>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
