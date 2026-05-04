"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SaveButton from "./SaveButton";
import { useUpdateSettings } from "@/hooks/settings";

const UpdateEmail = ({ email: initialEmail }) => {
	const { updateSettings, isUpdating } = useUpdateSettings();
	const [email, setEmail] = useState(initialEmail);
	const handleSave = async () => {
		await updateSettings({
			updates: { email },
			showMessage: true,
		});
	};
	return (
		<>
			<div>
				<Label className="text-slate-700 dark:text-slate-300 mb-2 block">
					Email Address
				</Label>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
				/>
			</div>
			<SaveButton label="Update Account" handleSave={handleSave} />
		</>
	);
};

export default UpdateEmail;
