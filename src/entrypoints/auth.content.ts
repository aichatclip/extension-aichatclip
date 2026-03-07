export default defineContentScript({
	matches: [
		"https://aichatclip.com/auth/extension*",
		"http://localhost:*/auth/extension*",
	],
	runAt: "document_idle",
	main() {
		const el = document.getElementById("aichatclip-token");
		const token = el?.getAttribute("data-token");
		if (token) {
			browser.runtime.sendMessage({ type: "auth-token", token });
		}
	},
});
