import { useState } from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";
import { useDeleteUserAccount } from "@/hooks/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeleteAccountModal({ isOpen, onClose }) {
	const [confirmText, setConfirmText] = useState("");
	const { deleteAccount, isDeleting } = useDeleteUserAccount();

	if (!isOpen) return null;

	const handleConfirm = async () => {
		await deleteAccount();
		onClose();
		setConfirmText("");
	};

	const isButtonDisabled =
		confirmText?.toLocaleLowerCase() !== "delete" || isDeleting;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
			{/* Modal Container */}
			<div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-950 dark:border dark:border-slate-800">
				{/* Close Button */}
				<Button
					onClick={() => {
						setConfirmText("");
						onClose();
					}}
					variant="outline"
					disabled={isDeleting}
					className="absolute right-4 top-4 rounded-full p-2 bg-secondary dark:hover:bg-secondary/80 hover:bg-gray-200/60"
				>
					<X className="h-5 w-5" />
				</Button>

				{/* Header */}
				<div className="flex flex-col items-center mb-6 text-center">
					<div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
						<AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
					</div>
					<h2 className="text-xl font-bold text-slate-900 dark:text-white">
						Delete Account
					</h2>
					<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</p>
				</div>

				{/* Confirmation Input */}
				<div className="mb-6">
					<Label
						htmlFor="confirm-delete"
						className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
					>
						Please type{" "}
						<span className="font-bold text-red-600 dark:text-red-500">
							DELETE
						</span>{" "}
						to confirm.
					</Label>
					<Input
						id="confirm-delete"
						type="text"
						value={confirmText}
						onChange={(e) => setConfirmText(e.target.value)}
						disabled={isDeleting}
						placeholder="DELETE"
					/>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3">
					<Button
						variant="outline"
						onClick={() => {
							setConfirmText("");
							onClose();
						}}
						disabled={isDeleting}
						className="w-1/2"
					>
						Cancel
					</Button>
					<Button
						onClick={handleConfirm}
						disabled={isButtonDisabled}
						className="flex w-1/2 items-center justify-center bg-red-600 text-sm font-medium text-white hover:bg-red-700  dark:hover:bg-red-500"
					>
						{isDeleting ? (
							<>
								<span className="border-3 border-dotted border-white rounded-full h-4 w-4 animate-spin " />
								Deleting...
							</>
						) : (
							"Delete Account"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
