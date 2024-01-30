import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";


const 
Designers = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div>
        <p className="text-4xl text-[#595957] text-center mt-[2em]">
          Our Top Designers
        </p>
      </div>

      <div className="flex justify-center gap-2 bg-white border border-gray-200 py-3 pb-[4em] rounded-lg mt-[4em] shadow-sm">
      <Carousel
          swipeable={true}
          dotListClass="mt-"
          itemClass="carousel-item-padding-40-px mb-[6px] -z-30"
          responsive={responsive}

        >
          {array.map((index) => (
            <div key={index} className="relative w-[10em] mt-[4em]">
              <div className="overflow-hidden rounded-lg w-[8em] shadow-lg">
                <Image
                  src="/Design.webp"
                  alt={`Design_${index}`}
                  width={200}
                  height={200}
                />
              </div>
              <div className="overflow-hidden rounded-full w-[4em] absolute -top-[20%] right-[5%] border-4 border-[#f0eded]">
                <Image
                  src="/Designer.jpg"
                  alt={`Designer_${index}`}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Designers;


