import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpgrade = () => {
	const router = useRouter();
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["upgrade"],
		mutationFn: async ({ planId, userId, email, price, planName }) => {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ planId, userId, email, price, planName }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to create checkout session");
			}
			return data;
		},
		onSuccess: async (data) => {
			toast.success("Redirecting to checkout...");
			// Redirect to Stripe checkout
			router.push(data.url);
		},
		onError: (error) => {
			toast.error(error.message || "An error occurred during checkout");
		},
	});
	return { upgrade: mutateAsync, isUpgrading: isPending };
};
