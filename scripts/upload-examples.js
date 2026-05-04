#!/usr/bin/env node

/**
 * Upload examples to Supabase
 * Run with: node scripts/upload-examples.js
 */

const path = require("path");

// Load environment variables
require("dotenv").config({
	path: path.resolve(process.cwd(), ".env.local"),
});

const { createClient } = require("@supabase/supabase-js");
const examplesData = require("../utils/seedData/examples.json");

async function uploadExamples() {
	try {
		console.log("📡 Connecting to Supabase...");

		const supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.SUPABASE_SERVICE_ROLE_KEY,
		);

		console.log(`📝 Uploading ${examplesData.length} examples...`);

		// Option 1: Insert new examples (may fail if they exist)
		// const { data, error } = await supabase
		// 	.from("examples")
		// 	.insert(examplesData)
		// 	.select();

		// Option 2: Upsert (insert or update if exists)
		const { data, error } = await supabase
			.from("examples")
			.upsert(examplesData, { onConflict: "id" })
			.select();

		if (error) {
			console.error("❌ Error uploading examples:", error);
			process.exit(1);
		}

		console.log(`✅ Successfully uploaded ${data.length} examples!`);
		console.log("\nUploaded examples:");
		data.forEach((example) => {
			console.log(`  - ${example.title} (${example.type})`);
		});

		process.exit(0);
	} catch (error) {
		console.error("❌ Upload failed:", error.message);
		process.exit(1);
	}
}

uploadExamples();
