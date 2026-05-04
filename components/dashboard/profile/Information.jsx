import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Mail, User } from "lucide-react";

const Information = ({ isEditing, formData, setFormData }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			{/* Name Field */}
			<div className="mb-6">
				<Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
					<User className="w-4 h-4" />
					Full Name
				</Label>
				{isEditing ? (
					<Input
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter your full name"
						className="mt-1"
					/>
				) : (
					<p className="text-slate-900 dark:text-white font-medium">
						{formData.name || "Not provided"}
					</p>
				)}
			</div>

			{/* Email Field */}
			<div className="mb-6">
				<Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
					<Mail className="w-4 h-4" />
					Email Address
				</Label>
				{isEditing ? (
					<Input
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Enter your email"
						className="mt-1"
					/>
				) : (
					<p className="text-slate-900 dark:text-white font-medium">
						{formData.email || "Not provided"}
					</p>
				)}
			</div>

			{/* Bio Field */}
			<div className="mb-6">
				<Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
					<FileText className="w-4 h-4" />
					Bio
				</Label>
				{isEditing ? (
					<Textarea
						name="bio"
						value={formData.bio}
						onChange={handleChange}
						placeholder="Tell us about yourself"
						className="mt-1"
						rows="4"
					/>
				) : (
					<p className="text-slate-900 dark:text-white font-medium">
						{formData.bio || "Not provided"}
					</p>
				)}
			</div>
		</>
	);
};

export default Information;
