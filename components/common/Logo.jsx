import Image from "next/image";

const Logo = ({ className }) => {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{/* Light Mode Logo */}
			<Image
				src="/svgs/logo-light.svg"
				alt="SPARKGEN Logo"
				width={140}
				height={40}
				className="block dark:hidden"
			/>
			{/* Dark Mode Logo */}
			<Image
				src="/svgs/logo-dark.svg"
				alt="SPARKGEN Logo"
				width={140}
				height={40}
				className="hidden dark:block"
			/>
		</div>
	);
};

export default Logo;
