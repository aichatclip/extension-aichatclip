import { createApiClient } from "../lib/api";
import { onMessage } from "../lib/messaging";

export default defineBackground(() => {
	onMessage("clipContent", async ({ data }) => {
		try {
			const client = await createApiClient();
			const res = await client.api.clips.$post({
				json: {
					source: data.source,
					content: data.content,
					prompt: data.prompt,
				},
			});
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
			const client = await createApiClient();
			const res = await client.api.auth["get-session"].$get();
			return { authenticated: res.ok };
		} catch {
			return { authenticated: false };
		}
	});
});
