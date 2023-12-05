import React from "react";
import { PiHoodieBold } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { FaMugHot } from "react-icons/fa";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
const DesignProducts = () => {
  return (
   <Wrapper>
     <div>
      <div className="flex justify-center gap-4">
        <div className=" flex  justify-center items-center gap-2 my-3 rounded-md border border-zinc-300 cursor-pointer  text-6xl bg-slate-100 p-2">
          <span>
            <PiHoodieBold />
          </span>{" "}
          <p className="text-3xl font-bold">Hoodie</p>{" "}
        </div>
        <div className=" flex justify-center items-center gap-2 my-3 rounded-md border border-zinc-300 cursor-pointer  text-6xl bg-slate-100 p-2">
          <span>
            <IoShirtOutline />{" "}
          </span>{" "}
          <p className="text-3xl font-bold">Shirts</p>
        </div>
        <div className=" flex justify-center items-center gap-2 my-3 rounded-md border border-zinc-300 cursor-pointer  text-6xl bg-slate-100 p-2">
          <span>
            <FaMugHot />{" "}
          </span>{" "}
          <p className="text-3xl font-bold">Mugs</p>
        </div>

       
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5 md:px-0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product,index) => (
            <ProductCard  key={index}/>
          ))}
        </div>
   </Wrapper>
  );
};

export default DesignProducts;
