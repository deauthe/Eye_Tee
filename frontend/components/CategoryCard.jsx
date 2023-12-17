import Image from "next/image";
import React from "react";
// import hoddie from '../public/C_hoodie.png'
import hoodie from "../public/hoodie_category.png";
const CategoryCard = (props) => {
  return (
    <div
      className={` border-5 border-white rounded-[50px] w-[180px] h-[200px] bg-${props.color}-400  flex flex-col gap-3 justify-center items-center  shadow-md`}
    >
      <p className="text-2xl font-bold text-white">{props.name}</p>
      <Image src={hoodie} alt="none" width={95} height={95}></Image>
    </div>
  );
};

export default CategoryCard;
