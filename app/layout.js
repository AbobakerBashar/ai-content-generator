import "./globals.css";

import Providers from "@/components/common/Providers";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space",
});

export const metadata = {
	title: "AI Content Generator",
	description:
		"A simple AI content generator built with Next.js, Tailwind CSS, and Supabase. Generate blog posts, product descriptions, and more with the power of AI.",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
		>
			<body className="bg-background font-sans text-foreground selection:bg-primary/30">
				{/* Modern Ambient Background */}
				<div className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-background">
					<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-50 blur-[100px]"></div>
					<div className="absolute bottom-1/4 right-1/4 h-66.5 w-66.5 rounded-full bg-secondary/25 opacity-60 blur-[90px]"></div>
				</div>
				<Providers>
					{children}
					<Toaster position="top-center" richColors />
				</Providers>
			</body>
		</html>
	);
}
