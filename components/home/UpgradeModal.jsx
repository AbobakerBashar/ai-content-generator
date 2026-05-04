"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUpgrade } from "@/hooks/upgrade";

const UpgradeModal = ({ isOpen, onClose, plan, user }) => {
	const { upgrade, isUpgrading } = useUpgrade();
	const [formData, setFormData] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.firstName.trim() ||
			!formData.lastName.trim() ||
			!formData.email.trim()
		) {
			toast.error("Please fill in all fields");
			return;
		}

		await upgrade({
			planId: plan.id,
			userId: user?.id,
			email: formData.email,
			price: plan.price,
			planName: plan.name,
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Upgrade to {plan.name}</DialogTitle>
					<DialogDescription>
						Confirm your details to proceed to secure checkout for ${plan.price}
						/month.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							disabled={isUpgrading}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							disabled={isUpgrading}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							disabled={isUpgrading}
							required
						/>
					</div>

					{/* FIX 3: CardElement removed entirely */}

					<div className="flex gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isUpgrading}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isUpgrading} className="flex-1">
							{isUpgrading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Redirecting...
								</>
							) : (
								`Continue to Payment`
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpgradeModal;
