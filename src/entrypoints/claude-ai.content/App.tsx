import { createRoot } from "react-dom/client";
import { ClipButton } from "../../components/ClipButton";
import {
	findClaudeActionBar,
	getClaudeResponses,
	extractClaudeMessage,
	extractClaudePromptBefore,
} from "../../lib/claude-scraper";

const MARKER = "data-aichatclip";

function injectClipButton(container: Element) {
	if (container.hasAttribute(MARKER)) return;
	container.setAttribute(MARKER, "true");

	const actionBar = findClaudeActionBar(container);
	if (!actionBar) return;

	const el = document.createElement("span");
	el.setAttribute("data-aichatclip-button", "true");
	actionBar.appendChild(el);

	createRoot(el).render(
		<ClipButton
			article={container}
			source="claude"
			extractMessage={extractClaudeMessage}
			extractPrompt={extractClaudePromptBefore}
		/>,
	);
}

export function injectAll() {
	for (const container of getClaudeResponses()) {
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
