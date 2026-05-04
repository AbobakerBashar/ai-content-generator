import { Star, StarHalf } from "lucide-react";

const Testimonail = ({ testimonial, rating = 4.5 }) => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
				<div className="flex gap-4 mb-6 items-center">
					{[...Array(Math.ceil(rating))].map((_, i) => (
						<span key={i} className="text-2xl">
							{rating < i + 1 ? (
								<>
									<span>
										<StarHalf
											className="w-6 h-6 text-primary dark:hidden inline"
											fill="oklch(0.205 0 0)"
										/>
										<StarHalf
											className="w-6 h-6 dark:hidden rotate-y-180 -translate-x-full text-primary inline"
											fill="oklch(0.97 0 0)"
										/>
									</span>
									<span>
										<StarHalf
											className="w-6 h-6 text-primary hidden dark:inline"
											fill="hsl(262.1 83.3% 57.8%)"
										/>
										<StarHalf
											className="w-6 h-6 hidden dark:inline rotate-y-180 -translate-x-full text-primary"
											fill="oklch(0.269 0 0)"
										/>
									</span>
								</>
							) : (
								<>
									<Star
										className="w-6 h-6 text-primary dark:hidden"
										fill="oklch(0.205 0 0)"
									/>
									<Star
										className="w-6 h-6 text-primary hidden dark:inline"
										fill="hsl(262.1 83.3% 57.8%)"
									/>
								</>
							)}
						</span>
					))}
				</div>
				<blockquote className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-relaxed">
					&ldquo;{testimonial?.quote}&rdquo;
				</blockquote>
				<div>
					<p className="font-semibold text-foreground">{testimonial?.author}</p>
					<p className="text-muted-foreground">{testimonial?.role}</p>
				</div>
			</div>
		</div>
	);
};

export default Testimonail;
