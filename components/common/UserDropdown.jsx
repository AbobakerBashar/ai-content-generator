"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useManageSubscription } from "@/hooks/manage-subscription";
import { useSignOut } from "@/hooks/users";
import { CreditCard, LogOut, Settings } from "lucide-react";

const UserDropdown = ({name,avatar}) => {
	const { signOut, isSigningOut } = useSignOut();
	const { manageSubscription, isPending } = useManageSubscription();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="outline-none"
				disabled={isSigningOut || isPending}
			>
				<Avatar className="h-9 w-9 border border-border">
					{avatar && (
						<AvatarImage src={avatar} alt={name || "Avatar"} />
					)}

					<AvatarFallback>RU</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuItem>
					<button
						onClick={manageSubscription}
						disabled={isPending}
						className="flex items-center gap-2"
					>
						<CreditCard className="h-4 w-4" />
						<span>Manage Subscription</span>
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>API Settings</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-red-500 cursor-pointer"
					onClick={signOut}
					disabled={isSigningOut}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
