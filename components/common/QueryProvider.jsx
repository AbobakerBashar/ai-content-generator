import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryProvider({ children }) {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
