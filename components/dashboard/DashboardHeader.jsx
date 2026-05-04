import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../common/ThemToggle";
import MobileNav from "./MobileNav";
import Logo from "../common/Logo";
import { getUser } from "@/actions/users";
import UserDropdown from "../common/UserDropdown";
// import { useSignOut } from "@/hooks/users";

const fetchUser = async () => {
	try {
		const user = await getUser();
		return user;
	} catch (error) {
		throw new Error(error.message || "Failed to load user data");
	}
};

const DashboardHeader = async () => {
	const user = await fetchUser();
	// const { signOut, isSigningOut } = useSignOut();

	return (
		<header className="h-16 border-b border-border sticky top-0 z-50 bg-background">
			{/* Desktop Header */}
			<nav className="hidden lg:flex items-center justify-between container mx-auto px-4 h-full">
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						Home
					</Link>
					<Link
						href="/features"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						Features
					</Link>
					<Link
						href="/pricing"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						Pricing
					</Link>
					<Link
						href="/examples"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						Examples
					</Link>
					<Link
						href="/about"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="text-muted-foreground hover:text-primary transition-colors text-sm"
					>
						Contact
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<Badge
						variant="secondary"
						className="font-mono bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 px-2.5 py-0.5"
					>
						💎 {user.credits || 0} Credits
					</Badge>

					<UserDropdown name={user.name} avatar={user.avatar} />

					<ThemeToggle />
				</div>
			</nav>
			{/* Mobile Header */}
			<div className="flex items-center justify-between w-full h-full lg:hidden px-4">
				<Link href="/dashboard" className="flex items-center gap-2">
					<Logo />
					<span className="text-lg font-semibold hidden md:inline">
						Dashboard
					</span>
				</Link>
				<div className="flex items-center gap-2">
					<MobileNav />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
