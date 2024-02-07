---
title: LlamaIndex
---

This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone this repo and change to the `llamaindex` directory.

```bash
git clone https://github.com/Edgio/edgio-ai
cd llamaindex
```

Set up environment variables in a `.env.local` file by copying the `.env.example` file to `.env.local` and adding your [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key).

```bash
cp .env.example .env.local
```

Install the dependencies and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment {/* deployment */}

[Install the Edgio CLI](https://docs.edg.io/guides/v7/develop/cli) if you haven't already. Run your development server with `edg dev`:

```bash
edg dev
```

Deploy your project with `edg deploy`:

```bash
edg deploy
```
