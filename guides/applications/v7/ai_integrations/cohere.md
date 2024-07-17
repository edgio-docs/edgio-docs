---
title: Cohere
---

This project integrates [Cohere](https://cohere.ai/) for leveraging state-of-the-art natural language processing (NLP) capabilities. This example will demonstrate how to use the `summarize` API endpoint. It is built using an Express.js server to facilitate the interaction with Cohere's API.

Utilizing Edgio alongside Cohere enhances the application's ability to process and summarize text efficiently, ensuring lower latencies, improved scalability, and a better overall user experience across different geographies.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone the `edgio-v7-ai-example` repo and navigate to the `cohere-example` directory.

```bash
git clone https://github.com/edgio-docs/edgio-v7-ai-example.git
cd cohere
```

Prepare your environment variables in a `.env` file by duplicating the `.env.example` file to `.env` and inserting your [Cohere API key](https://docs.cohere.ai/).

```bash
cp .env.example .env
```

Install the necessary dependencies.

```bash
npm i
```

If you haven't already, [install the Edgio CLI](/applications/performance/cdn_as_code/cli). Use `edgio dev` to start your development server:

```bash
edgio dev
```

You can preview your application at [http://localhost:3000](http://localhost:3000).

## Deployment {/* deployment */}

Deploy your project with the `edgio deploy` command:

```bash
edgio deploy
```
