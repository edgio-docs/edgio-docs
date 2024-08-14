import {useEffect, useRef, useState} from 'react';

import {FiSend, FiX} from 'react-icons/fi';
import Modal from 'react-modal';
import styled, {css} from 'styled-components';

import {DocsbotConfig, productsConfig} from 'config/appConfig';
import {getContextTypeByName, useAppContext} from 'contexts/AppContext';
import {useEdgioAnswersContext} from 'contexts/EdgioAnswersContext';
import {useTheme} from 'contexts/ThemeContext';
import {mobileMinWidth} from 'styles';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

import {
  IconEdgioAnswers,
  IconEdgioAnswersDark,
  IconEdgioAnswersWidget,
} from './Icon/IconEdgioAnswers';
import NoSSRWrapper from './Layout/NoSSRWrapper';
import Link from './MDX/Link';
import Markdown from './MDX/Markdown';

const RESET_ON_CLOSE = false;
const ROUTE_HASH = '#edgio-answers';

type MessageType = 'start' | 'stream' | 'end' | 'error';
interface IMessage {
  id?: string; // this is only available once the received message is finished
  type?: MessageType;
  role?: 'user' | 'bot' | 'system';
  content: string;
  finished?: boolean;
}
interface IBotMessage {
  id: string;
  answer: string;
  sources: {title: string; url: string}[];
  history: string[];
}

interface IBotResponse {
  message: string;
  sender: string;
  type: MessageType;
}

const customStyles: Modal.Styles = {
  content: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
  },
};

const ModalWrapper = styled.div``;

const ChatActions = styled.div`
  width: 100%;
  padding: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 4px;
`;

const ChatInput = styled.input<{hasContent: boolean}>`
  ${({hasContent}) =>
    hasContent
      ? css`
          background: var(--ea-input-field-active-bg);
          color: var(--text-primary);
        `
      : css`
          background: var(--ea-input-field-bg);
          color: var(--ea-input-placeholder-color);
        `}

  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-primary);
  border-radius: 4px;
  height: 40px;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;

  color: var(--docs-text-primary);
`;

const ModalHeader = styled.div`
  background: var(--ea-header-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: 20px;
  padding: 0 20px;
  height: 54px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px 10px 20px;
  overflow: hidden;
`;

const StyledEdgioIcon = styled.div`
  svg {
    height: 31px;
    path {
      fill: var(--text-primary);
    }
  }
`;

const StyledCloseIcon = styled(FiX)`
  cursor: pointer;
  font-size: 24px;
`;

const MessageWrapper = styled.div<{isUser: boolean}>`
  padding: 0;
  border-radius: 5px;
  background: ${({isUser}) =>
    isUser
      ? 'var(--text-secondary)'
      : 'linear-gradient(to right, #812991, #00A2E2, #01B18D)'};
  background-clip: padding-box;
  margin: 10px;
`;

const SystemMessageWrapper = styled.div`
  padding: 0;
  border-radius: 5px;
  background: var(--ea-system-message-bg);
  margin: 10px;
`;

const Message = styled.div<{isUser: boolean; context: string}>`
  position: relative;
  margin: 1px;
  padding: 10px;
  padding-top: 20px;
  background-color: var(--bg-primary);
  color: ${({isUser}) =>
    isUser ? 'var(--text-secondary)' : 'var(--text-primary)'};
  text-align: ${({isUser}) => (isUser ? 'right' : 'left')};
  border-radius: 5px;

  &::before {
    content: ${({isUser, context}) => (isUser ? "'You'" : `'Edgio Answers'`)};
    position: absolute;
    top: -10px;
    ${({isUser}) => (isUser ? 'right: 10px;' : 'left: 10px;')}
    background-color: ${({isUser}) =>
      isUser ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
    color: ${({isUser}) =>
      isUser ? 'var(--text-primary)' : 'var(--text-primary)'};
    font-size: 0.75em;
    font-weight: bold;
    padding: 0 5px;
    border-radius: 5px;
  }
`;

// Horizontal line with text centered, small font size, and light color. used for system messages
const SystemMessage = styled.div`
  text-align: center;
  font-size: 12px;
  color: var(--ea-system-message-color);
  padding: 10px 0;
  border-top: 1px solid var(--border-primary);
`;

const QuestionButton = styled.button`
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--text-secondary);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--colors-blue0);
  }
`;

const QuestionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 0;
  border-top: 1px solid var(--border-primary);

  @media (max-width: ${mobileMinWidth}) {
    flex-direction: column;

    ${QuestionButton} {
      width: 100%;
    }
  }
`;

const MessageContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  .article-text {
    font-size: 14px;
    margin: 10px auto;
    // .text-link {
    //   display: inline-block;
    // }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-primary);
  border-radius: 4px;
  cursor: pointer;
  padding: 5px;
  height: 40px;
  width: 56px;

  svg {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
  }

  &:hover {
    opacity: 0.8;
  }
`;

const SendButton = styled(ActionButton)<{
  hasContent: boolean;
  awaitingResponse: boolean;
}>`
  display: ${({awaitingResponse}) => (awaitingResponse ? 'none' : 'flex')};
  background: ${({hasContent}) =>
    hasContent ? 'var(--lg-primary)' : 'var(--ea-input-field-bg)'};

  svg {
    color: ${({hasContent}) =>
      hasContent
        ? 'var(--ea-action-icon-active-color)'
        : 'var(--ea-action-icon-color)'};
  }
`;

const StopButton = styled(ActionButton)``;

const DisclaimerContainer = styled.div`
  font-size: 12px;
  color: var(--ea-input-placeholder-color);
  padding: 10px;

  p {
    color: var(--text-primary);
    margin-top: 10px;
    padding: 8px 16px;
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 100;
`;

const SYSTEM_MESSAGES = {
  applications: 'Now answering questions about Applications.',
  delivery: 'Now answering questions about Delivery.',
  uplynk: 'Now answering questions about Uplynk.',
  open_edge: 'Now answering questions about Open Edge.',
  home: 'Now answering questions across all Edgio services.',
};

function Disclaimer() {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const toggleDisclaimer = () => {
    setShowFullDisclaimer(!showFullDisclaimer);
  };

  return (
    <DisclaimerContainer>
      Edgio Answers uses AI and makes mistakes.{' '}
      <Link href="https://edg.io/company/legal/terms-of-service/">Terms</Link> |{' '}
      <Link href="https://edg.io/company/legal/privacy-policy/">Privacy</Link>
    </DisclaimerContainer>
  );
}

const ChatMessage = ({content}: {content: string}) => {
  return (
    <MessageContent>
      <Markdown source={content} />
    </MessageContent>
  );
};

const defaultPlaceholder = 'Ask Edgio Answers...';

const EdgioAnswers = () => {
  const {context} = useAppContext();
  const [prevContext, setPrevContext] = useState<string | null>(null);
  const {themedValue} = useTheme();
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const {
    query,
    setQuery,
    isModalOpen,
    starterQuestions,
    setStarterQuestions,
    closeModal,
  } = useEdgioAnswersContext();
  const isLoaded = useHydrationIsLoaded();
  const [docsbotConfig, setDocsbotConfig] = useState<
    DocsbotConfig | undefined
  >();

  /**
   * Adds a chat message to the messages state.
   * @param message - The message to add.
   * @returns void
   */
  const addChatMessage = (message: IMessage, reset = false) => {
    setMessages((prevMessages) => {
      const messages = reset ? [] : [...prevMessages];
      return [...messages, message];
    });
  };

  /**
   * Updates a chat message at a specific index.
   * @param index - The index of the message to update; use -1 to update the last message.
   * @param message - The updated message.
   * @returns void
   */
  const updateChatMessage = (index: number, message: IMessage) => {
    setMessages((prevMessages) => {
      // If the index is -1, update the last message
      if (index === -1) {
        index = prevMessages.length - 1;
      }

      const existingMessage = prevMessages[index];
      let existingContent = existingMessage.content;

      // `content` will be appended to the existing message content for stream messages
      if (message.content && message.type === 'stream') {
        existingContent = existingContent + message.content;
      }

      return [
        ...prevMessages.slice(0, -1),
        {
          ...existingMessage,
          ...message,
          content: existingContent,
        },
      ];
    });
  };

  // Initialize the chat channel once the config is established
  useEffect(() => {
    if (ws) {
      ws.close();
    }

    if (docsbotConfig) {
      initializeWebSocket(docsbotConfig);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [docsbotConfig]);

  // Set the config based on the context
  useEffect(() => {
    if (context && context !== prevContext) {
      const config =
        productsConfig[getContextTypeByName(context)]?.edgioAnswers;

      setPrevContext(context);
      setDocsbotConfig(config);
      setStarterQuestions(config?.starterQuestions || []);
      addChatMessage(
        {
          role: 'system',
          content: SYSTEM_MESSAGES[context] || '',
          type: 'end',
          finished: true,
        },
        true
      );
      addChatMessage({
        role: 'bot',
        content: config?.prompt || '',
        type: 'end',
        finished: true,
      });
    }
  }, [context]);

  // If the current product isn't configured for Edgio Answers, return null
  if (!context || !productsConfig[context]?.edgioAnswers) {
    console.info('Edgio Answers is not configured for this product.');
    return null;
  }

  const placeholder = isAwaitingResponse
    ? 'Waiting for response...'
    : defaultPlaceholder;

  if (isLoaded) {
    Modal.setAppElement('#__next');
  }

  function hasContent() {
    return query.trim().length > 0;
  }

  /**
   * Initializes the chat channel with the provided API token and chatbot ID.
   * If both the API token and chatbot ID are available, a new ChatChannel instance is created.
   * The onMessage callback is set to handle incoming messages.
   * If the message has content, it is added to the messages state.
   * If the message is marked as finished, the isAwaitingResponse state is updated and the query state is cleared.
   * If the chat channel is successfully connected, the starter questions are set if available.
   * Finally, the channel state and query state are updated.
   */
  const initializeWebSocket = (config: DocsbotConfig) => {
    if (config) {
      const {teamId, botId} = config;

      if (teamId && botId) {
        const websocket = new WebSocket(
          `wss://api.docsbot.ai/teams/${teamId}/bots/${botId}/chat`
        );

        websocket.onmessage = (event) => {
          const {message, type}: IBotResponse = JSON.parse(event.data);
          const role = 'bot';

          switch (type) {
            case 'start':
              addChatMessage({
                type,
                role,
                content: message,
              });
              break;
            case 'stream':
              updateChatMessage(-1, {
                type,
                content: message,
                finished: false,
              });
              break;
            case 'end':
              const botMessage: IBotMessage = JSON.parse(message);
              const {id, answer, history} = formatMessageContent(botMessage);

              setHistory(history);

              updateChatMessage(-1, {
                id,
                type,
                content: answer,
                finished: true,
              });

              setIsAwaitingResponse(false);
              setQuery('');
              break;
            case 'error':
              addChatMessage({
                type,
                role: 'system',
                content:
                  'An unexpected error occurred. Please refresh the page and try again.',
              });
              // Prevent sending messages when an error occurs as this will also
              // close the connection
              setIsAwaitingResponse(true);
              break;
          }
        };

        websocket.onopen = () => {
          setWs(websocket);
        };

        websocket.onclose = () => {
          setWs(null);
        };

        websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          setWs(null);
        };
      }
    }
  };

  /**
   * Stops the current chat channel and reconnects with the current config.
   * @returns void
   */
  const stopAndReconnect = () => {
    if (ws) {
      ws.close();

      if (docsbotConfig) {
        initializeWebSocket(docsbotConfig);
      }
    }
  };

  /**
   * Sends a message to the chat channel.
   * @param msg - The message to send.
   * @returns void
   */
  const sendMessage = (msg?: string) => {
    if (query.trim() && ws && !isAwaitingResponse) {
      msg = query;
    }

    if (msg && msg.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'user',
          content: msg,
          finished: true,
        },
      ]);
      ws?.send(JSON.stringify({question: msg, history}));
      setIsAwaitingResponse(true);
      setQuery('');
    }
  };

  /**
   * Handles the logic for opening the modal.
   * Adds a CSS class to the body to lock scrolling.
   * Sets focus on the chat input field if it exists.
   * Calls the sendMessage function if there is content.
   */
  const onOpenModal = () => {
    document.body.classList.add('lock-scroll');
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }

    if (hasContent()) {
      sendMessage();
    }
  };

  /**
   * Handles the close event of the modal.
   * If RESET_ON_CLOSE is true and a channel is present, it disconnects the channel,
   * clears the messages, and sets the channel to null.
   * Removes the 'lock-scroll' class from the body element.
   */
  const onCloseModal = () => {
    if (RESET_ON_CLOSE && ws) {
      ws.close();
      setMessages([]);
    }
    document.body.classList.remove('lock-scroll');
    closeModal();
  };

  return (
    <NoSSRWrapper>
      <ModalWrapper>
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={onOpenModal}
          onRequestClose={onCloseModal}
          style={customStyles}>
          <ModalHeader>
            <StyledEdgioIcon>
              {themedValue(<IconEdgioAnswers />, <IconEdgioAnswersDark />)}
            </StyledEdgioIcon>
            <StyledCloseIcon onClick={onCloseModal} />
          </ModalHeader>
          <ModalContainer>
            <ChatContainer>
              {messages
                .slice()
                .reverse()
                // Don't render a message until it is streaming or finished
                .filter((message) => message.type !== 'start')
                .map((message, index) => {
                  const isUser = message.role === 'user';
                  const isSystem = message.role === 'system';

                  if (isSystem) {
                    return (
                      <SystemMessageWrapper key={index}>
                        <SystemMessage>{message.content}</SystemMessage>
                      </SystemMessageWrapper>
                    );
                  }

                  return (
                    <MessageWrapper key={index} isUser={isUser}>
                      <Message isUser={isUser}>
                        <ChatMessage content={message.content} />
                      </Message>
                    </MessageWrapper>
                  );
                })}
            </ChatContainer>
            <QuestionButtons>
              {starterQuestions.map((question, index) => (
                <QuestionButton
                  key={index}
                  onClick={() => sendMessage(question)}>
                  {question}
                </QuestionButton>
              ))}
            </QuestionButtons>
            <ChatActions>
              <ChatInputContainer>
                <ChatInput
                  ref={chatInputRef}
                  type="text"
                  value={query}
                  hasContent={hasContent()}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={placeholder}
                  disabled={isAwaitingResponse}
                />
                {!isAwaitingResponse ? (
                  <SendButton
                    hasContent={hasContent()}
                    awaitingResponse={isAwaitingResponse}
                    onClick={() => sendMessage()}>
                    <FiSend />
                  </SendButton>
                ) : (
                  <StopButton onClick={stopAndReconnect}>
                    <FiX />
                  </StopButton>
                )}
              </ChatInputContainer>
            </ChatActions>
            <Disclaimer />
          </ModalContainer>
        </Modal>
      </ModalWrapper>
    </NoSSRWrapper>
  );
};

export const EdgioAnswersInput = ({
  duration = 1000,
  context,
}: {
  duration?: number;
  context?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const inputRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {
    starterQuestions: presets,
    setStarterQuestions: setPresets,
    query,
    setQuery,
    openModal,
  } = useEdgioAnswersContext();

  const typeMessage = (message: string, index: number) => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      // Assign to intervalRef.current
      if (i <= message.length) {
        setPlaceholder(message.substring(0, i));
        i++;
      } else {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setTimeout(() => {
          if (index < presets.length - 1) {
            setIndex((prevIndex) => prevIndex + 1);
          } else {
            setPlaceholder(defaultPlaceholder);
          }
        }, duration);
      }
    }, 25);
  };

  useEffect(() => {
    // Set the starter questions based on the context
    if (context) {
      const contextualPresets =
        productsConfig[getContextTypeByName(context)]?.edgioAnswers
          ?.starterQuestions;

      if (contextualPresets) {
        setPresets(contextualPresets);
      }
    }
  }, [context]);

  useEffect(() => {
    if (presets.length) {
      if (index === presets.length) {
        setPlaceholder(defaultPlaceholder);
      } else {
        typeMessage(presets[index], index);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [index, presets]);

  function onFocus() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setPlaceholder(defaultPlaceholder);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      openModal(e.currentTarget.value);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <NoSSRWrapper>
      <ChatInput
        ref={inputRef}
        type="text"
        value={query}
        hasContent={query.trim().length > 0}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onClick={onFocus}
        onKeyDown={onKeyDown}
      />
    </NoSSRWrapper>
  );
};

export default EdgioAnswers;
export const EdgioAnswersWidget = () => {
  const {openModal} = useEdgioAnswersContext();
  const {context} = useAppContext();

  if (!context || !productsConfig[context]?.edgioAnswers) {
    console.info('Edgio Answers is not configured for this product.');
    return null;
  }

  return (
    <WidgetContainer onClick={() => openModal()}>
      <IconEdgioAnswersWidget />
    </WidgetContainer>
  );
};

export const edgioAnswersUrl = ROUTE_HASH;

/**
 * Formats the message content, updating links and titles
 * @param content - The message content
 * @returns The formatted message content
 */
function formatMessageContent(
  message: IBotMessage,
  removePatterns?: string[] | RegExp[]
) {
  let {answer, sources} = message;
  // // Append product name to the beginning of markdown links based on the href
  // // (e.g. [Some Article](/delivery/storage/console) -> [Delivery - Some Article](/delivery/storage/console))
  // content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, title, href) => {
  //   const url = new URL(href, window.location.origin);

  //   let product = url.pathname.split('/')[1];
  //   // capitalize the first letter of the title
  //   product = product.charAt(0).toUpperCase() + product.slice(1);

  //   return `[**${product}** - ${title}](${href})`;
  // });

  // Remove patterns from the content
  removePatterns &&
    removePatterns.forEach((pattern) => {
      answer = answer.replace(pattern, '');
    });

  // Append sources to the end of the content
  if (sources.length) {
    answer += `\n\n---\n\n**Related Articles:**\n${sources
      .map((source) => `- [${source.title}](${source.url})`)
      .join('\n')}`;
  }

  answer = answer.trim();

  return {
    ...message,
    answer,
    sources,
  };
}
