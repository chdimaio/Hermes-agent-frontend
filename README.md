# Hermes — Frontend

A bilingual (English → Spanish) dictionary chat app. Users type a word and receive a styled "word card" with its definition, Spanish translation, and synonyms, served by the Hermes Spring Boot backend.

## Stack

- **React 19** — UI library
- **Vite 8** — dev server and build tool
- **JavaScript**
- **SCSS** — with a glassmorphism design system in blue tones
- **axios** — HTTP client

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend at `http://localhost:8080`.

## Project structure

```
src/
├── api/              # HTTP layer
│   ├── httpClient.js # axios instance (baseURL: /api)
│   └── wordsApi.js   # getWordCard(lemma)
├── app/
│   ├── App.jsx       # root component, renders <ChatPage />
│   └── App.scss      # page layout + bubble + input styles
├── assets/
│   └── Hermes-logo.png
├── components/
│   └── chat/
│       ├── ChatInput/    # text input + send button
│       ├── ChatMessage/  # renders user text, bot text, or <WordCard>
│       └── WordCard/     # word card with glass-effect UI
├── features/
│   └── chat/
│       ├── chatApi.js           # error-handling wrapper
│       └── useChatController.js # state hook (messages, loading, send)
├── pages/
│   └── ChatPage/       # main chat view (message list + input)
├── routes/
│   └── AppRoutes.jsx   # placeholder (not wired)
├── styles/
│   ├── main.scss       # global styles, chat shell, bubbles, input bar
│   ├── _variables.scss # design tokens (blue/green tones, glass shadows)
│   ├── _mixins.scss    # glass-card, focus-ring, pill
│   └── _reset.scss     # box-sizing, margin reset
└── main.jsx            # ReactDOM entry point
```

## Data flow

1. User types a word → `useChatController.sendUserMessage(text)`
2. Adds a "thinking…" message, calls `fetchWordCardForLemma`
3. `chatApi` → `wordsApi` → `httpClient` sends `GET /api/v1/words/card?lemma=...`
4. Backend returns `{ lemma, definition, translationEs, synonyms[] }` or a 404
5. On success, a `<WordCard>` bubble is rendered; on 404, a "not found" message appears

