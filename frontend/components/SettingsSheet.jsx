import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdSettings } from "react-icons/io";
import SelectProductModal from "./SelectProductModal";

const staticSettings = {
	settings: {
		isPrivate: false,
		showDesigns: {
			enabled: true,
			designIds: [],
		},
		showFollowers: true,
		showFullName: true,
		showPhone: true,
		showDescription: true,
		showCoverPhoto: true,
		showProfilePhoto: true,
		socialMedia: ["instagram.com"],
		portfolioLinks: ["linkedin.com"],
	},
};
const SettingsSheet = () => {
	// const settings = usePublicSettings();
	const [newSettings, setNewSettings] = useState(staticSettings);

	return (
		<div>
			<Sheet>
				<div className="bg-black text-white rounded-full items-center text-center w-min px-2 ">
					<SheetTrigger>
						<IoMdSettings className="pt-2" />
					</SheetTrigger>
				</div>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								name
							</Label>
							<Input
								id="name"
								defaultValue="..."
								className="col-span-3"
								onChange={(e) => {
									setNewSettings(...newSettings, {});
								}}
							/>
						</div>

						<hr></hr>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right col-span-2">
								display picture
							</Label>
							<Switch
								id="name"
								checked={newSettings.settings.showProfilePhoto} // Set the initial boolean value here
								onCheckedChange={(e) => {
									setNewSettings({
										settings: { ...newSettings.settings, showProfilePhoto: e },
									});
								}}
								className="col-span-2 mx-auto"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right col-span-2">
								description
							</Label>
							<Switch
								id="description"
								checked={newSettings.settings.showDescription} // Set the initial boolean value here
								onCheckedChange={(e) => {
									setNewSettings({
										settings: { ...newSettings.settings, showDescription: e },
									});
								}}
								className="col-span-2 mx-auto"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right col-span-2">
								Name
							</Label>
							<Switch
								id="name"
								checked={newSettings.settings.showFullName} // Set the initial boolean value here
								onCheckedChange={(e) => {
									setNewSettings({
										settings: { ...newSettings.settings, showFullName: e },
									});
								}}
								className="col-span-2 mx-auto"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right col-span-2">
								private profile
							</Label>
							<Switch
								id="name"
								checked={newSettings.settings.isPrivate} // Set the initial boolean value here
								onCheckedChange={(e) => {
									setNewSettings({
										settings: { ...newSettings.settings, isPrivate: e },
									});
								}}
								className="col-span-2 mx-auto"
							/>
						</div>
						<hr />
						<hr />
						<div>
							<SelectProductModal designerId={"651515097dfd1f7338a6b04b"} />
						</div>
					</div>
					<hr className="my-1" />
					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit" className="my-1 bg-black">
								Save changes
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default SettingsSheet;
