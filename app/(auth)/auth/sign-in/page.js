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
import { useCurrentUser, useSignIn } from "@/hooks/users";
import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SignInFormContent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn, isSigningIn } = useSignIn();

	const { user, error, isLoading } = useCurrentUser();

	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") || "/dashboard";

	// Redirect to home if already logged in
	useEffect(() => {
		if (!isLoading && user) {
			router.push(redirect);
		}
	}, [user, error, isLoading, router, redirect]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signIn({ email, password, redirect });

		setEmail("");
		setPassword("");
	};

	return (
		<Card className="w-full max-w-md mx-auto shadow-2xl">
			<CardHeader className="text-center space-y-2">
				<Logo className="flex items-center justify-center mx-auto mb-6" />
				<CardTitle className="text-3xl">Welcome Back</CardTitle>
				<CardDescription>
					Welcome back! Please sign in to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
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
							required
						/>
					</div>
					<Button
						type="submit"
						className="w-full h-12 text-lg"
						disabled={isSigningIn}
					>
						{isSigningIn ? (
							<>
								<Lock className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							<>
								<Lock className="mr-2 h-4 w-4" />
								Sign In
								<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
							or sign in with
						</span>
					</div>
				</div>

				{/* Social Signup */}
				<Button
					variant="outline"
					size="lg"
					disabled={isSigningIn}
					onClick={async () => signIn({ goWithGoogle: true })}
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
				<div className="mt-6 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link
						href="/auth/sign-up"
						className="font-semibold hover:text-primary transition-colors"
					>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

export default function SignIn() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-muted/30 px-4 py-16">
			<Suspense
				fallback={
					<Card className="w-full max-w-md mx-auto shadow-2xl h-137.5 flex items-center justify-center">
						<Lock className="h-8 w-8 animate-spin text-muted-foreground" />
					</Card>
				}
			>
				<SignInFormContent />
			</Suspense>
		</div>
	);
}
