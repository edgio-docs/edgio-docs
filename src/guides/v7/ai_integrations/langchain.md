---
title: LangChain
---

This template scaffolds a LangChain.js + Next.js starter app and showcases several use cases for different LangChain modules.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone the `edgio-ai` repo and change to the `langchain` directory.

```bash
git clone git@github.com:edgio/edgio-ai.git
cd langchain
```

### Chat {/* chat */}

Set up environment variables in a `.env.local` file by copying the `.env.example` file to `.env.local`.

```bash
cp .env.example .env.local
```

To start with the basic examples, you'll just need to add your [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key).

```bash
OPENAI_API_KEY="YOUR_API_KEY"
```

Install required packages and run the development server.

```bash
npm i
npm run dev
```

Open [localhost:3000](http://localhost:3000) with your browser and ask the bot something. You'll see a streamed response:

<p align="center">
  <img
    width="480px"
    src="https://github.com/Edgio/edgio-ai/blob/main/langchain/public/agent-convo.gif?raw=true"
    alt="A streaming conversation between the user and the AI"
  />
</p>

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Backend logic lives in `app/api/chat/route.ts`. From here, you can change the prompt and model, or add other modules and logic.

```ts filename="app/api/chat/route.ts"
import {NextRequest, NextResponse} from 'next/server';
import {Message as VercelChatMessage, StreamingTextResponse} from 'ai';
import {ChatOpenAI} from '@langchain/openai';
import {PromptTemplate} from '@langchain/core/prompts';
import {HttpResponseOutputParser} from 'langchain/output_parsers';

export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

Current conversation:
{chat_history}

User: {input}
AI:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: 'gpt-3.5-turbo-1106',
    });

    const outputParser = new HttpResponseOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({error: e.message}, {status: 500});
  }
}
```

- The `POST` handler initializes and calls a simple chain with a prompt, chat model, and output parser. [See the LangChain docs](https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser) for more information
- Chat models stream message chunks rather than bytes, so output parsing is handling serialization and byte-encoding by initializing `HttpResponseOutputParser()` to `outputParser`.
- To select a different model, the client would be initialized like so (see a [full list of supported models here](https://js.langchain.com/docs/modules/model_io/models/)):

```ts
import {ChatAnthropic} from 'langchain/chat_models/anthropic';
const model = new ChatAnthropic({});
```

- Instead of using `prompt.pipe()`, you can initialize `chain` like so:

```ts
import {RunnableSequence} from 'langchain/schema/runnable';
const chain = RunnableSequence.from([prompt, model, outputParser]);
```

### Agents and Retrieval {/* agents-and-retrieval */}

To try out the Agent or Retrieval examples, follow the instructions in the [Edgio AI repository](https://github.com/Edgio/edgio-ai).

## Deployment {/* deployment */}

[Install the Edgio CLI](https://docs.edg.io/guides/v7/develop/cli) if you haven't already. Run your development server with `edg dev`:

```bash
edg dev
```

Deploy your project with `edg deploy`:

```bash
edg deploy
```
