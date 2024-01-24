import Image from "next/image";
import { Inter } from "next/font/google";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import CategorySection from "@/components/CategorySection";
import Designers from "@/components/Designers";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className="">
			<div className="mt-1 text-start">
				<HeroBanner />
			</div>

			<Wrapper>

				<div>
					<Designers/>
				</div>
				<div className="  text-start  mx-0 my-[90px]">
					<CategorySection />
				</div>

				<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">

					Explore the latest Products
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-6 px-5 md:px-0">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8,9].map((product, index) => (
						<ProductCard key={index} />
					))}
				</div>
			</Wrapper>
		</main>
	);
}
