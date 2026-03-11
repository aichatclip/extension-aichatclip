[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip — AI Chat Clipper

ChatGPT、Claude、Gemini、Grok の AI チャット回答をワンクリックで保存。Obsidian 同期や Webhook 送信に対応。

## 特徴

- **ワンクリック保存** — 各 AI レスポンスの横にクリップボタンが表示され、サービスのネイティブ UI に自然に馴染みます
- **Webhook モード** — クリップを JSON で任意の URL に送信（Notion、Slack、Discord、n8n、Make、Zapier など）— アカウント不要
- **Obsidian 同期** — AIChatClip アカウントに接続し、クリップを Obsidian Vault に Markdown ノートとして同期
- **AI による自動整理**（Pro）— タイトル・タグ・サマリーの自動生成とスマートなフォルダ振り分け
- **クリーンな Markdown** — コードブロック・リスト・書式を保持したまま Markdown に変換

## 対応 AI サービス

| サービス | URL |
|----------|-----|
| ChatGPT | `chatgpt.com` / `chat.openai.com` |
| Claude | `claude.ai` |
| Gemini | `gemini.google.com` |
| Grok | `grok.com` |

## インストール

- [Chrome ウェブストア](https://aichatclip.com/docs/browser-extension)（近日公開）
- [Firefox Add-ons](https://aichatclip.com/docs/browser-extension)（近日公開）

## 使い方

1. 対応する AI チャットサービスにアクセス
2. 各 AI レスポンスの横にクリップボタンが表示されます
3. クリックして会話を保存
4. 拡張機能のポップアップで送信先を設定：
   - **Webhook** — 任意の Webhook URL を貼り付け
   - **AIChatClip アカウント** — Google でサインインして Obsidian 同期

## ソースからビルド

前提条件: Node.js 20+, pnpm 10+

```bash
pnpm install
pnpm build          # Chrome + Firefox
pnpm build:chrome   # Chrome のみ
pnpm build:firefox  # Firefox のみ
```

出力先:
- Chrome: `.output/chrome-mv3/`
- Firefox: `.output/firefox-mv2/`

### 開発

```bash
pnpm dev            # Chrome 開発サーバー
pnpm dev:firefox    # Firefox 開発サーバー
```

## ソースコード構成

```
src/
├── entrypoints/           # 拡張機能のエントリポイント（WXT）
│   ├── background.ts      # Service Worker — メッセージングと API 呼び出し
│   ├── auth.content.ts    # OAuth フローの認証コールバック
│   ├── popup/             # 拡張機能ポップアップ UI（React）
│   ├── chatgpt.content/   # ChatGPT コンテンツスクリプト — クリップボタン挿入
│   ├── claude-ai.content/ # Claude コンテンツスクリプト
│   ├── gemini.content/    # Gemini コンテンツスクリプト
│   └── grok.content/      # Grok コンテンツスクリプト
├── components/            # 共有 React コンポーネント
│   ├── ClipButton.tsx     # AI チャットページに挿入されるクリップボタン
│   ├── SettingsForm.tsx   # ポップアップのアカウント設定
│   ├── WebhookSettings.tsx # Webhook URL 設定
│   └── icons.tsx          # SVG アイコンコンポーネント
├── lib/                   # コアロジック
│   ├── api.ts             # AIChatClip サーバー用 API クライアント
│   ├── scraper.ts         # ベース HTML→Markdown スクレイパー（Turndown）
│   ├── claude-scraper.ts  # Claude 固有のスクレイピングロジック
│   ├── gemini-scraper.ts  # Gemini 固有のスクレイピングロジック
│   ├── grok-scraper.ts    # Grok 固有のスクレイピングロジック
│   ├── messaging.ts       # 拡張機能メッセージング（content ↔ background）
│   └── storage.ts         # 拡張機能ストレージラッパー
├── types/                 # TypeScript 型定義
└── assets/                # アイコン・画像
```

## プライバシー

- Webhook の設定や AIChatClip アカウントへの接続を行わない限り、データは一切収集されません
- 会話データはクリップボタンをクリックした時のみ処理されます
- [プライバシーポリシー](https://aichatclip.com/privacy)

## ライセンス

[MIT](./LICENSE)
