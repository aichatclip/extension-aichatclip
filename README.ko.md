[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip — AI Chat Clipper

ChatGPT, Claude, Gemini, Grok의 AI 채팅 응답을 원클릭으로 저장하세요. Obsidian 동기화 또는 Webhook 전송을 지원합니다.

## 주요 기능

- **원클릭 저장** — 각 AI 응답 옆에 클립 버튼이 표시되며, 각 서비스의 네이티브 UI에 자연스럽게 어울립니다
- **Webhook 모드** — 클립을 JSON으로 원하는 URL에 전송 (Notion, Slack, Discord, n8n, Make, Zapier 등) — 계정 불필요
- **Obsidian 동기화** — AIChatClip 계정을 연결하고 클립을 Obsidian Vault에 마크다운 노트로 동기화
- **AI 자동 정리** (Pro) — 제목, 태그, 요약 자동 생성 및 스마트 폴더 분류
- **깔끔한 마크다운** — 코드 블록, 목록, 서식을 유지한 마크다운 변환

## 지원 AI 서비스

| 서비스 | URL |
|--------|-----|
| ChatGPT | `chatgpt.com` / `chat.openai.com` |
| Claude | `claude.ai` |
| Gemini | `gemini.google.com` |
| Grok | `grok.com` |

## 설치

- [Chrome 웹 스토어](https://aichatclip.com/docs/browser-extension) (출시 예정)
- [Firefox 부가 기능](https://aichatclip.com/docs/browser-extension) (출시 예정)

## 사용 방법

1. 지원되는 AI 채팅 서비스에 접속
2. 각 AI 응답 옆에 클립 버튼이 표시됩니다
3. 클릭하여 대화를 저장
4. 확장 프로그램 팝업에서 전송 대상을 설정:
   - **Webhook** — 원하는 Webhook URL을 붙여넣기
   - **AIChatClip 계정** — Google로 로그인하여 Obsidian 동기화

## 소스에서 빌드

사전 요구 사항: Node.js 20+, pnpm 10+

```bash
pnpm install
pnpm build          # Chrome + Firefox
pnpm build:chrome   # Chrome만
pnpm build:firefox  # Firefox만
```

출력 경로:
- Chrome: `.output/chrome-mv3/`
- Firefox: `.output/firefox-mv2/`

### 개발

```bash
pnpm dev            # Chrome 개발 서버
pnpm dev:firefox    # Firefox 개발 서버
```

## 소스 코드 구조

```
src/
├── entrypoints/           # 확장 프로그램 진입점 (WXT)
│   ├── background.ts      # Service Worker — 메시징 및 API 호출
│   ├── auth.content.ts    # OAuth 흐름의 인증 콜백
│   ├── popup/             # 확장 프로그램 팝업 UI (React)
│   ├── chatgpt.content/   # ChatGPT 콘텐츠 스크립트 — 클립 버튼 삽입
│   ├── claude-ai.content/ # Claude 콘텐츠 스크립트
│   ├── gemini.content/    # Gemini 콘텐츠 스크립트
│   └── grok.content/      # Grok 콘텐츠 스크립트
├── components/            # 공유 React 컴포넌트
│   ├── ClipButton.tsx     # AI 채팅 페이지에 삽입되는 클립 버튼
│   ├── SettingsForm.tsx   # 팝업의 계정 설정
│   ├── WebhookSettings.tsx # Webhook URL 설정
│   └── icons.tsx          # SVG 아이콘 컴포넌트
├── lib/                   # 핵심 로직
│   ├── api.ts             # AIChatClip 서버 API 클라이언트
│   ├── scraper.ts         # 기본 HTML→마크다운 스크래퍼 (Turndown)
│   ├── claude-scraper.ts  # Claude 전용 스크래핑 로직
│   ├── gemini-scraper.ts  # Gemini 전용 스크래핑 로직
│   ├── grok-scraper.ts    # Grok 전용 스크래핑 로직
│   ├── messaging.ts       # 확장 프로그램 메시징 (content ↔ background)
│   └── storage.ts         # 확장 프로그램 스토리지 래퍼
├── types/                 # TypeScript 타입 정의
└── assets/                # 아이콘 및 이미지
```

## 개인정보 보호

- Webhook을 설정하거나 AIChatClip 계정을 연결하지 않는 한 어떤 데이터도 수집하지 않습니다
- 대화 내용은 클립 버튼을 클릭할 때만 처리됩니다
- [개인정보 처리방침](https://aichatclip.com/privacy)

## 라이선스

[MIT](./LICENSE)
