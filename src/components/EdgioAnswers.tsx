import {useEffect, useRef, useState} from 'react';

import {ChatChannel} from '@fireaw.ai/sdk';
import {useRouter} from 'next/router';
import {FiSend, FiX} from 'react-icons/fi';
import Modal from 'react-modal';
import styled from 'styled-components';

import {siteConfig} from 'config/appConfig';
import {useEdgioAnswersContext} from 'contexts/EdgioAnswersContext';
import {useTheme} from 'contexts/ThemeContext';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

import {IconEdgioAnswers, IconEdgioAnswersDark} from './Icon/IconEdgioAnswers';
import NoSSRWrapper from './Layout/NoSSRWrapper';
import Link from './MDX/Link';
import Markdown from './MDX/Markdown';

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

const Message = styled.div<{isUser: boolean}>`
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
    content: ${({isUser}) => (isUser ? "'You'" : "'Edgio Answers'")};
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
    font-size: 14px;
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

const DisclaimerContainer = styled.div`
  font-size: 12px;
  color: var(--ea-input-placeholder-color);
  padding: 10px;

  a {
    display: inline-block;
  }

  p {
    color: var(--text-primary);
    margin-top: 10px;
    padding: 8px 16px;
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
  }
`;

const ShowMoreLink = styled.a`
  color: var(--text-link);
  cursor: pointer;
  margin-left: 5px;
`;

function Disclaimer() {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const toggleDisclaimer = () => {
    setShowFullDisclaimer(!showFullDisclaimer);
  };

  return (
    <DisclaimerContainer>
      <>
        By submitting, you consent to sharing this text with Fireaw.ai for
        processing.
      </>
      <ShowMoreLink className="text-link" onClick={toggleDisclaimer}>
        <div>{showFullDisclaimer ? 'Show less...' : 'Show more...'}</div>
      </ShowMoreLink>
      {showFullDisclaimer && (
        <p>
          Edgio uses a third party,{' '}
          <Link href="https://fireaw.ai">Fireaw.ai</Link>, to process the text
          you enter in this prompt. Only the text you enter here will be sent to
          Fireaw.ai for processing.{' '}
          <>By submitting, you consent to sharing this text with Fireaw.ai.</>
        </p>
      )}
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
  const router = useRouter();
  const {themedValue} = useTheme();
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
    : defaultPlaceholder;

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
  }, [apiToken, chatbotId, channel]);

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
    }, 25);
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
