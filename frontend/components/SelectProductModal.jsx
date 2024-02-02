import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MdOpenInBrowser } from "react-icons/md";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProducts } from "@/pages/api/productApis";
import { getDesignerProducts } from "@/pages/api/designerApi";
import { Skeleton } from "@/components/ui/skeleton";

const SelectProductModal = ({ designerId }) => {
	const [products, setProducts] = useState();
	const [loading, setLoading] = useState(true);
	const [selectedProducts, setSelectedProducts] = useState([]);

	const handleSelectedChange = (product_id) => {
		if (!selectedProducts.includes(product_id)) {
			setSelectedProducts([...selectedProducts, product_id]);
		} else {
			setSelectedProducts(selectedProducts.filter((id) => id !== product_id));
		}
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				let data;
				if (designerId) {
					console.log("id exists as", designerId);

					data = await getDesignerProducts({ designer_id: designerId });
				} else {
					data = null;
				}
				setProducts(data);

				console.log("designData = ", data);
			} catch (error) {
				// Handle error
				console.error("Error fetching su images:", error);
			} finally {
				setLoading(true);
			}
		};

		fetchProducts();
	}, []);

	return (
		<Dialog>
			<DialogTrigger className="text-sm   w-full h-full my-auto ">
				<div className="bg-black/[0.8] text-white flex h-full flex-row gap-7 px-4 py-2 rounded-md">
					<p className="my-auto">change featured products</p>
					<MdOpenInBrowser className="text-3xl" />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>choose products to feature on your page</DialogTitle>
					<DialogDescription>
						these will reflect on your public profile
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-3 gap-5 items-center">
					{loading ? (
						[1, 2, 3, 4, 5].map((e) => {
							return (
								<div className="rounded-md shadow-md h-40 flex flex-col gap-2 bg-black/[0.1] ">
									<Skeleton className="w-full h-full rounded-md" />
								</div>
							);
						})
					) : products ? (
						products.map((p) => (
							<div className="rounded-md shadow-md h-40 flex flex-col gap-2 bg-black/[0.1] p-2">
								<Image
									width={75}
									height={75}
									src={p.product[0].images[0].url}
									className="mx-auto"
								/>
								<span className="mx-auto">{p.title}</span>
								<div className="">
									<Checkbox
										id="terms"
										className="relative left-14 mx-auto"
										onCheckedChange={() => {
											handleSelectedChange(p.title);
											console.log("checkbox changes", selectedProducts);
										}}
									/>
								</div>
							</div>
						))
					) : (
						<div>haha</div>
					)}
				</div>
				<Button variant="default" className="mx-auto" onClick={() => {}}>
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default SelectProductModal;
