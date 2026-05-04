import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUpdateUserProfile } from "@/hooks/users";
import { Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import Information from "./Information";

const MainProfileCard = ({
	setIsEditing,
	isSaving,
	setIsSaving,
	isEditing,
	user,
}) => {
	const { updateProfile, isUpdating } = useUpdateUserProfile();
	const [formData, setFormData] = useState({
		name: user.name || "",
		email: user.email || "",
		bio: user.bio || "",
	});

	useEffect(() => {
		setIsSaving(isUpdating);
	}, [isUpdating, setIsSaving]);

	const handleCancel = () => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				location: user.location || "",
				bio: user.bio || "",
				avatar: null,
			});
		}
		setIsEditing(false);
	};

	const handleSave = async () => {
		await updateProfile(formData);
		setIsEditing(false);
	};

	return (
		<div className="lg:col-span-2">
			<Card className="p-6 border border-slate-200 dark:border-slate-700">
				{/* Information */}
				<Information
					formData={formData}
					setFormData={setFormData}
					isEditing={isEditing}
				/>

				{/* Action Buttons */}
				{isEditing && (
					<div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
						<Button
							onClick={handleSave}
							disabled={isSaving}
							className="flex items-center gap-2 flex-1"
						>
							{isUpdating ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="w-4 h-4" />
									Save Changes
								</>
							)}
						</Button>
						<Button
							onClick={handleCancel}
							variant="outline"
							className="flex items-center gap-2"
						>
							<X className="w-4 h-4" />
							Cancel
						</Button>
					</div>
				)}
			</Card>
		</div>
	);
};

export default MainProfileCard;
