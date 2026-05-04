"use client";
/* eslint-disable */
import AccountInfo from "@/components/dashboard/profile/AccountInfo";
import Header from "@/components/dashboard/profile/Header";
import MainProfileCard from "@/components/dashboard/profile/MainProfileCard";
import { useGetUser } from "@/hooks/users";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
	const { user, isLoading } = useGetUser();
	const [isMounted, setIsMounted] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8 flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-blue-600" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8">
			{/* Header */}
			<Header isEditing={isEditing} setIsEditing={setIsEditing} />

			{/* Profile Cards Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
				{/* Main Profile Card */}
				<MainProfileCard
					isEditing={isEditing}
					isSaving={isSaving}
					setIsEditing={setIsEditing}
					setIsSaving={setIsSaving}
					user={user}
				/>

				{/* Right Sidebar - Account Info */}
				<AccountInfo
					isEditing={isEditing}
					isSaving={isSaving}
					user={user}
					setIsSaving={setIsSaving}
				/>
			</div>
		</div>
	);
}
