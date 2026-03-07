import { API_BASE_URL } from "@aichatclip/shared";
import { storage } from "wxt/utils/storage";

const apiBaseUrl = storage.defineItem<string>("local:apiBaseUrl", {
	fallback: API_BASE_URL,
});

const sessionToken = storage.defineItem<string>("local:sessionToken", {
	fallback: "",
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
