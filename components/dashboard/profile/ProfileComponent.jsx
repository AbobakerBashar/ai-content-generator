"use client";

import { useGetUser } from "@/hooks/users";
import { useState } from "react";
import Header from "./Header";
import MainProfileCard from "./MainProfileCard";
import AccountInfo from "./AccountInfo";

const ProfileComponent = () => {
	const { user, isLoading } = useGetUser();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	return (
		<section className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8">
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
		</section>
	);
};

export default ProfileComponent;
