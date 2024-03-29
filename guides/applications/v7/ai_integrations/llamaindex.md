---
title: LlamaIndex
---

This project is powered by [LlamaIndex](https://www.llamaindex.ai/), a flexible data framework for connecting custom data sources to large language models. Bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama) and utilizes [Next.js](https://nextjs.org/), it is enhanced by Edgio's robust delivery network for accelerating the deployment and global distribution of your application.

By leveraging Edgio, you'll ensure optimal performance, faster loading times, and enhanced user experiences across the globe. This LlamaIndex project benefits from cutting-edge web optimization and edge computing capabilities, making it more scalable, reliable, and accessible to users everywhere.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone the `edgio-v7-ai-example` repo and change to the `llamaindex` directory.

```bash
git clone https://github.com/edgio-docs/edgio-v7-ai-example.git
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

[Install the Edgio CLI](https://docs.edg.io/guides/v7/develop/cli) if you haven't already. Run your development server with `edgio dev`:

```bash
edgio dev
```

Deploy your project with `edgio deploy`:

```bash
edgio deploy
```
