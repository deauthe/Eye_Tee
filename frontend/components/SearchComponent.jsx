import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getAllProducts } from "@/pages/api/productApis";
import { useRouter } from "next/router";
import { getProductsByCategory } from "@/pages/api/productApis";
const SearchComponent = () => {
  const router = useRouter();
  const category = router.query.category;
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      setAllProducts(response.products);
      setSearchResults(response.products); // Set initial search results to all products
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      setIsLoading(true);
      const response = await getProductsByCategory(category);
      setAllProducts(response.products);
      setSearchResults(response.products); // Set initial search results to all products
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Empty dependency array to run only once on component mount

  const handleChange = (event) => {
    if (!category) {
      fetchProducts();
    } else {
      getProductsByCategory(category);
    }

    setSearchQuery(event.target.value);
    // Filter products based on searchQuery
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  return (
    <div className="relative">
      <div className="border-2 border-black flex  gap-2  h-[2.3em]  px-3 py-1 rounded-full pl-5 ">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search Products..."
          className="outline-none "
        />
        <button disabled={isLoading}>
          {
            <span className="text-2xl hover:animate-ping">
              <IoSearchOutline />
            </span>
          }
        </button>

        {/* Display search results */}
      </div>

      {searchQuery && (
        <div className="absolute bg-white w-[400px] rounded-md border border-gray-300 shadow-md mt-3  -left-[5.5em]">
          {searchResults.map((result, index) => (
            <div key={index}>{result.name}</div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default SearchComponent;
