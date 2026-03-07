import { injectAll, observeNewMessages } from "./App";

export default defineContentScript({
	matches: ["https://grok.com/*"],
	runAt: "document_idle",
	main(ctx) {
		injectAll();
		observeNewMessages(ctx);
	},
});
