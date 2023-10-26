import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
const ProductCard = () => {
  return (
    <Link
      href="/"
      className="transform overflow-hidden bg-black/[0.15] duration-200 hover:scale-105 cursor-pointer rounded-lg shadow-md"
    >
      <div className="relative">
        <div className="absolute right-4 top-3 ">
         <div className="flex flex-col gap-3">
         <span className="text-xl bg-black/[0.15] p-1.5 rounded-full shadow hover:bg-blue-400 transition-all duration-200">
            {" "}
            <FiShare2 />
          </span>

          <span className="text-xl bg-black/[0.15] p-1.5 rounded-full shadow hover:bg-red-400 transition-all duration-200">
            {" "}
            <AiOutlineHeart />
          </span>
         </div>
        </div>
      </div>
      <Image width={500} height={500} src="/shirt.png" alt="shirt" />

      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">Game Over Black Men T-Shirt</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">&#8377; 1234</p>

          {true && (
            <>
              <p className="text-base  font-medium line-through">&#8377;3468</p>
              <p className="ml-auto text-base font-medium text-green-500">
                45 % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
