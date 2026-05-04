import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const Header = ({ isEditing, setIsEditing }) => {
	return (
		<div className="mb-8 flex justify-between items-start">
			<div>
				<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
					Profile
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Manage your account information
				</p>
			</div>
			{!isEditing && (
				<Button
					onClick={() => setIsEditing(true)}
					className="flex items-center gap-2"
				>
					<Edit2 className="w-4 h-4" />
					Edit Profile
				</Button>
			)}
		</div>
	);
};

export default Header;
