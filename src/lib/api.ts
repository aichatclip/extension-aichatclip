import type { AppType } from "@aichatclip/api";
import { hc } from "hono/client";
import { getApiBaseUrl } from "./storage";

export async function createApiClient() {
	const baseUrl = await getApiBaseUrl();
	return hc<AppType>(baseUrl, {
		init: { credentials: "include" },
	});
}
