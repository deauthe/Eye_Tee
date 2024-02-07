import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { MdOutlineIosShare } from "react-icons/md";
import { TbClipboardCopy } from "react-icons/tb";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

export default function ShareButton() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [backdrop, setBackdrop] = React.useState("opaque");

	const handleOpen = () => {
		setBackdrop("opaque");
		onOpen();
	};

	// body content

	const [formData, setFormData] = useState({
		description: "",
		address: "",
		firstName: "",
		lastName: "",
		portfolioLinks: "",
		socialMediaLinks: "",
	});

	const [errorMsg, setErrorMsg] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check for blank inputs
		const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
		if (emptyFields.length > 0) {
			setErrorMsg("Please fill in all fields.");
			return;
		}

		// Clear error message
		setErrorMsg("");

		// Perform other actions (e.g., submit the form)
		// Add your logic here

		// Close the modal after submission
		onClose();
	};
	const copyToClipboard = () => {
		const currentUrl = window.location.href;

		// Attempt to use the modern clipboard API
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(currentUrl)
				.then(() => {
					console.log("URL copied to clipboard");
				})
				.catch((err) => {
					console.error("Failed to copy URL to clipboard", err);
				});
		} else {
			// Fallback for older browsers
			const textarea = document.createElement("textarea");
			textarea.value = currentUrl;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			console.log("URL copied to clipboard (fallback)");
		}
	};

	return (
		<>
			<div className="flex flex-wrap gap-3">
				<Button
					key="a"
					variant="flat"
					color="warning"
					onPress={() => handleOpen()}
					className="flex items-center gap-1 bg-black hover:bg-black text-white hover:text-white transition-all duration-300 px-2 py-2 rounded-full"
				>
					<span>
						<MdOutlineIosShare />
					</span>
				</Button>
			</div>
			<Modal
				size="5xl"
				backdrop={backdrop}
				isOpen={isOpen}
				onClose={onClose}
				className="w-[800px]"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
							<ModalBody className="">
								<div className="rounded-md mx-auto flex flex-row gap-5">
									<Button
										color="default"
										variant="ghost"
										onPress={copyToClipboard}
									>
										<TbClipboardCopy className="text-xl" />
									</Button>
									<Button
										color="primary"
										variant="ghost"
										onPress={copyToClipboard}
									>
										<FaFacebook className="text-2xl" />
									</Button>
									<Button
										color="primary"
										variant="ghost"
										onPress={copyToClipboard}
									>
										<GrInstagram className="text-2xl" />
									</Button>
								</div>
							</ModalBody>
							<ModalFooter>
								{/* <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button> */}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
