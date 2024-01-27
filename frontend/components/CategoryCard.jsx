import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { getProductImages } from "@/pages/api/productApis";

const CategoryCard = (props) => {
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getProductImages({ category: props.category });
        console.log(data[0].imageUrls[0]);
        setImage(data[0].imageUrls[0]);
      } catch (error) {
        // Handle error
        console.error("Error fetching product images:");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [props.category]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const cardVariants = {
    offscreen: {
      y: 200,
    },
    onscreen: {
      y: 0,
      //   rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const maincardVariants = {
    offscreen: {
      y: 100,
    },
    onscreen: {
      y: 0,
      //   rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8, once: true }}
      variants={maincardVariants}
      // viewport={{once: true}}
      className={` relative border border-[#bdbdb9] bg-- rounded-md w-[180px] h-[175px] flex flex-col gap-3 justify-center items-center  cursor-pointer`}
      onClick={() => {
        handleCategoryClick(props.category);
      }}
    >
      <div className="absolute -top-[65px]  ">
        {/* <Image
					src="/category_hoodie_mockup.png"
					alt="none"
					width={200}
					height={200}
				/> */}

        <motion.div variants={cardVariants}>
          <Image
            //  src={image}
            src="/category_hoodie_mockup.png"
            alt="none"
            width={170}
            height={170}
          />
        </motion.div>

        <Image
          className="absolute -bottom-7 left-4"
          src="/category_shadow.png"
          alt="category_shadow"
          width={700}
          height={400}
        />
      </div>
      <div className="w-[102%] bg-[#bdbdb9] h-[1px] absolute bottom-[62px] -rotate-12"></div>
      {/* {`${[props.category]}`} */}

      <div className="absolute bottom-2 right-1">
        <p className="text-[0.9em] font-bold text-[#C494D6] text-end">
          {`${[props.category]}`}
        </p>
        <p className="text-[1em] font-bold   text-gray-600 text-end">
          {props.name}
        </p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
