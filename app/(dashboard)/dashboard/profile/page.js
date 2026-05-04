import ProfileComponent from "@/components/dashboard/profile/ProfileComponent";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Profile - Dashboard",
	description: "View and edit your profile information and account settings",
};

export default function ProfilePage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8 flex items-center justify-center">
					<Loader2 className="w-8 h-8 animate-spin text-blue-600" />
				</div>
			}
		>
			<ProfileComponent />
		</Suspense>
	);
}
