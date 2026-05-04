import {
	getCurrentUser,
	getSession,
	getUser,
	signOut,
	updateUserAvatar,
} from "@/actions/users";
import { createClient as browserClient } from "@/utils/supabase/browser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetUser = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});
	return { user: data, error, isLoading };
};

// Get session hook
export const useCurrentUser = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const sessionData = await getCurrentUser();
			return sessionData;
		},
	});
	return { user: data, error, isLoading };
};

// Sign up hook
export const useSignUp = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["signup"],
		mutationFn: async ({ email, password, name, goWithGoogle }) => {
			if (goWithGoogle) {
				const supabase = browserClient();
				await supabase.auth.signInWithOAuth({
					provider: "google",
					options: {
						redirectTo: `${location.origin}/auth/callback`,
					},
				});
				return;
			}

			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, name }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to sign up");
			}
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.invalidateQueries(["session"]);
		},
		onError: (error) => {
			toast.error(error?.message || "Error signing up");
		},
	});
	return { signUp: mutateAsync, error, isSigningUp: isPending };
};

// Sign in hook
export const useSignIn = () => {
	const queryClient = useQueryClient();
	const route = useRouter();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["signin"],
		mutationFn: async ({ email, password, redirectTo, goWithGoogle }) => {
			if (goWithGoogle) {
				const supabase = browserClient();
				await supabase.auth.signInWithOAuth({
					provider: "google",
					options: {
						redirectTo: `${location.origin}/auth/callback?next=${redirectTo}`,
					},
				});
				return;
			}

			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to sign in");
			}
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.invalidateQueries(["session"]);
			toast.success("Signed in successfully");
			route.push("/dashboard");
		},
		onError: (error) => {
			toast.error(error?.message || "Error signing in");
		},
	});
	return {
		signIn: mutateAsync,
		error,
		isSigningIn: isPending,
	};
};

// Sign out hook
export const useSignOut = () => {
	const route = useRouter();
	const queryClient = useQueryClient();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["signout"],
		mutationFn: signOut,
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.invalidateQueries(["session"]);
			toast.success("Signed out successfully");
			route.push("/auth/sign-in");
		},
		onError: (error) => {
			toast.error("Error signing out");
			console.error("Error signing out:", error);
		},
	});
	return { signOut: mutateAsync, error, isSigningOut: isPending };
};

// Update user profile hook
export const useUpdateUserProfile = () => {
	const queryClient = useQueryClient();
	const route = useRouter();

	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["updateUserProfile"],
		mutationFn: async (updates) => {
			const response = await fetch("/api/users", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ updates }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to update profile");
			}
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			toast.success("Profile updated successfully");
		},
		onError: (error) => {
			toast.error(error?.message || "Failed to update profile");
		},
	});
	return {
		updateProfile: mutateAsync,
		error,
		isUpdating: isPending,
	};
};

// Update user avatar hook
export const useUpdateUserAvatar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["updateUserAvatar"],
		mutationFn: async ({ avatar, oldPath, removeAvatar }) => {
			updateUserAvatar(avatar, oldPath, removeAvatar);
			return { removeAvatar };
		},
		onSuccess: ({ removeAvatar }) => {
			queryClient.invalidateQueries(["user"]);
			toast.success(
				removeAvatar
					? "Avatar removed successfully"
					: "Avatar updated successfully",
			);
		},
		onError: (error) => {
			toast.error(error?.message || "Failed to update avatar");
		},
	});
	return {
		updateAvatar: mutateAsync,
		error,
		isUpdating: isPending,
	};
};

// Delete user account hook
export const useDeleteUserAccount = () => {
	const queryClient = useQueryClient();
	const route = useRouter();
	const { mutateAsync, error, isPending } = useMutation({
		mutationKey: ["deleteUserAccount"],
		mutationFn: async () => {
			const session = await getSession();
			const token = session?.access_token || "";
			const response = await fetch("/api/users/delete", {
				method: "DELETE",
				body: JSON.stringify({ userId: session?.user?.id }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to delete account");
			}
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.invalidateQueries(["session"]);
			toast.success("Account deleted successfully");
			route.push("/auth/sign-up");
		},
		onError: (error) => {
			toast.error(error?.message || "Failed to delete account");
		},
	});
	return {
		deleteAccount: mutateAsync,
		error,
		isDeleting: isPending,
	};
};
