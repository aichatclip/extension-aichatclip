import { useState } from "react";
import { sendMessage } from "../lib/messaging";
import { extractAssistantMessage, extractPromptBefore } from "../lib/scraper";

type ClipState = "idle" | "clipping" | "success" | "error";

const STYLES: Record<ClipState, React.CSSProperties> = {
	idle: { color: "#6b7280" },
	clipping: { color: "#3b82f6", cursor: "wait" },
	success: { color: "#22c55e" },
	error: { color: "#ef4444" },
};

const ICONS: Record<ClipState, string> = {
	idle: "\u{1F4CE}",
	clipping: "\u23F3",
	success: "\u2705",
	error: "\u274C",
};

export function ClipButton({ article }: { article: Element }) {
	const [state, setState] = useState<ClipState>("idle");

	const handleClip = async () => {
		if (state === "clipping") return;

		const content = extractAssistantMessage(article);
		if (!content) {
			setState("error");
			setTimeout(() => setState("idle"), 2000);
			return;
		}

		setState("clipping");
		try {
			const prompt = extractPromptBefore(article) ?? undefined;
			const result = await sendMessage("clipContent", {
				source: "chatgpt",
				content,
				prompt,
			});
			setState(result.success ? "success" : "error");
		} catch {
			setState("error");
		}
		setTimeout(() => setState("idle"), 2000);
	};

	return (
		<button
			type="button"
			onClick={handleClip}
			disabled={state === "clipping"}
			title="Clip this response"
			style={{
				background: "none",
				border: "none",
				cursor: state === "clipping" ? "wait" : "pointer",
				padding: "4px",
				fontSize: "16px",
				lineHeight: 1,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				opacity: state === "idle" ? 0.6 : 1,
				transition: "opacity 0.2s",
				...STYLES[state],
			}}
			onMouseEnter={(e) => {
				if (state === "idle") e.currentTarget.style.opacity = "1";
			}}
			onMouseLeave={(e) => {
				if (state === "idle") e.currentTarget.style.opacity = "0.6";
			}}
		>
			{ICONS[state]}
		</button>
	);
}
