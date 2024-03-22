---
title: LangChain
---

This template leverages Edgio's cutting-edge delivery network to scaffold a LangChain.js + Next.js starter app, enhancing its performance and scalability while showcasing several use cases for different LangChain modules.

With Edgio, the app benefits from faster load times, improved user experience, and seamless global deployment capabilities, making it an ideal platform for developing and deploying AI-powered applications efficiently at scale.

{{ prereq.md }}

## Getting Started {/* getting-started */}

Clone the `edgio-v7-ai-example` repo and change to the `langchain` directory.

```bash
git clone https://github.com/edgio-docs/edgio-v7-ai-example.git
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

Open [localhost:3000](http://localhost:3000) with your browser to ask the bot something and you'll see a streamed response. You can visit `app/page.tsx` if you would like to start customizing your chat interface.

<p align="center">
  <img
    width="680px"
    src="https://github.com/langchain-ai/langchain-nextjs-template/blob/main/public/images/chat-conversation.png?raw=true"
    alt="A streaming conversation between the user and the AI"
    loading="lazy"
  />
</p>

The backend logic can be found in `app/api/chat/route.ts`. From here, you can change the prompt which is set to the `TEMPLATE` variable and the model that is initialized with the `modelName` variable passed to the `ChatOpenAI` client.

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

The `POST` handler initializes and calls a simple chain with a prompt, chat model, and output parser. [See the LangChain docs](https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser) for more information.

- Chat models stream message chunks rather than bytes, so output parsing is handling serialization and byte-encoding by initializing `HttpResponseOutputParser()` to `outputParser`.
- To select a different model, the client would be initialized like so (see a [full list of supported models here](https://js.langchain.com/docs/modules/model_io/models/)):

```ts
import {ChatAnthropic} from 'langchain/chat_models/anthropic';
const model = new ChatAnthropic({});
```

### Agents and Retrieval {/* agents-and-retrieval */}

To try out the Agent or Retrieval examples, follow the instructions in the [Edgio AI repository](https://github.com/Edgio/edgio-ai).

## Deployment {/* deployment */}

[Install the Edgio CLI](https://docs.edg.io/guides/v7/develop/cli) if you haven't already. Run your development server with `edgio dev`:

```bash
edgio dev
```

Deploy your project with `edgio deploy`:

```bash
edgio deploy
```
