import Image from "next/image";
import { Inter } from "next/font/google";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import CategoryCard from "@/components/CategoryCard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="mt-9">
      <HeroBanner />
      </div>
      {/* Text Heading and describe  */}

      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[20px] md:my-[40px]">
          <div className="text-[28px] md:text-[34px] mb-1  font-semibold leading-tight">
            Unleash The Unique Style Categories
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-7 mb-5 px-5 md:px-0">
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>

          </div>
          {/* <div className="text-md md:text-xl">
            Explore a world of fashion where your creativity knows no bounds.
            Design, wear, and share your one-of-a-kind creations with the world.
          </div> */}
        </div>

        <div className=" text-center text-[28px] md:text-[34px]  mb-1 font-semibold leading-tight">
          Expolore the latest Products
          </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6 px-5 md:px-0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
            <ProductCard />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}
