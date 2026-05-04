"use client";

import { Badge } from "@/components/ui/badge";
import { useManageSubscription } from "@/hooks/manage-subscription";
import { useGetUser } from "@/hooks/users";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "./ThemToggle";
import UserDropdown from "./UserDropdown";

const Header = () => {
	const { user, isLoading } = useGetUser();
	const { manageSubscription, isPending } = useManageSubscription();
	const isLoggedIn = !!user && !isLoading;

	const pathname = usePathname();
	const isActive = (href) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	useEffect(() => {
		const checkSubscriptionStatus = async () => {
			await fetch("/api/stripe/create-portal", {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Billing portal endpoint response:", data);
				})
				.catch((error) => {
					console.error("Error checking subscription status:", error);
				});
		};
		checkSubscriptionStatus();
	}, []);

	return (
		<header className="h-16 border-b border-border sticky top-0 z-50 bg-background">
			{/* Desktop Header */}
			<nav className="hidden lg:flex items-center space-x-4 px-8 h-full jstify-between">
				{isLoggedIn ? (
					<div className="flex items-center gap-3">
						<Link href="/dashboard">
							<Logo />
						</Link>
						<Link
							href="/dashboard/generate"
							className="text-muted-foreground hover:text-primary transition-colors ml-2"
						>
							New Generation
						</Link>
						<Link
							href="/dashboard"
							className="text-muted-foreground hover:text-primary transition-colors"
						>
							Dashboard
						</Link>
					</div>
				) : (
					<Link href="/">
						<Logo />
					</Link>
				)}
				<div className="flex items-center gap-3 flex-1 justify-center">
					<Link
						href="/"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/") ? "text-primary" : ""
						}`}
					>
						Home
					</Link>
					<Link
						href="/features"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/features") ? "text-primary" : ""
						}`}
					>
						Features
					</Link>
					<Link
						href="/pricing"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/pricing") ? "text-primary" : ""
						}`}
					>
						Pricing
					</Link>
					<Link
						href="/examples"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/examples") ? "text-primary" : ""
						}`}
					>
						Examples
					</Link>
					<Link
						href="/about"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/about") ? "text-primary" : ""
						}`}
					>
						About
					</Link>
					<Link
						href="/contact"
						className={`text-muted-foreground hover:text-primary transition-colors ${
							isActive("/contact") ? "text-primary" : ""
						}`}
					>
						Contact
					</Link>{" "}
				</div>
				<div className="flex items-center gap-4">
					{isLoggedIn ? (
						<>
							<Badge
								variant="secondary"
								className="font-mono bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 px-2.5 py-0.5"
							>
								💎 {user.credits || 0} Credits
							</Badge>

							<UserDropdown name={user?.name} avatar={user.avatar} />
						</>
					) : (
						<>
							<Link
								href="/auth/sign-in"
								className="bg-secondary text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-md transition-colors hover:bg-secondary/90"
							>
								Sign In
							</Link>
							<Link
								href="/auth/sign-up"
								className="bg-primary text-white px-3 py-1.5 rounded-md transition-colors hover:bg-primary/90"
							>
								Get Started
							</Link>
						</>
					)}
					<ThemeToggle />
				</div>
			</nav>
			{/* Mobile Header */}
			<div className="flex items-center justify-between w-full h-full lg:hidden  px-4">
				{isLoggedIn ? (
					<Link href="/dashboard">
						{" "}
						<Logo />
					</Link>
				) : (
					<Link href="/">
						<Logo />
					</Link>
				)}
				<div className="flex items-center gap-4 justify-end">
					<MobileNav
						isLoggedIn={isLoggedIn}
						manageSubscription={manageSubscription}
						isPending={isPending}
					/>
					<ThemeToggle isPublic={!!user} />
				</div>
			</div>
		</header>
	);
};

export default Header;
