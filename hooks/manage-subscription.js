import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useManageSubscription = () => {
	const router = useRouter();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["manageSubscription"],
		mutationFn: async () => {
			const response = await fetch("/api/stripe/create-portal", {
				method: "POST",
			});
			if (!response.ok) {
				// Try to read the error message from the backend, fallback if it's HTML
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.error || `Server error: ${response.status}`);
			}
			const data = await response.json();

			if (data.url) {
				// Redirect the user to Stripe's hosted portal
				window.location.href = data.url;
			} else {
				throw new Error("No URL returned from billing portal endpoint");
			}
		},
		onSuccess: () => {
			toast.success("Redirecting to billing portal...");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to load billing portal");
			console.error("Error managing subscription:", error);
		},
	});
	return { manageSubscription: mutateAsync, isPending, error };
};
