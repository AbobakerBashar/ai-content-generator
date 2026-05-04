"use client";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser, useSignUp } from "@/hooks/users";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [password, setPassword] = useState("");

	const { user, error, isLoading } = useCurrentUser();
	const { signUp, isSigningUp } = useSignUp();

	const router = useRouter();

	// Redirect to home if already logged in
	useEffect(() => {
		if (!isLoading && user) {
			router.push("/dashboard");
		}
	}, [user, error, isLoading, router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSuccess(false);
		const resulte = await signUp({ email, password, name });
		if (resulte?.success) {
			setIsSuccess(true);
		}
		setEmail("");
		setPassword("");
		setName("");
	};
	if (isSuccess) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-4">
				<Logo className="mx-auto mb-4" />
				<h2 className="text-xl font-semibold text-green-600">
					Account created 🎉
				</h2>
				<p className="text-gray-500 mt-2">
					Please check your email to verify your account before logging in.
				</p>
			</div>
		);
	}
	return (
		<div className="min-h-screen py-16 flex items-center justify-center bg-linear-to-b from-background to-muted/30 px-4">
			<Card className="w-full max-w-md mx-auto shadow-2xl">
				<CardHeader className="text-center space-y-2">
					<Logo className="mx-auto mb-4" />
					<CardTitle className="text-3xl">Create Account</CardTitle>
					<CardDescription>
						Join thousands of creators using AI content.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="name"
								placeholder="John Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								// required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="your@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								// required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								// required
							/>
						</div>
						<Button
							type="submit"
							className="w-full h-12 text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 "
							disabled={isSigningUp}
						>
							{isSigningUp ? (
								<>
									<span className="mr-2 h-4 w-4 border-3 border-white rounded-full border-dotted animate-spin" />
									Creating Account...
								</>
							) : (
								<>
									<User className="mr-2 h-4 w-4" />
									Sign Up
									<ArrowRight className="ml-2 w-4 h-4" />
								</>
							)}
						</Button>
					</form>
					{/* Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200 dark:border-gray-700" />
						</div>
						<div className="relative flex justify-center">
							<span className="px-4 bg-card text-sm text-muted-foreground">
								or sign up with
							</span>
						</div>
					</div>

					{/* Social Signup */}
					<Button
						variant="outline"
						size="lg"
						disabled={isSigningUp}
						onClick={async () => signUp({ goWithGoogle: true })}
						className="flex items-center justify-center gap-2 text-lg py-4 px-4 font-medium w-full"
					>
						<Image
							src="/svgs/google.svg"
							alt="Google"
							className="w-6 h-6"
							width={20}
							height={20}
						/>
						Google
					</Button>

					<div className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-1">
						<p>Already have an account?</p>
						<Link
							href="/auth/sign-in"
							className="font-semibold hover:text-primary transition-colors"
						>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
