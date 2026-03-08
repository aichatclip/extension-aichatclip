import { turndown } from "./scraper";

/** Gemini DOM からアシスタントメッセージを Markdown として抽出する */
export function extractGeminiMessage(container: Element): string | null {
	const markdown = container.querySelector(".markdown.markdown-main-panel");
	if (!markdown) return null;

	// thoughts-container（思考過程）を除外してクローンする
	const clone = markdown.cloneNode(true) as Element;
	for (const thoughts of clone.querySelectorAll(".thoughts-container")) {
		thoughts.remove();
	}

	return turndown.turndown(clone.innerHTML).trim() || null;
}

/** ユーザープロンプトを取得（レスポンスコンテナの直前のユーザーメッセージ） */
export function extractGeminiPromptBefore(container: Element): string | null {
	// 1. 兄弟要素を遡って探す
	let prev = container.previousElementSibling;
	while (prev) {
		const queryText = prev.querySelector(".query-text");
		if (queryText) {
			return queryText.textContent?.trim() ?? null;
		}
		if (prev.classList.contains("user-query-container")) {
			const text = prev.querySelector(".query-text");
			return text?.textContent?.trim() ?? null;
		}
		prev = prev.previousElementSibling;
	}

	// 2. フォールバック: 親を辿りながら直前の兄弟を探す
	let current: Element | null = container;
	while (current) {
		const parent = current.parentElement;
		if (!parent) break;
		let parentPrev = current.previousElementSibling;
		while (parentPrev) {
			const queryText = parentPrev.querySelector(".query-text");
			if (queryText) {
				return queryText.textContent?.trim() ?? null;
			}
			parentPrev = parentPrev.previousElementSibling;
		}
		current = parent;
	}

	return null;
}

/** レスポンスコンテナ内のアクションバーを探す（ClipButton 注入先） */
export function findGeminiActionBar(container: Element): Element | null {
	const buttons = container.querySelector(".buttons-container-v2");
	if (buttons) return buttons;

	const actions = container.querySelector(".conversation-actions-container");
	return actions ?? null;
}

/** すべての Gemini レスポンスコンテナを取得 */
export function getGeminiResponses(): Element[] {
	return Array.from(
		document.querySelectorAll(".response-container"),
	).filter((el) => el.querySelector(".markdown.markdown-main-panel") !== null);
}
