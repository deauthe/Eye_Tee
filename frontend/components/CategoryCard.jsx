import Image from "next/image";
import React from "react";
// import hoddie from '../public/C_hoodie.png'
const CategoryCard = () => {
  return (
   <div className="flex flex-col items-center ">
    <div className="border w-[130px] h-[130px] border-black rounded-full flex justify-center items-center bg-slate-50">
         <Image src='/C_hoodie.png' alt="none" width={95} height={95}></Image>
    </div>
    <p className="text-lg">Hoodie</p>
   </div>

  );
};

export default CategoryCard;
