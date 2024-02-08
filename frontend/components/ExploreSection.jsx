import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getProductImages } from "@/pages/api/productApis";
import { getCategoryColor } from "@/pages/api/productApis";
import { getProducts } from "@/pages/api/productApis";

import { getAllProducts } from "@/pages/api/productApis";

const ExploreSection = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProducts = async () => {
      try {
        const data = await getAllProducts();
		setProductData(data.products);
        console.log(data.products);
      } catch (error) {
        console.error("Error fetching super images:", error);
      }
    };

	allProducts();

  }, []);
  return (
    <>
      <div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
        Explore the latest Products
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
        {productData.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
        {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
					<ProductCard key={index} />
				))} */}
      </div>
    </>
  );
};

export default ExploreSection;
