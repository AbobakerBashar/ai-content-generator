import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useSignOut } from "@/hooks/users";

const LogooutBtn = ({ className, variant }) => {
	const { signOut, isSigningOut } = useSignOut();

	return (
		<Button
			variant={variant}
			className={className}
			disabled={isSigningOut}
			onClick={async () => await signOut()}
		>
			<LogOut className="mr-2 h-4 w-4" />
			Sign out
		</Button>
	);
};

export default LogooutBtn;
