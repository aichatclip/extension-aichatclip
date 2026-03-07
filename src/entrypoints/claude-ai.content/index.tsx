import { injectAll, observeNewMessages } from "./App";

export default defineContentScript({
	matches: ["https://claude.ai/*"],
	runAt: "document_idle",
	main(ctx) {
		injectAll();
		observeNewMessages(ctx);
	},
});
