"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useUpdateSettings } from "@/hooks/settings";

export function ThemeToggle({ isPublic }) {
	const { setTheme } = useTheme();
	const { updateSettings, isUpdating } = useUpdateSettings();

	const handleThemeChange = async (newTheme) => {
		setTheme(newTheme);
		await updateSettings({
			updates: { theme: newTheme },
			showMessage: false,
			isPublic,
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				disabled={isUpdating}
				className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none data-[state=open]:bg-accent"
			>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
