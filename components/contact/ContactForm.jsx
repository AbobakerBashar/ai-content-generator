"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useContact } from "@/hooks/contact";

const ContactForm = () => {
	const { sendMessage, isSending } = useContact();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await sendMessage(formData);

		if (result.success) {
			setSubmitted(true);
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		}
	};

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
			<div className="max-w-2xl mx-auto">
				<Card className="p-8">
					<CardTitle className="text-3xl font-bold mb-8">
						Send us a Message
					</CardTitle>

					{submitted ? (
						<div className="bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-500/50 rounded-lg p-6 text-center">
							<div className="text-green-700 dark:text-green-400 font-semibold mb-2">
								✓ Message Sent Successfully!
							</div>
							<p className="text-green-600 dark:text-gray-300">
								Thank you for reaching out. We&apos;ll get back to you within 24
								hours.
							</p>
							<Button
								variant="outline"
								className="mt-6 px-4 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
								onClick={() => setSubmitted(false)}
							>
								Send Another Message
							</Button>
						</div>
					) : (
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Name Field */}
								<div>
									<Label htmlFor="name" className="mb-2">
										Full Name
									</Label>
									<Input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										placeholder="John Doe"
									/>
								</div>

								{/* Email Field */}
								<div>
									<Label htmlFor="email" className="mb-2">
										Email Address
									</Label>
									<Input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										placeholder="your@email.com"
									/>
								</div>

								{/* Subject Field */}
								<div>
									<Label htmlFor="subject" className="mb-2">
										Subject
									</Label>
									<Input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										placeholder="How can we help?"
									/>
								</div>

								{/* Message Field */}
								<div>
									<Label htmlFor="message" className="mb-2">
										Message
									</Label>
									<Textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows="6"
										className="w-full resize-none h-32"
										placeholder="Tell us more about your inquiry..."
									/>
								</div>

								{/* Submit Button */}
								<Button
									type="submit"
									disabled={isSending}
									className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all h-10 md:h-12"
								>
									{isSending ? (
										<>
											<div className="w-4 h-4 border-3 border-white border-dotted rounded-full animate-spin" />
											Sending...
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											Send Message
										</>
									)}
								</Button>
							</form>
						</CardContent>
					)}
				</Card>
			</div>
		</section>
	);
};

export default ContactForm;
