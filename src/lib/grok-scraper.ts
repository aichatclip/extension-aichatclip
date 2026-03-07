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
	let prev = container.previousElementSibling;
	while (prev) {
		// ユーザーメッセージは items-end クラスを持つ
		if (
			prev.id?.startsWith("response-") &&
			prev.classList.contains("items-end")
		) {
			const text = prev.querySelector(".response-content-markdown");
			return text?.textContent?.trim() ?? null;
		}
		prev = prev.previousElementSibling;
	}
	return null;
}

/** レスポンスコンテナ内のアクションバーを探す（ClipButton 注入先） */
export function findGrokActionBar(container: Element): Element | null {
	return container.querySelector(".action-buttons") ?? null;
}

/** すべての Grok アシスタントレスポンスを取得 */
export function getGrokResponses(): Element[] {
	// アシスタントメッセージは items-start クラスを持つ
	return Array.from(
		document.querySelectorAll("div[id^='response-'].items-start"),
	).filter((el) => el.querySelector(".response-content-markdown") !== null);
}
