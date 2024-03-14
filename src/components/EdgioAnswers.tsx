import {useEffect, useRef, useState} from 'react';

import {ChatChannel} from '@fireaw.ai/sdk';
import {useRouter} from 'next/router';
import {FiSend, FiXCircle} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import styled from 'styled-components';

import {MDXComponents} from 'components/MDX/MDXComponents';
import {siteConfig} from 'config/appConfig';
import {useEdgioAnswersContext} from 'contexts/EdgioAnswersContext';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

import NoSSRWrapper from './Layout/NoSSRWrapper';

const RESET_ON_CLOSE = false;
const ROUTE_HASH = '#edgio-answers';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  finished?: boolean;
}

// Adjust modal and overlay styles according to your design requirements
const customStyles: Modal.Styles = {
  content: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    padding: '20px',
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
      ? `
  background: var(--ea-input-field-active-bg);
  color: var(--text-primary);
  `
      : `
  background: var(--ea-input-field-bg);
  color: var(--ea-input-placeholder-color);
  `}

  flex-grow: 1;
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

  .article-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    scroll-margin-top: calc(var(--header-height) + 8px);
    padding-top: 16px;
    position: relative;

    .anchor {
      color: var(--docs-text-primary);
      text-decoration: none;

      span {
        margin-left: 8px;
        visibility: hidden;
      }
    }

    &:hover .anchor span {
      visibility: visible;
    }
  }

  .article-ul__list,
  .article-ol__list {
    padding-left: 27px;
    margin-bottom: 0.8rem;
    overflow: hidden;
  }

  .article-ul__list {
    list-style: disc;
  }

  .article-ul__list > li > .article-ul__list {
    list-style: square;
  }

  .article-ul__list > li > .article-ul__list > li > .article-ul__list {
    list-style: circle;
  }

  .article-ol__list {
    list-style: decimal;
  }

  .article-ol__list > li > .article-ol__list {
    list-style: lower-roman;
  }

  .article-ol__list > li > .article-ol__list > li > .article-ol__list {
    list-style: lower-alpha;
  }

  .list-item {
    margin-bottom: 7px;

    > *:not(.inline-icon) {
      margin-bottom: inherit;
    }
  }

  .text-link {
    color: #2993e0;
    text-decoration: none;
    position: relative;
    font-weight: 600;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      left: 0;
      background: #2993e0;
      width: 0;
      transform: translateY(2px);
      transition: width 0.2s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .article-header {
    margin-top: 0;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.663px;
    font-weight: bold;
  }

  h2.article-heading {
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
  }

  h3.article-heading {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
  }

  h4.article-heading {
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }

  .article-text {
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    overflow: auto;
  }

  .list-item .article-text,
  img {
    margin-bottom: 7px;
  }

  img {
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 3px 7px 2px,
      rgba(0, 0, 0, 0.06) 1px 3px 1px 0px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    display: block;

    thead {
      /* box-shadow: rgb(71, 71, 71) 0px -2px inset; */
    }

    th,
    td {
      border: 1px solid var(--hr-secondary);
    }

    thead th {
      font-weight: 600;
      color: var(--docs-text-primary);
      font-size: 14px;
      background-color: var(--table-header-bg);
    }

    tr {
      th,
      td {
        padding: 12px;
        text-align: left;
        vertical-align: top;
      }
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: 20px;
`;

const CloseIcon = styled(FiXCircle)`
  cursor: pointer;
  font-size: 24px;
`;

const MessageWrapper = styled.div<{isUser: boolean}>`
  padding: 0;
  border-radius: 5px;
  background: ${({isUser}) =>
    isUser
      ? 'var(--text-primary)'
      : 'linear-gradient(to right, #812991, #00A2E2, #01B18D)'};
  background-clip: padding-box;
  margin: 10px;
`;
const Message = styled.div<{isUser: boolean}>`
  position: relative;
  margin: 1px;
  padding: 10px;
  padding-top: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  text-align: ${({isUser}) => (isUser ? 'right' : 'left')};
  border-radius: 5px;

  &::before {
    content: ${({isUser}) => (isUser ? "'You'" : "'Edgio Answers'")};
    position: absolute;
    top: -10px; // Adjust position as needed
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

const QuestionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
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

const MessageContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  .article-text {
    margin: 10px auto;
    .text-link {
      display: inline-block;
    }
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

const ChatMessage = ({content}: {content: string}) => {
  return (
    <MessageContent>
      {/* @ts-ignore */}
      <ReactMarkdown components={MDXComponents}>{content}</ReactMarkdown>
    </MessageContent>
  );
};

const EdgioAnswers = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const {chatbotId, apiToken} = siteConfig.fireawai;
  const [channel, setChannel] = useState<ChatChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const {starterQuestions, setStarterQuestions, query, setQuery} =
    useEdgioAnswersContext();
  const isLoaded = useHydrationIsLoaded();
  const placeholder = isAwaitingResponse
    ? 'Waiting for response...'
    : 'Ask something...';

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      setIsModalOpen(hash === ROUTE_HASH);
    };

    checkHash();

    const handleRouteChange = (url: string) => {
      const hash = new URL(url, window.location.href).hash;
      setIsModalOpen(hash === ROUTE_HASH);
    };

    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (isLoaded) {
    Modal.setAppElement('#__next');
  }

  function hasContent() {
    return query.trim().length > 0;
  }

  const initializeChannel = () => {
    if (apiToken && chatbotId) {
      const newChannel = new ChatChannel({
        apiToken,
        chatbotId,
        onMessage: (message) => {
          if (message.content.length > 0) {
            // Only proceed if the message has content
            setMessages((prevMessages) => {
              const existingMessageIndex = prevMessages.findIndex(
                (m) => m.id === message.id
              );

              // If the message already exists, update it
              if (existingMessageIndex !== -1) {
                const updatedMessages = [...prevMessages];
                const existingMessage = updatedMessages[existingMessageIndex];

                // Concatenate new content with existing content, if any
                updatedMessages[existingMessageIndex] = {
                  ...existingMessage,
                  content: message.content,
                  finished: message.finished,
                };
                return updatedMessages;
              } else {
                // Message doesn't exist, add a new one
                return [...prevMessages, {...message}];
              }
            });
          }

          if (message.finished) {
            setIsAwaitingResponse(false);
            setQuery('');
          }
        },
      });
      newChannel.connect().then(() => {
        if (newChannel.chat.settings.starterQuestions) {
          setStarterQuestions(newChannel.chat.settings.starterQuestions);
        }
      });
      setChannel(newChannel);
      setQuery('');
    }
  };

  // Initialize the chat channel on mount
  useEffect(() => {
    if (!channel) {
      initializeChannel();
    }
  }, [apiToken, chatbotId]);

  // Stop the current channel and reconnect
  const stopAndReconnect = () => {
    if (channel) {
      channel.disconnect();
      initializeChannel();
    }
  };

  const sendMessage = () => {
    if (query.trim() && channel && !isAwaitingResponse) {
      channel.send(query);
      setIsAwaitingResponse(false);
      setQuery('');
    }
  };

  const onOpenModal = () => {
    document.body.classList.add('ReactModal__Body--open');
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }

    if (hasContent()) {
      sendMessage();
    }
  };

  const onCloseModal = () => {
    if (RESET_ON_CLOSE && channel) {
      channel.disconnect();
      setChannel(null);
      setMessages([]);
    }
    document.body.classList.remove('ReactModal__Body--open');
    setIsModalOpen(false);

    const path = window.location.pathname;
    router.push(path, path, {shallow: true});
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
            <CloseIcon onClick={onCloseModal} />
          </ModalHeader>
          <ChatContainer>
            {messages
              .slice()
              .reverse()
              .map((message, index) => {
                const isUser = message.role === 'user';
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
                onClick={() => {
                  setQuery(question);
                  setIsAwaitingResponse(true);
                  channel?.send(question);
                }}>
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
                  onClick={sendMessage}>
                  <FiSend />
                </SendButton>
              ) : (
                <StopButton onClick={stopAndReconnect}>
                  <FiXCircle />
                </StopButton>
              )}
            </ChatInputContainer>
          </ChatActions>
        </Modal>
      </ModalWrapper>
    </NoSSRWrapper>
  );
};

const defaultPlaceholder = 'Ask a question...';

export const EdgioAnswersInput = ({duration = 1000}) => {
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const inputRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {starterQuestions: presets, query, setQuery} = useEdgioAnswersContext();
  const router = useRouter();

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
    }, 50);
  };

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
      setQuery(e.currentTarget.value);
      router.push(edgioAnswersUrl);
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
export const edgioAnswersUrl = ROUTE_HASH;
