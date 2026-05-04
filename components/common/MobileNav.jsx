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
	Lightbulb,
	LogIn,
	Menu,
	Receipt,
	Settings,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogooutBtn from "./LogooutBtn";

export default function MobileNav({ isLoggedIn, manageSubscription }) {
	const pathname = usePathname();
	const isActive = (href) => {
		return pathname === href;
	};

	return (
		<Sheet>
			{/* Hamburger Icon */}
			<SheetTrigger className="cursor-pointer">
				<Menu className="h-6 w-6" />
			</SheetTrigger>

			{/* Slide-in Panel */}
			<SheetContent side="left" className="w-64">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col px-4 space-y-2 overflow-auto h-full pb-8">
					<SheetClose>
						<Link
							href="/"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Home className="mr-2 h-4 w-4" />
							Home
						</Link>
					</SheetClose>
					{isLoggedIn && (
						<SheetClose>
							<Link
								href="/dashboard"
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
									isActive("/dashboard")
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
										: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
								}`}
							>
								<Home className="mr-2 h-4 w-4" />
								Dashboard
							</Link>
						</SheetClose>
					)}
					{isLoggedIn && (
						<SheetClose>
							<Link
								href="/dashboard/generate"
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
									isActive("/dashboard/generate")
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
										: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
								}`}
							>
								<Zap className="mr-2 h-4 w-4" />
								New Generation
							</Link>
						</SheetClose>
					)}
					{isLoggedIn && (
						<SheetClose>
							<Link
								href="/history"
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
									isActive("/history")
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
										: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
								}`}
							>
								<History className="mr-2 h-4 w-4" />
								My History
							</Link>
						</SheetClose>
					)}
					<SheetClose>
						<Link
							href="/features"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/features")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Sparkles className="mr-2 h-4 w-4" />
							Features
						</Link>
					</SheetClose>
					<SheetClose>
						<Link
							href="/pricing"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/pricing")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Receipt className="mr-2 h-4 w-4" />
							Pricing
						</Link>
					</SheetClose>
					<SheetClose>
						<Link
							href="/about"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/about")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Users className="mr-2 h-4 w-4" />
							About
						</Link>
					</SheetClose>

					<SheetClose>
						<Link
							href="/examples"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/examples")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Lightbulb className="mr-2 h-4 w-4" />
							Examples
						</Link>
					</SheetClose>
					<SheetClose>
						<Link
							href="/contact"
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
								isActive("/contact")
									? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Contact2 className="mr-2 h-4 w-4" />
							Contact
						</Link>
					</SheetClose>
					{isLoggedIn ? (
						<>
							{/* <SheetClose> */}
							<button
								onClick={manageSubscription}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
									isActive("/manage-subscription")
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
										: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
								}`}
							>
								<CreditCard className="mr-2 h-4 w-4" />
								Manage Subscription
							</button>
							{/* </SheetClose> */}
							<SheetClose>
								<>
									<Link
										href="/api-settings"
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
											isActive("/api-settings")
												? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 font-semibold"
												: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
										}`}
									>
										<Settings className="mr-2 h-4 w-4" />
										API Settings
									</Link>
								</>
							</SheetClose>
							<LogooutBtn />
						</>
					) : (
						<SheetClose>
							<Link
								href="/auth/sign-up"
								className="bg-primary text-white rounded-md py-2 transition-colors w-full block mb-3 mt-6"
							>
								Get Started
							</Link>
							<Link
								href="/auth/sign-in"
								className="bg-secondary text-white rounded-md py-2 transition-colors w-full inline-flex justify-center items-center"
							>
								<LogIn className="mr-2 h-4 w-4" />
								Log in
							</Link>
						</SheetClose>
					)}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
