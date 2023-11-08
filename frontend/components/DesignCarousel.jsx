import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const DesignCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className=" mb-[100px]">
        <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {[0, 1, 2, 3, 4].map((product, index) => (
          <div className="bg-white rounded-md shadow">
            <ProductCard key={index} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DesignCarousel;
