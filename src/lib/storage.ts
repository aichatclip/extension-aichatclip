import { API_BASE_URL } from "@aichatclip/shared";
import { storage } from "wxt/utils/storage";

const apiBaseUrl = storage.defineItem<string>("local:apiBaseUrl", {
	fallback: API_BASE_URL,
});

const sessionToken = storage.defineItem<string>("local:sessionToken", {
	fallback: "",
});

export interface WebhookConfig {
	id: string;
	name: string;
	url: string;
	enabled: boolean;
}

const webhooks = storage.defineItem<WebhookConfig[]>("local:webhooks", {
	fallback: [],
});

export async function getApiBaseUrl(): Promise<string> {
	return apiBaseUrl.getValue();
}

export async function setApiBaseUrl(url: string): Promise<void> {
	await apiBaseUrl.setValue(url);
}

export async function getSessionToken(): Promise<string> {
	return sessionToken.getValue();
}

export async function setSessionToken(token: string): Promise<void> {
	await sessionToken.setValue(token);
}

export async function clearSessionToken(): Promise<void> {
	await sessionToken.setValue("");
}

export async function getWebhooks(): Promise<WebhookConfig[]> {
	return webhooks.getValue();
}

export async function setWebhooks(configs: WebhookConfig[]): Promise<void> {
	await webhooks.setValue(configs);
}

export function watchSessionToken(cb: (token: string) => void): () => void {
	return sessionToken.watch((newValue) => {
		cb(newValue ?? "");
	});
}
