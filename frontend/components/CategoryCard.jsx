import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const categoryImages = {
  hoodie: "/hoodie_category.png",
  tshirt: "/t_shirt.png",
  cup: "/C_mug.png",
  shirt: "/C_shirt.png",
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
      className={`border-5 border-white rounded-[50px] w-[180px] h-[200px] bg-${props.color}-400 flex flex-col gap-3 justify-center items-center shadow-md cursor-pointer`}
      onClick={() => {
        handleCategoryClick(props.category);
      }}
    >
      <p className="text-2xl font-bold text-white">{props.name}</p>
      <Image
        src={categoryImages[props.category]}
        alt="none"
        width={95}
        height={95}
      />
    </div>
  );
};

export default CategoryCard;
