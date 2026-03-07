import { useState, useEffect, useRef } from "react";
import { sendMessage } from "../lib/messaging";
import type { ClipSource } from "@aichatclip/shared";
import { LogoIcon, CheckIcon, NgIcon, TimeAnimatedIcon } from "./icons";

type ClipState = "idle" | "clipping" | "success" | "error";

interface SiteStyle {
	iconSize: number;
	color: string;
	errorColor: string;
	buttonStyle: React.CSSProperties;
	hoverStyle?: React.CSSProperties;
}

const SITE_STYLES: Record<ClipSource, SiteStyle> = {
	chatgpt: {
		iconSize: 20,
		color: "var(--token-text-secondary)",
		errorColor: "#ef4444",
		buttonStyle: {
			width: 32,
			height: 32,
			borderRadius: 8,
		},
		hoverStyle: {
			backgroundColor: "var(--token-bg-secondary)",
		},
	},
	gemini: {
		iconSize: 18,
		color: "#1f1f1f",
		errorColor: "#d93025",
		buttonStyle: {
			width: 32,
			height: 32,
			borderRadius: "50%",
		},
		hoverStyle: {
			backgroundColor: "rgba(31,31,31,0.08)",
		},
	},
	claude: {
		iconSize: 20,
		color: "#6b6e7b",
		errorColor: "#d32f2f",
		buttonStyle: {},
	},
	grok: {
		iconSize: 20,
		color: "#71767b",
		errorColor: "#f4212e",
		buttonStyle: {},
	},
};

interface ClipButtonProps {
	article: Element;
	source: ClipSource;
	extractMessage: (article: Element) => string | null;
	extractPrompt: (article: Element) => string | null;
}

export function ClipButton({ article, source, extractMessage, extractPrompt }: ClipButtonProps) {
	const [state, setState] = useState<ClipState>("idle");
	const [timeFrame, setTimeFrame] = useState<number>(0);
	const [hovered, setHovered] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

	const site = SITE_STYLES[source];

	useEffect(() => {
		if (state === "clipping") {
			setTimeFrame(0);
			intervalRef.current = setInterval(() => {
				setTimeFrame((f) => f + 1);
			}, 500);
		} else {
			clearInterval(intervalRef.current);
		}
		return () => clearInterval(intervalRef.current);
	}, [state]);

	const handleClip = async () => {
		if (state !== "idle") return;

		const content = extractMessage(article);
		if (!content) {
			setState("error");
			return;
		}

		setState("clipping");
		try {
			const prompt = extractPrompt(article) ?? undefined;
			const result = await sendMessage("clipContent", {
				source,
				content,
				prompt,
			});
			setState(result.success ? "success" : "error");
		} catch {
			setState("error");
		}
	};

	const iconColor = state === "error" ? site.errorColor : site.color;

	return (
		<button
			type="button"
			onClick={handleClip}
			disabled={state !== "idle"}
			title="Clip this response"
			style={{
				backgroundColor: hovered && state === "idle" && site.hoverStyle?.backgroundColor
					? site.hoverStyle.backgroundColor
					: "transparent",
				border: "none",
				cursor: state === "clipping" ? "wait" : "pointer",
				padding: 0,
				lineHeight: 1,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				color: iconColor,
				opacity: 1,
				transition: "background-color 0.2s",
				...site.buttonStyle,
			}}
			onMouseEnter={() => {
				setHovered(true);
			}}
			onMouseLeave={() => {
				setHovered(false);
			}}
		>
			{state === "idle" && <LogoIcon size={site.iconSize} />}
			{state === "clipping" && <TimeAnimatedIcon frame={timeFrame} size={site.iconSize} />}
			{state === "success" && <CheckIcon size={site.iconSize} />}
			{state === "error" && <NgIcon size={site.iconSize} />}
		</button>
	);
}
