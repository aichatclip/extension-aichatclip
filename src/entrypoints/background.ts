import { createApiClient } from "../lib/api";
import { onMessage } from "../lib/messaging";
import {
	clearSessionToken,
	getApiBaseUrl,
	getSessionToken,
	getWebhooks,
	setSessionToken,
} from "../lib/storage";

export default defineBackground(() => {
	// Content Script からトークンを受信
	browser.runtime.onMessage.addListener(
		(message: Record<string, unknown>, sender: { tab?: { id?: number } }) => {
			if (message?.type === "auth-token" && typeof message.token === "string") {
				setSessionToken(message.token).then(() => {
					if (sender.tab?.id) {
						browser.tabs.remove(sender.tab.id);
					}
				});
			}
		},
	);

	onMessage("clipContent", async ({ data }) => {
		const payload = {
			source: data.source,
			content: data.content,
			prompt: data.prompt,
		};

		// Send to webhooks (fire and forget)
		getWebhooks().then((hooks) => {
			for (const hook of hooks) {
				if (hook.enabled && hook.url) {
					fetch(hook.url, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(payload),
					}).catch(() => {});
				}
			}
		});

		// Send to AIChatClip API
		try {
			const token = await getSessionToken();
			if (!token) {
				return { success: true, clipId: undefined };
			}
			const client = await createApiClient();
			const res = await client.api.clips.$post({ json: payload });
			if (!res.ok) {
				const text = await res.text();
				return { success: false, error: text };
			}
			const body = (await res.json()) as { id: string };
			return { success: true, clipId: body.id };
		} catch (e) {
			return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
		}
	});

	onMessage("getAuthStatus", async () => {
		try {
			const token = await getSessionToken();
			if (!token) {
				return { authenticated: false };
			}
			const baseUrl = await getApiBaseUrl();
			const res = await fetch(`${baseUrl}/api/auth/get-session`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) {
				await clearSessionToken();
				return { authenticated: false };
			}
			const data = (await res.json()) as { user?: unknown };
			if (!data?.user) {
				await clearSessionToken();
				return { authenticated: false };
			}
			return { authenticated: true };
		} catch {
			return { authenticated: false };
		}
	});
});
