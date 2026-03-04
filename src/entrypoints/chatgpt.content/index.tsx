import { injectAll, observeNewMessages } from "./App";

export default defineContentScript({
	matches: ["https://chatgpt.com/*", "https://chat.openai.com/*"],
	runAt: "document_idle",
	main(ctx) {
		injectAll();
		observeNewMessages(ctx);
	},
});
