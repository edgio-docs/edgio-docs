---
title: Mistral
---

This is a [Mistral](https://mistral.ai/) project using React.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone this repo and change to the `mistral` directory.

```bash
git clone https://github.com/Edgio/edgio-ai
cd mistral
```

Set up environment variables in a `.env.local` file by copying the `.env.example` file to `.env.local` and adding your [Mistral API key](https://docs.mistral.ai/#api-access).

```bash
cp .env.example .env.local
```

Install the dependencies.

```bash
npm i
```

## Deployment {/* deployment */}

[Install the Edgio CLI](https://docs.edg.io/guides/v7/develop/cli) if you haven't already. Run your development server with `edg dev`:

```bash
edg dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Deploy your project with `edg deploy`:

```bash
edg deploy
```
