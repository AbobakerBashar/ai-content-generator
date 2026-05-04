import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const PublickLayout = ({ children }) => {
	return (
		<>
			<Header />
			<main className="relative min-h-screen">{children}</main>
			<Footer />
		</>
	);
};

export default PublickLayout;
