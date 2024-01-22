import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const categoryImages = {
  Hoodie: "/hoodie_category.png",
  Tshirt: "/t_shirt.png",
  Mugs: "/C_mug.png",
  "T-Shirts": "/C_shirt.png",
  "Z-Shirts": "/C_shirt.png",
  "Z-Hoodies": "/hoodie_category.png",
  Stickers: "/t_shirt.png",
  Bottles: "/C_mug.png",
  "Phone Covers": "/C_shirt.png",
  "Tote Bags": "/C_mug.png",

  // Add other categories and their images as needed
};

const CategoryCard = (props) => {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    // Get the existing query parameters
    const existingQuery = { ...router.query };

    // Add or update the 'category' parameter
    existingQuery.category = category;

    // Use the router to replace the URL with the updated query parameters
    router.replace({
      pathname: router.pathname,
      query: existingQuery,
    });
  };

  return (
    <div
      className={` relative border border-[#bdbdb9] bg-black/5 rounded-md w-[180px] h-[190px] flex flex-col gap-3 justify-center items-center  cursor-pointer`}
      onClick={() => {
        handleCategoryClick(props.category);
      }}
    >

      <div className="absolute top-[-63px] ">
		
		<Image
          src="/category_hoodie_mockup.png"
          alt="none"
          width={200}
          height={200}
        />
		<Image className="absolute -bottom-6 left-4" src="/category_shadow.png" alt="category_shadow" width={500} height={60}/>
     
		
        </div>
	  <div className="w-[102%] bg-[#bdbdb9] h-[1px] absolute bottom-[62px] -rotate-12"></div>
      {/* {`${[props.category]}`} */}

	  <div className="absolute bottom-2 right-1">
      <p className="text-[0.9em] font-bold text-[#C494D6] text-end">OVERSIZED</p>
      <p className="text-[1em] font-bold   text-gray-600 text-end">{props.name}</p>
	  </div>
    </div>
  );
};

export default CategoryCard;
