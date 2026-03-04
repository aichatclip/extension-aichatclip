import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
	clipContent(data: {
		source: "chatgpt";
		content: string;
		prompt?: string;
	}): { success: boolean; clipId?: string; error?: string };
	getAuthStatus(): { authenticated: boolean };
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
