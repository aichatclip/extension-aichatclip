[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip — AI Chat Clipper

Save AI chat responses from ChatGPT, Claude, Gemini, and Grok with one click. Sync to Obsidian or send to any webhook.

## Features

- **One-click clip** — A clip button appears next to every AI response, blending into each service's native UI
- **Webhook mode** — Send clips as JSON to any URL (Notion, Slack, Discord, n8n, Make, Zapier, etc.) — no account required
- **Obsidian sync** — Connect your AIChatClip account and sync clips to your Obsidian vault as Markdown notes
- **AI-powered organization** (Pro) — Auto-generated titles, tags, summaries, and smart folder classification
- **Clean Markdown** — Conversations are converted to clean Markdown with code blocks, lists, and formatting preserved

## Supported AI Services

| Service | URL |
|---------|-----|
| ChatGPT | `chatgpt.com` / `chat.openai.com` |
| Claude | `claude.ai` |
| Gemini | `gemini.google.com` |
| Grok | `grok.com` |

## Install

- [Chrome Web Store](https://aichatclip.com/docs/browser-extension) (coming soon)
- [Firefox Add-ons](https://aichatclip.com/docs/browser-extension) (coming soon)

## Usage

1. Visit any supported AI chat service
2. A clip button appears next to each AI response
3. Click it to save the conversation
4. Configure destination in the extension popup:
   - **Webhook** — Paste any webhook URL
   - **AIChatClip account** — Sign in with Google for Obsidian sync

## Build from Source

Prerequisites: Node.js 20+, pnpm 10+

```bash
pnpm install
pnpm build          # Chrome + Firefox
pnpm build:chrome   # Chrome only
pnpm build:firefox  # Firefox only
```

Output:
- Chrome: `.output/chrome-mv3/`
- Firefox: `.output/firefox-mv2/`

### Development

```bash
pnpm dev            # Chrome dev server
pnpm dev:firefox    # Firefox dev server
```

## Source Architecture

```
src/
├── entrypoints/           # Extension entry points (WXT)
│   ├── background.ts      # Service worker — handles messaging and API calls
│   ├── auth.content.ts    # Auth callback handler for OAuth flow
│   ├── popup/             # Extension popup UI (React)
│   ├── chatgpt.content/   # ChatGPT content script — injects clip button
│   ├── claude-ai.content/ # Claude content script
│   ├── gemini.content/    # Gemini content script
│   └── grok.content/      # Grok content script
├── components/            # Shared React components
│   ├── ClipButton.tsx     # The clip button injected into AI chat pages
│   ├── SettingsForm.tsx   # Account settings in popup
│   ├── WebhookSettings.tsx # Webhook URL configuration
│   └── icons.tsx          # SVG icon components
├── lib/                   # Core logic
│   ├── api.ts             # API client for AIChatClip server
│   ├── scraper.ts         # Base HTML-to-Markdown scraper (Turndown)
│   ├── claude-scraper.ts  # Claude-specific scraping logic
│   ├── gemini-scraper.ts  # Gemini-specific scraping logic
│   ├── grok-scraper.ts    # Grok-specific scraping logic
│   ├── messaging.ts       # Extension messaging (content ↔ background)
│   └── storage.ts         # Extension storage wrapper
├── types/                 # TypeScript type definitions
└── assets/                # Icons and images
```

## Privacy

- No data is collected unless you configure a webhook or connect an AIChatClip account
- Conversations are processed only when you click the clip button
- [Privacy Policy](https://aichatclip.com/privacy)

## License

[MIT](./LICENSE)
