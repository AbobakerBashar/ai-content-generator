import { getSettings } from "@/actions/settings";
import { ThemeToggle } from "@/components/common/ThemToggle";
import DangerZone from "@/components/dashboard/settings/DangerZone";
import SendEmailAndNotify from "@/components/dashboard/settings/SendEmailAndNotify";
import UpdateEmail from "@/components/dashboard/settings/UpdateEmail";
import UpdateLang from "@/components/dashboard/settings/UpdateLang";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bell, Globe, Lock } from "lucide-react";

export const metadata = {
	title: "Settings - Dashboard",
	description: "Manage your account preferences and settings",
};

export const revalidate = 0;

const fetchSettings = async () => {
	try {
		const settings = await getSettings();
		return settings;
	} catch (error) {
		throw new Error("Failed to fetch settings: " + error.message);
	}
};

export default async function SettingsPage() {
	const settings = await fetchSettings();

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
					Settings
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Manage your account preferences
				</p>
			</div>

			{/* Settings Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				{/* Account Settings */}
				<Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
					<div className="flex items-center mb-6">
						<Lock className="w-5 h-5 text-blue-600 mr-3" />
						<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
							Account
						</h2>
					</div>

					<div className="space-y-4">
						<UpdateEmail email={settings.user?.email} />
					</div>
				</Card>

				{/* Theme Settings */}
				<Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
					<div className="flex items-center mb-6">
						<Globe className="w-5 h-5 text-purple-600 mr-3" />
						<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
							Appearance
						</h2>
					</div>

					<div className="space-y-4">
						<div>
							<Label className="text-slate-700 dark:text-slate-300 mb-3 block">
								Theme
							</Label>
							<div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
								<span className="text-slate-700 dark:text-slate-300">
									{settings.theme?.trim() === "system"
										? "System Default"
										: settings.theme === "dark"
											? "Dark Mode"
											: "Light Mode"}
								</span>
								<ThemeToggle />
							</div>
						</div>
					</div>
				</Card>

				{/* Notification Settings */}
				<Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
					<div className="flex items-center mb-6">
						<Bell className="w-5 h-5 text-orange-600 mr-3" />
						<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
							Notifications
						</h2>
					</div>

					<div className="space-y-4">
						<SendEmailAndNotify
							sendEmail={settings.email_about_credits_usage}
							notify={settings.notify_on_new_features}
						/>
					</div>
				</Card>

				{/* Language Settings */}
				<Card className="p-6 dark:bg-slate-900 dark:border-slate-800">
					<div className="flex items-center mb-6">
						<Globe className="w-5 h-5 text-green-600 mr-3" />
						<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
							Language
						</h2>
					</div>

					<div className="space-y-4">
						<UpdateLang language={settings.language} />
					</div>
				</Card>
			</div>

			{/* Danger Zone */}
			<DangerZone />
		</div>
	);
}
