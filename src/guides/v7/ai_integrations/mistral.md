---
title: Mistral
---

This project is built on [Mistral](https://mistral.ai/), a platform designed for simplifying the integration of open source AI and machine learning models into applications. The example utilizes React for its user interface and Edgio's global network for accelerating content delivery and optimized performance.

Ensuring that AI-driven features are seamlessly and efficiently deployed across global scales, Edgio's edge computing features further reduce latency, improve scalability, and enhance user experiences, making it an ideal complement to Mistral's developer-centric approach.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone the `edgio-v7-ai-example` repo and change to the `mistral` directory.

```bash
git clone https://github.com/edgio-docs/edgio-v7-ai-example.git
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
