import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	modules: ["@wxt-dev/module-react"],
	manifest: {
		name: "AIChatClip",
		description: "Clip AI chat conversations",
		permissions: ["storage"],
		host_permissions: ["https://api.aichatclip.com/*", "http://localhost:*/*"],
	},
});
