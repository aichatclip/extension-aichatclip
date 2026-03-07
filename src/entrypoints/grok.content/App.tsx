import { createRoot } from "react-dom/client";
import { ClipButton } from "../../components/ClipButton";
import {
	findGrokActionBar,
	getGrokResponses,
	extractGrokMessage,
	extractGrokPromptBefore,
} from "../../lib/grok-scraper";

const MARKER = "data-aichatclip";

function injectClipButton(container: Element) {
	if (container.hasAttribute(MARKER)) return;
	container.setAttribute(MARKER, "true");

	const actionBar = findGrokActionBar(container);
	if (!actionBar) return;

	const el = document.createElement("span");
	el.setAttribute("data-aichatclip-button", "true");
	actionBar.appendChild(el);

	createRoot(el).render(
		<ClipButton
			article={container}
			source="grok"
			extractMessage={extractGrokMessage}
			extractPrompt={extractGrokPromptBefore}
		/>,
	);
}

export function injectAll() {
	for (const container of getGrokResponses()) {
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
