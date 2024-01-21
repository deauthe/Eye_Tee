import Image from "next/image";
import { Inter } from "next/font/google";
import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import CategorySection from "@/components/CategorySection";
import ExploreSection from "@/components/ExploreSection";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className="">
			<div className="mt-1 text-start">
				<HeroBanner />
			</div>

			<Wrapper>
				<div className=" text-start  mx-0 my-[90px]">
					<CategorySection />
				</div>

				<ExploreSection />
			</Wrapper>
		</main>
	);
}
