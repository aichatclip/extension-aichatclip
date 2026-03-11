[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip — AI Chat Clipper

一键保存 ChatGPT、Claude、Gemini 和 Grok 的 AI 聊天回复。支持同步到 Obsidian 或发送到任意 Webhook。

## 功能特点

- **一键保存** — 每个 AI 回复旁边会出现一个剪藏按钮，完美融入各服务的原生 UI
- **Webhook 模式** — 将剪藏内容以 JSON 格式发送到任意 URL（Notion、Slack、Discord、n8n、Make、Zapier 等）— 无需注册账号
- **Obsidian 同步** — 连接 AIChatClip 账号，将剪藏内容作为 Markdown 笔记同步到 Obsidian Vault
- **AI 智能整理**（Pro）— 自动生成标题、标签、摘要，智能文件夹分类
- **干净的 Markdown** — 保留代码块、列表和格式的 Markdown 转换

## 支持的 AI 服务

| 服务 | URL |
|------|-----|
| ChatGPT | `chatgpt.com` / `chat.openai.com` |
| Claude | `claude.ai` |
| Gemini | `gemini.google.com` |
| Grok | `grok.com` |

## 安装

- [Chrome 网上应用店](https://aichatclip.com/docs/browser-extension)（即将上线）
- [Firefox 附加组件](https://aichatclip.com/docs/browser-extension)（即将上线）

## 使用方法

1. 访问任何支持的 AI 聊天服务
2. 每个 AI 回复旁边会出现剪藏按钮
3. 点击按钮保存对话
4. 在扩展弹窗中配置目标：
   - **Webhook** — 粘贴任意 Webhook URL
   - **AIChatClip 账号** — 使用 Google 登录以同步到 Obsidian

## 从源码构建

前置要求：Node.js 20+、pnpm 10+

```bash
pnpm install
pnpm build          # Chrome + Firefox
pnpm build:chrome   # 仅 Chrome
pnpm build:firefox  # 仅 Firefox
```

输出目录：
- Chrome：`.output/chrome-mv3/`
- Firefox：`.output/firefox-mv2/`

### 开发

```bash
pnpm dev            # Chrome 开发服务器
pnpm dev:firefox    # Firefox 开发服务器
```

## 源码架构

```
src/
├── entrypoints/           # 扩展入口点（WXT）
│   ├── background.ts      # Service Worker — 消息处理和 API 调用
│   ├── auth.content.ts    # OAuth 流程的认证回调
│   ├── popup/             # 扩展弹窗 UI（React）
│   ├── chatgpt.content/   # ChatGPT 内容脚本 — 注入剪藏按钮
│   ├── claude-ai.content/ # Claude 内容脚本
│   ├── gemini.content/    # Gemini 内容脚本
│   └── grok.content/      # Grok 内容脚本
├── components/            # 共享 React 组件
│   ├── ClipButton.tsx     # 注入到 AI 聊天页面的剪藏按钮
│   ├── SettingsForm.tsx   # 弹窗中的账号设置
│   ├── WebhookSettings.tsx # Webhook URL 配置
│   └── icons.tsx          # SVG 图标组件
├── lib/                   # 核心逻辑
│   ├── api.ts             # AIChatClip 服务器 API 客户端
│   ├── scraper.ts         # 基础 HTML 转 Markdown 抓取器（Turndown）
│   ├── claude-scraper.ts  # Claude 专用抓取逻辑
│   ├── gemini-scraper.ts  # Gemini 专用抓取逻辑
│   ├── grok-scraper.ts    # Grok 专用抓取逻辑
│   ├── messaging.ts       # 扩展消息传递（content ↔ background）
│   └── storage.ts         # 扩展存储封装
├── types/                 # TypeScript 类型定义
└── assets/                # 图标和图片
```

## 隐私

- 除非您配置了 Webhook 或连接了 AIChatClip 账号，否则不会收集任何数据
- 对话内容仅在您点击剪藏按钮时才会被处理
- [隐私政策](https://aichatclip.com/privacy)

## 许可证

[MIT](./LICENSE)
