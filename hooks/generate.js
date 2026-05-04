import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGenerate = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationKey: ["generatation"],
		mutationFn: async ({ prompt, content_type }) => {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content_type, prompt }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to generate content");
			}

			const data = await response.json();
			return { content: data.text };
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["generatation"]);
		},
		onError: (error) => {
			console.error("Error generating content:", error);
			toast.error(error.message);
		},
	});

	return {
		generate: mutation.mutateAsync,
		isGenerating: mutation.isPending,
		error: mutation.error,
	};
};

// Get all Generations Hook
export const useGenerations = () => {
	const mutation = useMutation({
		mutationKey: ["generatation"],
		mutationFn: async () => {
			const response = await fetch("/api/generations", {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("Failed to fetch generations");
			}
			const data = await response.json();
			return data;
		},
	});

	return {
		generations: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
	};
};

// Delete Generation Hook
export const useDeleteGeneration = () => {
	const route = useRouter();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationKey: ["generatation"],
		mutationFn: async (id) => {
			const response = await fetch(`/api/generations/delete/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(response.statusText || "Failed to delete generation");
			}
			const data = await response.json();
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["generatation"]);
			toast.success("Generation deleted successfully");
			route.refresh();
		},
		onError: (error) => {
			console.error("Error deleting generation:", error);
			toast.error(error.message);
		},
	});

	return {
		deleteGeneration: mutation.mutateAsync,
		isDeleting: mutation.isPending,
		error: mutation.error,
	};
};
