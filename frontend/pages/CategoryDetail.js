import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategory } from "./api/categoryApi";
import ProductCard from "@/components/ProductCard";
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
    <div>
      <div className="h-[90px]"></div>
      CategoryDetail
      <div>
        {data.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;

{
  /* <ProductCard key={index} {...product} /> */
}
