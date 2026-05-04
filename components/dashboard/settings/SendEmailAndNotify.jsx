"use client";

import { useState } from "react";
import SaveButton from "./SaveButton";
import { useUpdateSettings } from "@/hooks/settings";

const SendEmailAndNotify = ({
	sendEmail: initialSendEmail,
	notify: initialNotify,
}) => {
	const { updateSettings, isUpdating } = useUpdateSettings();
	const [notifications, setNotifications] = useState(initialNotify);
	const [sendEmail, setSendEmail] = useState(initialSendEmail);

	const handleSave = async () => {
		await updateSettings({
			updates: {
				email_about_credits_usage: sendEmail,
				notify_on_new_features: notifications,
			},
			showMessage: true,
		});
	};
	return (
		<>
			<label className="flex items-center cursor-pointer">
				<input
					type="checkbox"
					checked={sendEmail}
					disabled={isUpdating}
					onChange={(e) => setSendEmail(e.target.checked)}
					className="w-4 h-4 rounded accent-blue-600"
				/>
				<span className="ml-3 text-slate-700 dark:text-slate-300">
					Email me about credits usage
				</span>
			</label>

			<label className="flex items-center cursor-pointer">
				<input
					type="checkbox"
					checked={notifications}
					disabled={isUpdating}
					onChange={(e) => setNotifications(e.target.checked)}
					className="w-4 h-4 rounded accent-blue-600"
				/>
				<span className="ml-3 text-slate-700 dark:text-slate-300">
					Notify on new features
				</span>
			</label>
			<SaveButton
				label="Save Preferences"
				handleSave={handleSave}
				isUpdating={isUpdating}
			/>
		</>
	);
};

export default SendEmailAndNotify;
