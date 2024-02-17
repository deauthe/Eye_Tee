import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { MdSave } from "react-icons/md";
import FinalImage from "@/components/finalImage";
import { toast } from "react-toastify";
import { DialogFooter } from "./ui/dialog";
import { MdCancel } from "react-icons/md";

export default function EditorModal({
	designImageUrl,
	selectedColor,
	category,
	overlayImg,
	canvasCaptureProps,
}) {
	const [images, setImages] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [selectedIds, setSelectedIds] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedFinalImages, setSelectedFinalImages] = useState([]);
	const handleOpen = () => {
		setBackdrop("opaque");
		onOpen();
	};
	const handleImageSelect = (capturedImage, productId, imageUrl) => {
		console.log("Image Select", capturedImage, productId);

		// Check if an image with the same capturedImage and imageUrl already exists in prevArray
		const selected = selectedImages.find((img) => img.imageUrl === imageUrl);

		if (!selected) {
			setSelectedImages((prevArray) => [
				...prevArray,
				{ capturedImage, productId, imageUrl },
			]);
		} else {
			console.log("Image is already selected.");
		}
	};

	// function dataURLtoBlob(dataurl) {
	//   var arr = dataurl.split(","),
	//     mime = arr[0].match(/:(.*?);/)[1],
	//     bstr = atob(arr[1]),
	//     n = bstr.length,
	//     u8arr = new Uint8Array(n);
	//   while (n--) {
	//     u8arr[n] = bstr.charCodeAt(n);
	//   }
	//   return new Blob([u8arr], { type: mime });
	// }

	const handleSave = (imageUrl) => {
		// Check if the image with the same imageUrl already exists in selectedFinalImages
		const isImageSelected = selectedFinalImages.some(
			(img) => img.imageUrl === imageUrl
		);

		if (!isImageSelected) {
			// Find the corresponding object in selectedImages based on imageUrl
			const correspondingImage = selectedImages.find(
				(img) => img.imageUrl === imageUrl
			);

			if (correspondingImage) {
				setSelectedFinalImages((prevArray) => [
					...prevArray,
					correspondingImage,
				]);
			} else {
				console.log("Corresponding image not found in selectedImages.");
			}
		} else {
			console.log("Image is already selected.", selectedFinalImages);
		}
	};
	const handleSaveImages = async () => {
		try {
			const files = await Promise.all(
				selectedFinalImages.map(async (dataUrl, index) => {
					const { capturedImage, productId } = dataUrl;

					const res = await fetch(capturedImage);
					const blob = await res.blob();

					// Use the product ID to create a unique file name
					const fileName = `product_${productId}_image_${index + 1}.png`;
					console.log("SAVED IMAGES", fileName);
					const file = new File([blob], fileName, {
						type: "image/jpeg",
						lastModified: new Date(),
					});
					return file;
				})
			);

			// Create FormData and append files
			const formData = new FormData();
			files.forEach((file, index) => {
				console.log("in files", file);
				formData.append("image", file);
			});

			// Append designImageUrl
			formData.append("designImageUrl", designImageUrl);
			console.log("in formData", formData);

			// const apiUrl = "http://localhost:8080/api/designs/add-products";
			const apiUrl =
				"http://localhost:8080/api/finalproduct/create-final-products";

			const apiKey = "token";

			if (designImageUrl) {
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"x-api-key": apiKey,
					},
					body: formData,
				});

				const responseData = await response.json();
				console.log(responseData);

				if (response.ok) {
					toast.success("Added Product Successfully");
				}
			}
		} catch (err) {
			toast.error("Error in adding Product");
			console.error(err);
		}
	};

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(
					` http://localhost:8080/api/product/images?category=${category}`,
					{
						headers: {
							"x-api-key": "token",
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					const mergedImages = data.flatMap((item) => item.imageUrls);
					const mergedIds = data.flatMap((item) => item.productId);
					setImages(mergedImages);
					setSelectedIds(mergedIds);
				} else {
					console.error("Failed to fetch images");
				}
			} catch (error) {
				console.error("Error fetching images:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchImages();
	}, [category]);

	return (
		<>
			<Dialog className="h-2/3">
				<DialogTrigger className="text-sm w-full h-full my-auto ">
					<div className="flex items-center gap-1 bg-blue-400 hover:bg-black text-white hover:text-white transition-all duration-300 px-5 py-2 rounded-full w-fit">
						SAVE <MdSave />
					</div>
				</DialogTrigger>
				<DialogContent className="h-2/3 w-2/3">
					<DialogHeader>
						<DialogTitle>
							Create your products for <b>{category}</b> category
						</DialogTitle>
						<DialogDescription>
							these will reflect on your public profile
						</DialogDescription>
					</DialogHeader>
					<div className="gap-5 items-center overflow-x-auto  ">
						<div className="flex gap-5 w-full ">
							{loading ? (
								<div>Loading images...</div>
							) : (
								images.map(
									(imageUrl, index) =>
										(index + 1) % 3 !== 0 && (
											<div
												className={`relative flex-shrink-0 w-80 h-96 cursor-pointer border-2 border-black rounded-md ${
													selectedFinalImages.some(
														(img) => img.imageUrl === imageUrl
													)
														? "selected"
														: ""
												}`}
												key={index}
												onClick={() => {
													handleSave(imageUrl);
												}}
											>
												<FinalImage
													mainImageSrc={imageUrl}
													overlayImageSrc={overlayImg}
													canvasCaptureProps={canvasCaptureProps}
													scale={1}
													url={imageUrl}
													productId={selectedIds[Math.floor(index / 3)]}
													onSave={handleImageSelect}
												/>
												{selectedFinalImages.some(
													(img) => img.imageUrl === imageUrl
												) && (
													<div className="absolute top-2 right-2 text-green-500 w-[30px] h-[30px]">
														<button>✅</button>
													</div>
												)}
											</div>
										)
								)
							)}
						</div>
					</div>
					<div className="flex items-center justify-start gap-5 ">
						<Button
							color="success"
							onClick={handleSaveImages}
							disabled={selectedImages.length === 0}
							className="my-auto"
						>
							Save Product
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
