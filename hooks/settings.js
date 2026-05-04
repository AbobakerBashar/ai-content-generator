import { getSession } from "@/actions/users";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Update Settings Hook
export function useUpdateSettings() {
	const router = useRouter();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["updateSettings"],
		mutationFn: async ({ updates, showMessage, isPublic }) => {
			const emmail = updates?.email?.trim();
			if (emmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emmail)) {
				throw new Error("Please enter a valid email address");
			}
			const session = await getSession();
			const token = session?.access_token || "";
			const response = await fetch("/api/settings/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ updates, isPublic }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update settings");
			}
			return { data: await response.json(), showMessage };
		},
		onSuccess: ({ data, showMessage }) => {
			if (showMessage)
				toast.success(data.message || "Settings updated successfully!");
			router.refresh();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update settings");
		},
	});
	return { updateSettings: mutateAsync, error, isUpdating: isPending };
}
