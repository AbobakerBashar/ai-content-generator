import ContactForm from "@/components/contact/ContactForm";
import ContactMethods from "@/components/contact/ContactMethods";
import FAQ from "@/components/contact/FAQ";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
	title: "Contact Us",
	description: "Get in touch with our team for support, inquiries, or feedback",
};

export default function ContactPage() {
	const contactMethods = [
		{
			icon: <Mail className="w-8 h-8" />,
			title: "Email",
			description: "Send us an email anytime",
			detail: "support@aicontentgen.com",
			link: "mailto:support@aicontentgen.com",
		},
		{
			icon: <Phone className="w-8 h-8" />,
			title: "Phone",
			description: "Call us during business hours",
			detail: "+1 (555) 123-4567",
			link: "tel:+15551234567",
		},
		{
			icon: <MapPin className="w-8 h-8" />,
			title: "Address",
			description: "Visit our office",
			detail: "123 Tech Street, San Francisco, CA",
			link: "#",
		},
		{
			icon: <Clock className="w-8 h-8" />,
			title: "Hours",
			description: "Monday - Friday",
			detail: "9:00 AM - 6:00 PM PST",
			link: "#",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
						Get in Touch
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Have questions? We&apos;d love to hear from you. Send us a message
						and we&apos;ll respond as soon as possible.
					</p>
				</div>
			</section>

			{/* Contact Methods */}
			<ContactMethods contactMethods={contactMethods} />
			{/* Contact Form */}
			<ContactForm />
			{/* FAQ Section */}
			<FAQ />
			{/* CTA Section */}
		</div>
	);
}
