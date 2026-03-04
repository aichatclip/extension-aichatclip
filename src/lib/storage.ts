import { API_BASE_URL } from "@aichatclip/shared";
import { storage } from "wxt/utils/storage";

const apiBaseUrl = storage.defineItem<string>("local:apiBaseUrl", {
	fallback: API_BASE_URL,
});

export async function getApiBaseUrl(): Promise<string> {
	return apiBaseUrl.getValue();
}

export async function setApiBaseUrl(url: string): Promise<void> {
	await apiBaseUrl.setValue(url);
}
