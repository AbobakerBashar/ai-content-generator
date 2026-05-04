import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const SaveButton = ({ label, handleSave, isUpdating }) => {
	return (
		<Button
			className="w-full bg-blue-600 hover:bg-blue-700"
			onClick={handleSave}
			disabled={isUpdating}
		>
			{isUpdating ? (
				<>
					<span className="w-4 h-4 border-3 border-white border-dotted rounded-full animate-spin duration-300" />
					Saving...
				</>
			) : (
				<>
					<Save className="w-4 h-4 mr-2" />
					{label}
				</>
			)}
		</Button>
	);
};

export default SaveButton;
