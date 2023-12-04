import React from "react";
import menuItems from "@/public/UserProfile/constant";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import pattern from '../../public/UserProfile/pattern.jpg'
import RelatedProducts from "@/components/RelatedProducts";
import DesignCarousel from "@/components/DesignCarousel";
const UserProfile = () => {
  return (
   <Wrapper>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-7">
      {menuItems.map((data, index) => (
        <div className="flex items-center gap-3 bg-white px-2 py-3 shadow-sm rounded-md cursor-pointer user-pattern border border-gray-300">
          <Image src={data.ImgUrl} alt={data.name} width={60} height={60} />
          <p className="font-bold text-2xl">{data.name}</p>
        </div>
      ))}
    </div>

    <div>
        <p className="font-bold text-3xl my-2">
            Explore More Items
        </p>
       <DesignCarousel/>
    </div>

    <div>
        <p className="font-bold text-3xl my-2">
            Your Browsing History
        </p>
        <DesignCarousel/>

    </div>
   </Wrapper>
  );
};

export default UserProfile;
