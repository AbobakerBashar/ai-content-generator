import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUpdateUserAvatar } from "@/hooks/users";
import { Calendar, Camera, X } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

const AccountInfo = ({ user, isEditing, isSaving, setIsSaving }) => {
	const { updateAvatar, isUpdating } = useUpdateUserAvatar();
	const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	useEffect(() => {
		if (openDeleteModal) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	}, [openDeleteModal]);

	useEffect(() => {
		setIsSaving(isUpdating);
	});

	const handleAvatarChange = async (e) => {
		const file = e.target.files?.[0];

		if (file && file.size > 0) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("File size should be less than 5MB");
				return;
			}
			// Create preview
			const previewURL = URL.createObjectURL(file);
			setAvatarPreview(previewURL);
			await updateAvatar({ avatar: file, oldPath: user?.avatar });
		}
	};
	const handleRemoveAvatar = () => {
		setAvatarPreview("");
		updateAvatar({ avatar: null, oldPath: user?.avatar, removeAvatar: true });
	};

	return (
		<div className="space-y-6">
			{/* Avatar Card */}
			<Card className="p-6 border border-slate-200 dark:border-slate-700">
				<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
					Profile Picture
				</h3>
				<div className="flex flex-col items-center gap-4">
					{/* Avatar Preview */}
					<div className="relative">
						<Avatar className="w-24 h-24">
							{avatarPreview && (
								<AvatarImage
									src={avatarPreview}
									alt={user?.name}
									// className="h-full w-full"
								/>
							)}
							<AvatarFallback className="text-lg">
								{user?.name
									?.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase() || "U"}
							</AvatarFallback>
						</Avatar>
						{isEditing && (
							<label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
								<Camera className="w-4 h-4" />
								<input
									type="file"
									accept="image/*"
									onChange={handleAvatarChange}
									className="hidden"
									disabled={isSaving}
								/>
							</label>
						)}
					</div>

					{/* Avatar Actions */}
					{isEditing && (
						<div className="w-full space-y-2">
							<label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
								{isUpdating ? (
									<>
										<span className="loader w-4 h-4 border-2 border-dotted border-primary rounded-full animate-spin"></span>
										<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Uploading...
										</span>
									</>
								) : (
									<>
										<Camera className="w-4 h-4 text-slate-600 dark:text-slate-400" />
										<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Choose Photo
										</span>
									</>
								)}

								<input
									type="file"
									accept="image/*"
									onChange={handleAvatarChange}
									className="hidden"
									disabled={isSaving}
								/>
							</label>
							{avatarPreview && (
								<Button
									onClick={handleRemoveAvatar}
									variant="outline"
									className="w-full text-sm"
									disabled={isSaving}
								>
									<X className="w-4 h-4 mr-2" />
									Remove Photo
								</Button>
							)}
							<p className="text-xs text-slate-500 dark:text-slate-400 text-center">
								Max 5MB • JPG, PNG, GIF
							</p>
						</div>
					)}

					{!isEditing && (
						<p className="text-sm text-slate-500 dark:text-slate-400 text-center">
							{avatarPreview ? "Click Edit Profile to change" : "No photo yet"}
						</p>
					)}
				</div>
			</Card>

			{/* Account Information Card */}
			<Card className="p-6 border border-slate-200 dark:border-slate-700">
				<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
					Account Information
				</h3>
				<div className="space-y-4">
					<div>
						<p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
							Account Status
						</p>
						<p className="text-sm font-medium text-green-600 dark:text-green-400">
							Active
						</p>
					</div>
					<div>
						<p className="text-sm text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							Member Since
						</p>
						<p className="text-sm font-medium text-slate-900 dark:text-white">
							{user?.createdAt
								? new Date(user.createdAt).toLocaleDateString()
								: "Not available"}
						</p>
					</div>
				</div>
			</Card>

			{/* Danger Zone Card */}
			<Card className="p-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
				<h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-4">
					Danger Zone
				</h3>
				<Button
					variant="outline"
					onClick={() => setOpenDeleteModal(true)}
					className="w-full border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
				>
					Delete Account
				</Button>
			</Card>
			<DeleteAccountModal
				isOpen={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
			/>
		</div>
	);
};

export default AccountInfo;
