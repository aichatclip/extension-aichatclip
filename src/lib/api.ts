import type { AppType } from "@aichatclip/api";
import { hc } from "hono/client";
import { getApiBaseUrl, getSessionToken } from "./storage";

export async function createApiClient() {
	const baseUrl = await getApiBaseUrl();
	const token = await getSessionToken();
	return hc<AppType>(baseUrl, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
}
