"use server";

import { createClient } from "@/utils/supabase/server";

// Get session
export const getSession = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		throw new Error(error.message);
	}
	return data?.session || null;
};

// Get user
export const getCurrentUser = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		return null;
	}

	return data?.user || null;
};

export const getUser = async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		return null;
	}
	if (!data) {
		return null;
	}
	const { data: user, error: profileError } = await supabase
		.from("users")
		.select("*")
		.eq("id", data.user.id)
		.single();
	if (profileError) {
		throw new Error(profileError.message);
	}
	return user;
};

// Sign out function
export const signOut = async () => {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw new Error(error.message);
	}
};

// Update user profileicture
export const updateUserAvatar = async (
	avatar,
	oldPath,
	removeAvatar = false,
) => {
	try {
		const session = await getSession();
		if (!session) throw new Error("Unauthorized");

		const supabase = await createClient();
		// If removing avatar, delete old one and update profile
		if (removeAvatar) {
			let oldFileName = oldPath
				?.split("storage/v1/object/public/avatars/")
				.pop();
			if (oldFileName)
				oldFileName = decodeURIComponent(oldFileName?.split("?")[0]);

			const { error: deleteError } = await supabase.storage
				.from("avatars")
				.remove([oldFileName]);
			if (deleteError) {
				throw deleteError;
			}
			await supabase
				.from("users")
				.update({ avatar: null })
				.eq("id", session.user.id);
			return;
		} else if (!avatar) throw new Error("No avatar file provided");
		const extension = avatar.name.split(".").pop();

		if (!extension || !avatar.type.startsWith("image/"))
			throw new Error("Invalid file type. Only image files are allowed.");

		// Delete old avatar if it exists
		if (oldPath && oldPath.includes("storage/v1/object/public/avatars/")) {
			let oldFileName = oldPath
				?.split("storage/v1/object/public/avatars/")
				.pop();
			if (oldFileName)
				oldFileName = decodeURIComponent(oldFileName?.split("?")[0]);
			const { error: deleteError } = await supabase.storage
				.from("avatars")
				.remove([oldFileName]);
			if (deleteError) {
				throw deleteError;
			}
		}
		// Upload new avatar

		const fileName = `${session.user.id}/avatar.${extension}`;
		const { error: uploadError } = await supabase.storage
			.from("avatars")
			.upload(fileName, avatar);
		if (uploadError) {
			throw uploadError;
		}

		const { data: publicURLData } = supabase.storage
			.from("avatars")
			.getPublicUrl(fileName);

		const publicURL =
			publicURLData.publicUrl ||
			`https://xcggghfvzzozptrsgcir.supabase.co/storage/v1/object/public/avatars/${fileName}`;

		const { data: user, error: userError } = await supabase
			.from("users")
			.update({ avatar: publicURL })
			.eq("id", session.user.id);
		if (userError) {
			throw userError;
		}
		return user;
	} catch (error) {
		throw new Error(error.message || "Failed to update avatar");
	}
};

// Update user
export const updateUser = async ({ updates, userId }) => {
	const supabase = await createClient();
	const { data: user, error } = await supabase
		.from("users")
		.update(updates)
		.eq("id", userId)
		.single();
	if (error) {
		throw error;
	}
	return user;
};
