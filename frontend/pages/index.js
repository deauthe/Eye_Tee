import Image from "next/image";
import { Inter } from "next/font/google";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import CategorySection from "@/components/CategorySection";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <div className="mt-1 text-start">
        <HeroBanner />
      </div>
    

      <Wrapper>
        <div className=" text-start  mx-0 my-[20px] md:my-[40px]">
          <CategorySection/>
        </div>

        <div className=" mb-[1.4em] flex gap-3  text-start text-[28px] md:text-[34px]   font-semibold leading-tight">
          <div className="bg-black w-2 h-full">.</div>
          Expolore the latest Products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 my-6 px-5 md:px-0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}
