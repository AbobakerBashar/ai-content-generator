"use client";

import {
	CreditCard,
	History,
	LayoutDashboard,
	Settings,
	User,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../common/Logo";
import LogooutBtn from "../common/LogooutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetUser } from "@/hooks/users";

const DashboardSidebar = () => {
	const { user, isLoading } = useGetUser();
	const pathname = usePathname();

	const navItems = [
		{
			label: "Dashboard",
			href: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			label: "Quick Generate",
			href: "/dashboard/generate",
			icon: Zap,
		},
		{
			label: "History",
			href: "/dashboard/history",
			icon: History,
		},
		{
			label: "Credits",
			href: "/dashboard/credits",
			icon: CreditCard,
		},
		{
			label: "Settings",
			href: "/dashboard/settings",
			icon: Settings,
		},
	];

	const isActive = (href) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	return (
		<aside className="w-64 bg-background text-slate-900 dark:text-white h-screen flex flex-col sticky top-0 border-r border-slate-200 dark:border-slate-700">
			{/* Logo Section */}
			<div className="h-16 flex items-center pl-8 border-b border-slate-200 dark:border-slate-700">
				<Logo />
			</div>

			{/* Navigation Items */}
			<nav className="flex-1 overflow-y-auto px-4 py-6">
				<ul className="space-y-2">
					{navItems.map((item) => {
						const IconComponent = item.icon;
						const active = isActive(item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
										active
											? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
											: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
									}`}
								>
									<IconComponent
										className={`w-5 h-5 ${
											active
												? "text-blue-600 dark:text-blue-400"
												: "group-hover:text-blue-500 dark:group-hover:text-blue-400"
										}`}
									/>
									<span className="font-medium">{item.label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Logout Button */}
			<div className="py-6 px-4 border-t border-slate-200 dark:border-slate-700">
				<Link
					href="/dashboard/profile"
					className="w-full flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 mb-4 py-2 px-4 text-primary text-sm col-end-1"
				>
					<Avatar className="h-8 w-8 border border-border">
						{!isLoading && user?.avatar && (
							<AvatarImage src={user?.avatar} alt="User" />
						)}
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<span>{user?.name || "Profile"}</span>
				</Link>
				<LogooutBtn
					variant="outline"
					className="w-full flex items-center gap-2 justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 py-4"
				/>
			</div>
		</aside>
	);
};

export default DashboardSidebar;
