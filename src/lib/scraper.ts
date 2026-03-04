/** ChatGPT DOM からアシスタントメッセージのテキストを抽出する */
export function extractAssistantMessage(article: Element): string | null {
	// data-message-author-role 属性で判定
	const authorRole = article.querySelector("[data-message-author-role]");
	if (authorRole && authorRole.getAttribute("data-message-author-role") !== "assistant") {
		return null;
	}

	// マークダウンコンテナを探す
	const markdown =
		article.querySelector(".markdown") ??
		article.querySelector("[data-message-author-role='assistant']");
	if (!markdown) return null;

	return markdown.textContent?.trim() ?? null;
}

/** ユーザープロンプトを取得（アシスタントメッセージの直前のユーザーメッセージ） */
export function extractPromptBefore(article: Element): string | null {
	let prev = article.previousElementSibling;
	while (prev) {
		const role = prev.querySelector("[data-message-author-role='user']");
		if (role) {
			return role.textContent?.trim() ?? null;
		}
		prev = prev.previousElementSibling;
	}
	return null;
}

/** アシスタントメッセージのアクションバーを探す（ClipButton注入先） */
export function findActionBar(article: Element): Element | null {
	// ChatGPTのアクションバー: コピー/いいねボタンが並ぶ領域
	// data-testid を優先
	const testIdBar = article.querySelector(
		"[data-testid='conversation-turn-action-button']",
	)?.parentElement;
	if (testIdBar) return testIdBar;

	// フォールバック: 最後の flex コンテナ（ボタン群がある領域）
	const buttons = article.querySelectorAll("button");
	if (buttons.length === 0) return null;
	const lastButton = buttons[buttons.length - 1];
	return lastButton?.parentElement ?? null;
}

/** すべてのアシスタントメッセージ article 要素を取得 */
export function getAssistantArticles(): Element[] {
	// article 要素で data-testid^="conversation-turn" を持つもの
	const articles = document.querySelectorAll("article[data-testid^='conversation-turn']");
	if (articles.length > 0) {
		return Array.from(articles).filter((el) => {
			const role = el.querySelector("[data-message-author-role='assistant']");
			return role !== null;
		});
	}

	// フォールバック: [data-message-author-role="assistant"] の祖先 article
	const assistantRoles = document.querySelectorAll("[data-message-author-role='assistant']");
	return Array.from(assistantRoles)
		.map((el) => el.closest("article"))
		.filter((el): el is Element => el !== null);
}
