"use client";

import ThemeProvider from "@/components/common/ThemeProvider";
import QueryProvider from "./QueryProvider";

export default function Providers({ children }) {
	return (
		<ThemeProvider>
			<QueryProvider>{children}</QueryProvider>
		</ThemeProvider>
	);
}
