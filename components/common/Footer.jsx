import Logo from "./Logo";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 py-14 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
					<div className="flex flex-col items-center md:items-start gap-3">
						<Logo className="w-40 h-10" />
						<p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
							Create amazing content with AI. Unleash your creativity with
							ContentGenius.
						</p>
					</div>
					<div className="flex flex-wrap gap-10 justify-center md:justify-end w-full md:w-auto">
						<div>
							<h4 className="font-bold mb-3 text-white tracking-wide">
								Product
							</h4>
							<ul className="space-y-2 text-slate-400 text-sm">
								<li>
									<a
										href="/features"
										className="hover:text-blue-400 transition"
									>
										Features
									</a>
								</li>
								<li>
									<a href="/pricing" className="hover:text-blue-400 transition">
										Pricing
									</a>
								</li>
								<li>
									<a
										href="/examples"
										className="hover:text-blue-400 transition"
									>
										Examples
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-3 text-white tracking-wide">
								Company
							</h4>
							<ul className="space-y-2 text-slate-400 text-sm">
								<li>
									<a href="/about" className="hover:text-blue-400 transition">
										About
									</a>
								</li>
								<li>
									<a href="/contact" className="hover:text-blue-400 transition">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-blue-400 transition">
										Careers
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-3 text-white tracking-wide">Legal</h4>
							<ul className="space-y-2 text-slate-400 text-sm">
								<li>
									<a href="#" className="hover:text-blue-400 transition">
										Privacy
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-blue-400 transition">
										Terms
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-3 text-white tracking-wide">
								Important Links
							</h4>
							<ul className="space-y-2 text-slate-400 text-sm">
								<li>
									<a
										href="https://github.com/"
										target="_blank"
										rel="noopener"
										className="hover:text-blue-400 transition"
									>
										GitHub
									</a>
								</li>
								<li>
									<a
										href="https://twitter.com/"
										target="_blank"
										rel="noopener"
										className="hover:text-blue-400 transition"
									>
										Twitter
									</a>
								</li>
								<li>
									<a href="/faq" className="hover:text-blue-400 transition">
										FAQ
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
					<p>&copy; 2026 ContentGenius. All rights reserved.</p>
					<div className="flex gap-4">
						<a href="/privacy" className="hover:text-blue-400 transition">
							Privacy Policy
						</a>
						<a href="/terms" className="hover:text-blue-400 transition">
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
