"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Contact2,
	CreditCard,
	History,
	Home,
	LayoutDashboard,
	Lightbulb,
	Menu,
	Receipt,
	Settings,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogooutBtn from "../common/LogooutBtn";
import { useManageSubscription } from "@/hooks/manage-subscription";

const dashboardItems = [
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

const publicItems = [
	{
		label: "Home",
		href: "/",
		icon: Home,
	},
	{
		label: "Features",
		href: "/features",
		icon: Sparkles,
	},
	{
		label: "Pricing",
		href: "/pricing",
		icon: Receipt,
	},
	{
		label: "About",
		href: "/about",
		icon: Users,
	},
	{
		label: "Examples",
		href: "/examples",
		icon: Lightbulb,
	},
	{
		label: "Contact",
		href: "/contact",
		icon: Contact2,
	},
];

export default function MobileNav() {
	const { manageSubscription, isPending } = useManageSubscription();
	const pathname = usePathname();
	const isActive = (href) => {
		return pathname === href;
	};

	return (
		<Sheet>
			<SheetTrigger className="cursor-pointer p-2">
				<Menu className="h-6 w-6" />
			</SheetTrigger>

			<SheetContent side="left" className="w-64 p-0 flex flex-col">
				<SheetHeader className="border-b border-slate-200 dark:border-slate-700 p-6">
					<SheetTitle>Dashboard Menu</SheetTitle>
				</SheetHeader>

				<nav className="flex-1 overflow-y-auto px-4 py-6 w-full">
					{/* Dashboard Section */}
					<div className="mb-6">
						<p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 mb-2">
							Dashboard
						</p>
						<ul className="space-y-2">
							{dashboardItems.map((item) => {
								const IconComponent = item.icon;
								const active = isActive(item.href);
								return (
									<li key={item.href}>
										<SheetClose className="w-full">
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
										</SheetClose>
									</li>
								);
							})}
							<li>
								<button
									onClick={manageSubscription}
									disabled={isPending}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group w-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white`}
								>
									<CreditCard className="mr-2 h-4 w-4" />
									Manage Subscription
								</button>
							</li>
						</ul>
					</div>

					{/* Explore Section */}
					<div>
						<p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 mb-2">
							Explore
						</p>
						<ul className="space-y-2">
							{publicItems.map((item) => {
								const IconComponent = item.icon;
								const active = isActive(item.href);
								return (
									<li key={item.href}>
										<SheetClose className="w-full">
											<Link
												href={item.href}
												className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group w-full ${
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
										</SheetClose>
									</li>
								);
							})}
						</ul>
					</div>
				</nav>

				{/* Logout Button */}
				<div className="p-6 border-t border-slate-200 dark:border-slate-700">
					<LogooutBtn className="w-full flex items-center gap-2 justify-center px-4 py-5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 transition-colors" />
				</div>
			</SheetContent>
		</Sheet>
	);
}
