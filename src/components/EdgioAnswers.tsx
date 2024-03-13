import {useEffect, useState} from 'react';

import {ChatChannel} from '@fireaw.ai/sdk';
import {useRouter} from 'next/router';
import {FiSend, FiXCircle} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import styled from 'styled-components';

import {MDXComponents} from 'components/MDX/MDXComponents';
import {siteConfig} from 'config/appConfig';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

import NoSSRWrapper from './Layout/NoSSRWrapper';

const RESET_ON_CLOSE = true;
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

const ChatActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid var(--border-primary);
  border-radius: 4px;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;

  color: var(--docs-text-primary);

  // display: grid;
  // gap: 16px 0;

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

const StopButtonIcon = styled(FiXCircle)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: var(--colors-purple0);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: 20px;
`;

const CloseIcon = styled(FiXCircle)`
  cursor: pointer;
  font-size: 24px; // Adjust the size as needed
`;

const SendIcon = styled(FiSend)`
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  // Position adjustments as necessary
`;

const Message = styled.div<{isUser: boolean}>`
  position: relative;
  margin: 10px 0;
  padding: 10px;
  padding-top: 20px;
  border: 1px solid
    ${({isUser}) => (isUser ? 'var(--text-primary)' : 'var(--colors-blue0)')};
  border-radius: ${({isUser}) =>
    isUser ? '10px 10px 0 10px' : '0 10px 10px 10px'};
  background-color: ${({isUser}) =>
    isUser ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
  color: var(--text-primary);
  text-align: ${({isUser}) => (isUser ? 'right' : 'left')};

  &::before {
    content: ${({isUser}) => (isUser ? "'You'" : "'Edgio Answers'")};
    position: absolute;
    top: ${({isUser}) => (isUser ? 'auto' : '-10px')};
    right: ${({isUser}) => (isUser ? '10px' : 'auto')};
    bottom: ${({isUser}) => (isUser ? '-10px' : 'auto')};
    left: ${({isUser}) => (isUser ? 'auto' : '10px')};
    background-color: ${({isUser}) =>
      isUser ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
    color: ${({isUser}) =>
      isUser ? 'var(--text-primary)' : 'var(--colors-blue0)'};
    font-size: 0.75em;
    font-weight: bold;
    padding: 0 5px;
  }
`;

const QuestionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
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
  .article-text {
    margin: 10px auto;

    .text-link {
      display: block;
    }
  }
`;

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
  const [inputText, setInputText] = useState<string>('');
  const {chatbotId, apiToken} = siteConfig.fireawai;
  const [channel, setChannel] = useState<ChatChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [starterQuestions, setStarterQuestions] = useState<string[]>([]);
  const isLoaded = useHydrationIsLoaded();

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
            console.log(message);
            setIsAwaitingResponse(false);
            setInputText('');
          }
        },
      });
      newChannel.connect().then(() => {
        if (newChannel.chat.settings.starterQuestions) {
          setStarterQuestions(newChannel.chat.settings.starterQuestions);
        }
      });
      setChannel(newChannel);
      setInputText('');
    }
  };

  // Initialize the chat channel on mount
  useEffect(() => {
    if (!channel && isModalOpen) {
      initializeChannel();
    }
  }, [apiToken, chatbotId, isModalOpen]);

  // Stop the current channel and reconnect
  const stopAndReconnect = () => {
    if (channel) {
      channel.disconnect();
      initializeChannel();
    }
  };

  const sendMessage = () => {
    if (inputText.trim() && channel && !isAwaitingResponse) {
      channel.send(inputText);
      setIsAwaitingResponse(true);
      setInputText('');
    }
  };

  const onOpenModal = () => {
    document.body.classList.add('ReactModal__Body--open');
  };

  const onCloseModal = () => {
    if (RESET_ON_CLOSE && channel) {
      channel.disconnect();
      setChannel(null);
    }
    setMessages([]);
    document.body.classList.remove('ReactModal__Body--open');
    setIsModalOpen(false);
    // Use Next.js router to remove the hash without affecting the history
    const path = window.location.pathname;
    router.push(path, path, {shallow: true});
  };

  return (
    <NoSSRWrapper>
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
            .map((message, index) => (
              <Message key={index} isUser={message.role === 'user'}>
                <ChatMessage content={message.content} />
              </Message>
            ))}
        </ChatContainer>
        <QuestionButtons>
          {starterQuestions.map((question, index) => (
            <QuestionButton
              key={index}
              onClick={() => {
                setInputText(question);
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
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={
                isAwaitingResponse
                  ? 'Waiting for response...'
                  : 'Ask something...'
              }
              disabled={isAwaitingResponse}
            />
            <SendIcon className={inputText.trim() ? 'enabled' : ''} />
            {isAwaitingResponse && (
              <StopButtonIcon onClick={stopAndReconnect} />
            )}
          </ChatInputContainer>
        </ChatActions>
      </Modal>
    </NoSSRWrapper>
  );
};

export default EdgioAnswers;
export const edgioAnswersUrl = ROUTE_HASH;
