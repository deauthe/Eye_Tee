import Wrapper from "@/components/Wrapper";
import React from "react";
import profile from "../../public/lady.jpg";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DesignerCards from "@/components/DesignerCards";
import NextModel from "@/components/NextModel";


const PublicProfile = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };


 



  return (
    <Wrapper>
      <div className="bg-[#f7d59c] h-[11em] relative mb-[60px]">
        <div className="overflow-hidden rounded-full inline-block absolute bottom-[-40px] left-[20px]">
          <Image src={profile} alt="profile" width={170} height={170} />
        </div>
        <button className="bg-black hover:bg-black hover:text-white transition-all duration-300 px-5 py-2 rounded-full absolute right-[210px] bottom-[-15px] text-white">
          Follow <span>+</span>
        </button>
       <div className="absolute right-[60px] bottom-[-15px]">
      <NextModel/>
       </div>
        <div className="absolute left-[200px] top-[70px]">
          <h3 className="font-[600] text-3xl"> Samanvay Arya</h3>
          <p>@asamanvay</p>
          <div className="flex gap-4">
            <p>
              <span className="mr-2 font-[700]">300</span>Followers
            </p>
            <p>
              <span className="mr-2 font-[700]">300</span>Following
            </p>
          </div>
        </div>
      </div>
      {/* <h2 className="text-3xl font-[700] mt-9">About </h2> */}

      {/* <div className=" bg-white/80 p-2 my-4  shadow rounded-md">
        <p>
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div> */}

      <h2 className="text-3xl font-[700]">Designer Products </h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5 md:px-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
        ))}
      </div> */}

      <div className=" mt-4  mb-[100px] md:mb-0">
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((product, index) => (
           <div className="bg-white rounded-md shadow">
             <ProductCard key={index} />
           </div>
          ))}
        </Carousel>
      </div>

      <h2 className="text-3xl font-[700] mt-9">Other Designers </h2>

      <div className=" mt-4  mb-[100px] md:mb-0">
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((product, index) => (
            <DesignerCards key={index} />
          ))}
        </Carousel>
      </div>
      <h2 className="text-3xl font-[700]">Other Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5 md:px-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
             <ProductCard key={index} />

        ))}
      </div>
    </Wrapper>
  );
};

export default PublicProfile;
