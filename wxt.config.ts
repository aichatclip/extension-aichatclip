import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	modules: ["@wxt-dev/module-react"],
	dev: {
		server: { port: 3100 },
	},
	manifest: {
		name: "AIChatClip",
		description: "Clip AI chat conversations",
		icons: {
			16: "icons/icon-16.png",
			48: "icons/icon-48.png",
			128: "icons/icon-128.png",
		},
		permissions: ["storage"],
		host_permissions: [
			"https://chatgpt.com/*",
			"https://chat.openai.com/*",
			"https://claude.ai/*",
			"https://gemini.google.com/*",
			"https://grok.com/*",
			"https://aichatclip.com/*",
		],
		browser_specific_settings: {
			gecko: {
				id: "extension@aichatclip.com",
				strict_min_version: "140.0",
				data_collection_permissions: {
					required: ["websiteContent", "browsingActivity"],
				},
			},
		},
	},
});
