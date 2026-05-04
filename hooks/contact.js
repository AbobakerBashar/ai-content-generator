import { getCurrentUser } from "@/actions/users";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContact = () => {
	const { mutateAsync, isPending, error } = useMutation({
		mutationKey: ["contact"],
		mutationFn: async ({ name, email, subject, message }) => {
			const user = await getCurrentUser();
			const is_guest = !user;
			const user_id = user?.id || null;
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					subject,
					message,
					is_guest,
					user_id,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to send message");
			}
			return response.json();
		},
		onSuccess: (data) => {
			toast.success("Message sent successfully!");
			console.log("Message sent successfully:", data);
		},
		onError: (error) => {
			toast.error(error.message || "Failed to send message. Please try again.");
			console.error("Error sending message:", error);
		},
	});
	return { sendMessage: mutateAsync, isSending: isPending, error };
};
