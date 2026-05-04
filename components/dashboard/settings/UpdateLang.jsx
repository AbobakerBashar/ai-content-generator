"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import SaveButton from "./SaveButton";

const UpdateLang = ({ language: initialLanguage }) => {
	const [language, setLanguage] = useState(initialLanguage);
	const handleSave = () => {
		// Here you would typically send the updated language preference to your backend
		console.log("Preferred language saved:", language);
	};
	return (
		<>
			<div>
				<Label className="text-slate-700 dark:text-slate-300 mb-2 block">
					Preferred Language
				</Label>
				<Select value={language} onValueChange={setLanguage}>
					<SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="dark:bg-slate-800 dark:border-slate-700">
						<SelectItem value="English">English</SelectItem>
						<SelectItem value="es">Spanish</SelectItem>
						<SelectItem value="fr">French</SelectItem>
						<SelectItem value="de">German</SelectItem>
						<SelectItem value="ja">Japanese</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<SaveButton
				className="w-full bg-blue-600 hover:bg-blue-700"
				handleSave={handleSave}
				label="Save Language"
			/>
		</>
	);
};

export default UpdateLang;
