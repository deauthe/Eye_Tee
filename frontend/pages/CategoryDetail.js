import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategory } from "./api/categoryApi";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
const CategoryDetail = () => {
  const router = useRouter();

  const category = router.query.category;
  console.log("this is category", category);

  const [data, setData] = useState([]);

  console.log("ijdojf", data);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategory(category);
        console.log(data.products);
        setData(data.products);
      } catch (error) {
        // Handle error
        console.error("Error fetching Categories");
      } finally {
        //   setLoading(false);
      }
    };

    fetchCategory();
  }, [category]);

  return (
    <Wrapper>
      <div className="mx-3">
        <div className="h-[90px]"></div>
        <p className=" mt-[50px] text-center font-bold text-4xl">
          {" "}
          Explore the {category} Category
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 mt-[90px] px-5 md:px-0">
          {data.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryDetail;

{
  /* <ProductCard key={index} {...product} /> */
}
