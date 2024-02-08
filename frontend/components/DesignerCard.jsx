import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { PiHoodieBold } from "react-icons/pi";
import { CiMug1 } from "react-icons/ci";
import { IoShirtOutline } from "react-icons/io5";
import { MdMapsUgc } from "react-icons/md";
import { FaMugHot } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const DesignerCard = (props) => {
	const [imgSrc, setImgSrc] = useState(props.photo);
	const [fade, setFade] = useState(false);

	const handleButtonClick = (newSrc) => {
		setFade(true);
		setTimeout(() => {
			// setImgSrc(newSrc);
			setFade(false);
		}, 500); // Adjust the timeout duration to match your transition duration
	};

	const handleRoute = () => {
		console.log("hello");
	};
	return (
		<div className="max-w-unit-6xl max-h-unit-6xl" onClick={handleButtonClick}>
			<div
				className={`transition-opacity ${
					fade ? "opacity-0 duration-100 ease-in-out" : "opacity-100"
				} rounded-full border-2 border-black `}
			>
				{imgSrc ? (
					<Image
						width={500}
						height={500}
						src={imgSrc}
						alt="shirt"
						className=""
					/>
				) : (
					<>loading...</>
				)}
			</div>
		</div>
	);
};

export default DesignerCard;
