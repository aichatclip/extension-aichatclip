import { defineExtensionMessaging } from "@webext-core/messaging";
import type { ClipSource } from "@aichatclip/shared";

interface ProtocolMap {
	clipContent(data: {
		source: ClipSource;
		content: string;
		prompt?: string;
		url?: string;
		chatTitle?: string;
	}): { success: boolean; clipId?: string; error?: string };
	getAuthStatus(): { authenticated: boolean };
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
