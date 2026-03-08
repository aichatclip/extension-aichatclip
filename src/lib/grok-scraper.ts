import { turndown } from "./scraper";

/** Grok DOM からアシスタントメッセージを Markdown として抽出する */
export function extractGrokMessage(container: Element): string | null {
	const markdown = container.querySelector(".response-content-markdown");
	if (!markdown) return null;

	// thinking-container（思考過程）を除外してクローンする
	const clone = markdown.cloneNode(true) as Element;
	for (const thoughts of clone.querySelectorAll(".thinking-container")) {
		thoughts.remove();
	}

	return turndown.turndown(clone.innerHTML).trim() || null;
}

/** ユーザープロンプトを取得（レスポンスの直前のユーザーメッセージ） */
export function extractGrokPromptBefore(container: Element): string | null {
	// 1. 兄弟要素を遡って探す
	let prev = container.previousElementSibling;
	while (prev) {
		if (
			prev.id?.startsWith("response-") &&
			prev.classList.contains("items-end")
		) {
			const text = prev.querySelector(".response-content-markdown");
			return text?.textContent?.trim() ?? null;
		}
		prev = prev.previousElementSibling;
	}

	// 2. フォールバック: 親を辿りながらユーザーメッセージを探す
	let current: Element | null = container;
	while (current) {
		const parent = current.parentElement;
		if (!parent) break;
		let parentPrev = current.previousElementSibling;
		while (parentPrev) {
			// 直接マッチ
			if (
				parentPrev.id?.startsWith("response-") &&
				parentPrev.classList.contains("items-end")
			) {
				const text = parentPrev.querySelector(".response-content-markdown");
				return text?.textContent?.trim() ?? null;
			}
			// 子孫にユーザーメッセージがある場合
			const userMsg = parentPrev.querySelector("div[id^='response-'].items-end");
			if (userMsg) {
				const text = userMsg.querySelector(".response-content-markdown");
				return text?.textContent?.trim() ?? null;
			}
			parentPrev = parentPrev.previousElementSibling;
		}
		current = parent;
	}

	return null;
}

/** レスポンスコンテナ内のアクションバーを探す（ClipButton 注入先） */
export function findGrokActionBar(container: Element): Element | null {
	const actionButtons = container.querySelector(".action-buttons");
	if (!actionButtons) return null;
	// ネイティブボタンが並ぶ内側のコンテナに追加する
	return actionButtons.querySelector(":scope > div") ?? actionButtons;
}

/** すべての Grok アシスタントレスポンスを取得 */
export function getGrokResponses(): Element[] {
	// アシスタントメッセージは items-start クラスを持つ
	return Array.from(
		document.querySelectorAll("div[id^='response-'].items-start"),
	).filter((el) => el.querySelector(".response-content-markdown") !== null);
}
