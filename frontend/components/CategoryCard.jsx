import Image from "next/image";
import React from "react";
// import hoddie from '../public/C_hoodie.png'
const CategoryCard = () => {
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="bg-purple-200 m-1.5 shadow flex items-end  gap-3 justify-center rounded-md">
        <Image src='/C_hoodie.png' alt="none" width={70} height={70}></Image>
        <p className="text-[28px] md:text-[34px] mb-4  font-[500] leading-tight" >Hoodies</p>
      </div>
    </div>
  );
};

export default CategoryCard;
