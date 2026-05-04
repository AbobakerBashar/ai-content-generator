"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import DeleteAccountModal from "../profile/DeleteAccountModal";

const DangerZone = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<Card className="p-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 mt-6 max-w-4xl">
				<h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">
					Danger Zone
				</h2>
				<Button
					variant="destructive"
					onClick={() => setIsModalOpen(true)}
					className="bg-red-600 hover:bg-red-700 text-red-100"
				>
					Delete Account
				</Button>
				<p className="text-sm text-red-700 dark:text-red-300 mt-2">
					This action cannot be undone. All your data will be permanently
					deleted.
				</p>
			</Card>
			<DeleteAccountModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};

export default DangerZone;
