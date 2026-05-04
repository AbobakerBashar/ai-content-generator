import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
	return (
		<div className="flex flex-col lg:flex-row min-h-screen">
			{/* Sidebar - Hidden on mobile */}
			<div className="hidden lg:block">
				<DashboardSidebar />
			</div>

			{/* Main Area */}
			<div className="flex-1 flex flex-col">
				<DashboardHeader />
				<main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}
