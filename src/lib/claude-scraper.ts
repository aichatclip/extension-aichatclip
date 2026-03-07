import { turndown } from "./scraper";

/** Claude DOM からアシスタントメッセージを Markdown として抽出する */
export function extractClaudeMessage(container: Element): string | null {
	const markdown = container.querySelector(".font-claude-response");
	if (!markdown) return null;

	const clone = markdown.cloneNode(true) as Element;

	// 思考過程のトグルボタンとその内容を除外
	for (const el of clone.querySelectorAll("button[aria-expanded]")) {
		// トグルボタンとその隣接する折りたたみコンテンツを除去
		const next = el.nextElementSibling;
		if (next?.classList.contains("grid")) {
			next.remove();
		}
		el.remove();
	}

	return turndown.turndown(clone.innerHTML).trim() || null;
}

/** ユーザープロンプトを取得（アシスタントメッセージの直前のユーザーメッセージ） */
export function extractClaudePromptBefore(container: Element): string | null {
	let prev = container.previousElementSibling;
	while (prev) {
		const userMsg = prev.querySelector("[data-testid='user-message']");
		if (userMsg) {
			return userMsg.textContent?.trim() ?? null;
		}
		prev = prev.previousElementSibling;
	}
	return null;
}

/** レスポンスコンテナ内のアクションバーを探す（ClipButton 注入先） */
export function findClaudeActionBar(container: Element): Element | null {
	return (
		container.querySelector("[aria-label='Message actions']") ?? null
	);
}

/** すべての Claude アシスタントレスポンスを取得 */
export function getClaudeResponses(): Element[] {
	return Array.from(
		document.querySelectorAll("div[data-is-streaming]"),
	).filter((el) => el.querySelector(".font-claude-response") !== null);
}
