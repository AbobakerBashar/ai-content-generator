"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const VideoModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* 1. The Trigger Button */}
			<Button
				variant="outline"
				className="px-8 h-10 md:h-12 rounded-lg text-lg hover:bg-accent transition-colors w-1/2 sm:w-auto"
				onClick={() => setIsOpen(true)}
			>
				Watch Demo
			</Button>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<Button
							variant="ghost"
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 p-2 rounded-full"
						>
							<X className="w-5 h-5" />
						</Button>

						<video
							src={`/video-demo.mp4`}
							controls
							autoPlay
							className="w-full h-full"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default VideoModal;
