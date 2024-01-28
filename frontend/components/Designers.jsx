import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";


const Designers = ({ data }) => {
  

  return (
    <>
      <div>
        <p className="text-4xl text-[#595957] text-center mt-[2em]  ">
          Our Top Designers
        </p>
      </div>

      
      <div className="flex justify-center gap-2 bg-white border border-gray-200  py-3 pb-[4em] rounded-lg mt-[4em] shadow-sm ">
        
        {[0, 1, 2, 3, 4,5,6,7,8].map((e, index) => (
          <div className="relative w-[10em] mt-[4em]" key={index}>
           
            <div className="overflow-hidden rounded-lg w-[8em] shadow-lg">
              <Image
                src="/Design.webp"
                alt="Design_"
                width={200}
                height={200}
              />
            </div>
            <div className="overflow-hidden rounded-full w-[4em] absolute -top-[20%] right-[5%] border-4 border-[#f0eded]   ">
              <Image
                src="/Designer.jpg"
                alt="Designer_"
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Designers;

export async function getStaticProps(params) {
  const apiUrl = "http://localhost:8080/api/designs/getProducts";
  const response = await fetch(apiUrl, {
    headers: {
      "x-api-key": "token",
    },
  });
  const data = await response.json();

  console.log("Fetched data:", data);

  return {
    props: {
      data,
    },
  };
}
