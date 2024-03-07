import {ChatChannel} from '@fireaw.ai/sdk';
import {is} from 'cheerio/lib/api/traversing';
import React, {useState, useEffect} from 'react';
import {FiXCircle} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import styled from 'styled-components';

import NoSSRWrapper from './Layout/NoSSRWrapper';

import {MDXComponents} from 'components/MDX/MDXComponents';
import {siteConfig} from 'config/appConfig';
import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

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
`;

const StopButtonIcon = styled(FiXCircle)`
  cursor: pointer;
  width: 24px; // Set the width to 24px
  height: 24px; // Set the height to 24px
  color: var(--btn-icon-color, #812991); // Customizable color, adjust as needed
`;

const Message = styled.div<{isUser: boolean}>`
  position: relative;
  margin: 10px 0;
  padding: 10px;
  padding-top: 20px;
  border: 1px solid #ccc;
  border-radius: ${({isUser}) =>
    isUser ? '10px 10px 0 10px' : '0 10px 10px 10px'};
  background-color: ${({isUser}) =>
    isUser ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
  color: white;

  &::before {
    content: ${({isUser}) => (isUser ? "'You'" : "'Edgio Answers'")};
    position: absolute;
    top: ${({isUser}) => (isUser ? 'auto' : '-10px')};
    right: ${({isUser}) => (isUser ? '10px' : 'auto')};
    bottom: ${({isUser}) => (isUser ? '-10px' : 'auto')};
    left: ${({isUser}) => (isUser ? 'auto' : '10px')};
    background-color: ${({isUser}) =>
      isUser ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
    color: white;
    font-size: 0.75em;
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
      <ReactMarkdown components={MDXComponents}>{content}</ReactMarkdown>
    </MessageContent>
  );
};

const EdgioAnswers: React.FC<{
  isOpen: boolean;
  onRequestClose: () => void;
}> = ({isOpen, onRequestClose}) => {
  const [inputText, setInputText] = useState<string>('');
  const {chatbotId, apiToken} = siteConfig.fireawai;
  const [channel, setChannel] = useState<ChatChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [starterQuestions, setStarterQuestions] = useState<string[]>([]);
  const isLoaded = useHydrationIsLoaded();

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
    if (!channel && isOpen) {
      initializeChannel();
    }
  }, [apiToken, chatbotId, isOpen]);

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
    if (channel) {
      channel.disconnect();
      setChannel(null);
    }
    setMessages([]);
    document.body.classList.remove('ReactModal__Body--open');
    onRequestClose();
  };

  return (
    <NoSSRWrapper>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}>
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
          {isAwaitingResponse && <StopButtonIcon onClick={stopAndReconnect} />}
        </ChatActions>
      </Modal>
    </NoSSRWrapper>
  );
};

export default EdgioAnswers;
