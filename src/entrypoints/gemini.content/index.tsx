import { injectAll, observeNewMessages } from "./App";

export default defineContentScript({
	matches: ["https://gemini.google.com/*"],
	runAt: "document_idle",
	main(ctx) {
		injectAll();
		observeNewMessages(ctx);
	},
});
