import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
//TODO: tshirt animations vertical, pnHover: show backside image
//later on TODO: add models in conjunction with
const ProductCard = () => {
	return (
		<Link
			href="/"
			className="transform overflow-hidden shadow-lg md duration-200 hover:scale-[1.02] cursor-pointer rounded-[20px] border-zinc-600 bg-white/[0.5] hover:bg-white/[0.85]"
		>
			<div className=" ">
				<div className="mt-2 mx-2 rounded-lg flex-row flex justify-center ">
					<Image width={300} height={300} src="/shirt.png" alt="shirt" />
					<div className="flex flex-col md:flex-col absolute bottom-48 right-4 justify-center p-1">
						<div className="border-2 border-black bg-white/[0.8]  rounded-full w-10 h-10 mr-2"></div>
					</div>
				</div>
			</div>

			<div className="p-4  text-black/[0.9] shadow-md">
				<h3 className="text-sm font-medium">T-Shirt</h3>
				<h2 className="text-lg font-extrabold">Game Over Black Men T-Shirt</h2>
				<h2 className="text-xs font-light">designed by jatt</h2>
				<div className="my-2 flex flex-row justify-start">
					<div className="border-2 border-black bg-red-600 rounded-full w-10 h-10 mr-2"></div>
					<div className="border-2 border-black bg-blue-400 rounded-full w-10 h-10 mr-2"></div>
					<div className="border-2 border-black bg-yellow-300 rounded-full w-10 h-10 mr-2"></div>
					<div className="border-2 border-black bg-white rounded-full w-10 h-10 mr-2"></div>
				</div>
				<div className="flex items-center text-black/[0.5]">
					<p className="mr-2 text-lg font-semibold bg-[#bdcd5b] px-1 ">
						&#8377; 1234
					</p>

					{true && (
						<>
							<p className="text-base  font-medium line-through">&#8377;3468</p>
							<button className="bg-transparent border-zinc-600 border-2 text-base ml-auto font-bold text-black rounded-md py-1 px-2">
								add to cart
							</button>
						</>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
