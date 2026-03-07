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
		permissions: ["storage"],
		host_permissions: [
			"https://api.aichatclip.com/*",
			"http://localhost:*/*",
			"https://aichatclip.com/*",
			"https://gemini.google.com/*",
			"https://grok.com/*",
			"https://claude.ai/*",
		],
	},
});
