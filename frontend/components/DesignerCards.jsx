import React from "react";
import profile from "../public/profile.png";
import Image from "next/image";
const DesignerCards = () => {
	return (
		<div className="flex flex-col gap-3 justify-center items-center bg-white/80 rounded-md my-3 py-5">
			<p className="font-[600]">
				Samanvay Arya
				<p className="p-0 m-0 font-[400]">@asamanvay</p>
			</p>

			<Image src={profile} width={150} height={150} alt="profile"></Image>

			<button className="bg-black hover:bg-black hover:text-white transition-all duration-300 px-5 py-2 rounded-full text-white">
				Follow<span>+</span>
			</button>
		</div>
	);
};

export default DesignerCards;
