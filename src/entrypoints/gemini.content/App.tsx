import { createRoot } from "react-dom/client";
import { ClipButton } from "../../components/ClipButton";
import {
	findGeminiActionBar,
	getGeminiResponses,
	extractGeminiMessage,
	extractGeminiPromptBefore,
} from "../../lib/gemini-scraper";

const MARKER = "data-aichatclip";

function injectClipButton(container: Element) {
	if (container.hasAttribute(MARKER)) return;
	container.setAttribute(MARKER, "true");

	const actionBar = findGeminiActionBar(container);
	if (!actionBar) return;

	const el = document.createElement("span");
	el.setAttribute("data-aichatclip-button", "true");
	actionBar.appendChild(el);

	createRoot(el).render(
		<ClipButton
			article={container}
			source="gemini"
			extractMessage={extractGeminiMessage}
			extractPrompt={extractGeminiPromptBefore}
		/>,
	);
}

export function injectAll() {
	for (const container of getGeminiResponses()) {
		injectClipButton(container);
	}
}

export function observeNewMessages(ctx: { onInvalidated: (cb: () => void) => void }) {
	const observer = new MutationObserver(() => {
		injectAll();
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});

	ctx.onInvalidated(() => {
		observer.disconnect();
	});
}
