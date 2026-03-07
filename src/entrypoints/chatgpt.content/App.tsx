import { createRoot } from "react-dom/client";
import { ClipButton } from "../../components/ClipButton";
import {
	findActionBar,
	getAssistantArticles,
	extractAssistantMessage,
	extractPromptBefore,
} from "../../lib/scraper";

const MARKER = "data-aichatclip";

function injectClipButton(article: Element) {
	if (article.hasAttribute(MARKER)) return;
	article.setAttribute(MARKER, "true");

	const actionBar = findActionBar(article);
	if (!actionBar) return;

	const container = document.createElement("span");
	container.setAttribute("data-aichatclip-button", "true");
	actionBar.appendChild(container);

	createRoot(container).render(
		<ClipButton
			article={article}
			source="chatgpt"
			extractMessage={extractAssistantMessage}
			extractPrompt={extractPromptBefore}
		/>,
	);
}

export function injectAll() {
	for (const article of getAssistantArticles()) {
		injectClipButton(article);
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
