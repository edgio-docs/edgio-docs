import {useEffect, useState} from 'react';

import {FiX} from 'react-icons/fi';
import styled, {css, keyframes} from 'styled-components';

import {useAppContext} from 'contexts/AppContext';
import {generateDynamicStyles} from 'utils/styles';

import NoSSRWrapper from './Layout/NoSSRWrapper';
import Markdown from './MDX/Markdown';

// Keyframes for animations
const slideIn = keyframes`
  from {
    transform: translateX(-100%); // Start from the left
    opacity: 0;
  }
  to {
    transform: translateX(0); // End at its natural position
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0); // Start at its natural position
    opacity: 1;
  }
  to {
    transform: translateX(-100%); // Move to the left
    opacity: 0;
  }
`;

// Toast Container with conditional animations
const ToastContainer = styled.div<{
  slideOut: boolean;
  type: string;
  styles?: object;
}>`
  --colors-info: var(--callout-info);
  --colors-important: var(--callout-important);
  --colors-critical: var(--callout-warning);

  position: fixed;
  bottom: 20px; // Adjust as needed
  left: 20px;
  transform: translateX(-100%);
  max-width: 600px;
  width: auto;
  background-color: var(--colors-blue0);
  color: var(--text-primary);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  animation: ${slideIn} 0.5s forwards;

  ${(props) =>
    props.slideOut &&
    css`
      animation: ${slideOut} 0.5s forwards;
    `}

  /* These styles must override the markdown styles */
  * {
    font-weight: 500 !important;
  }

  a {
    color: var(--colors-blue0) !important;
  }
  ${(props) => {
    switch (props.type) {
      case 'info':
        return css`
          background-color: var(--colors-info) !important;
          color: var(--text-primary) !important;
        `;
      case 'important':
        return css`
          background-color: var(--colors-important) !important;
          color: var(--colors-white0) !important;
        `;
      case 'critical':
        return css`
          background-color: var(--colors-critical) !important;
          color: var(--colors-black0) !important;
        `;
      default:
        return css``;
    }
  }};

  /* Custom styles set on the announcement config */
  ${(props) =>
    props.styles &&
    css`
      ${generateDynamicStyles(props.styles)}
    `}
`;

const CloseButton = styled.button<{styles?: object}>`
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  ${(props) =>
    props.styles &&
    css`
      ${generateDynamicStyles(props.styles)}
    `}
`;

const Toast = () => {
  const {appConfig} = useAppContext();
  const announcement = appConfig?.announcement;
  const [isVisible, setIsVisible] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState<
    string | null
  >(null);

  const ANNOUNCEMENT_PREFIX = 'announcement-dismissed-';

  useEffect(() => {
    const dismissed =
      localStorage.getItem(`${ANNOUNCEMENT_PREFIX}${announcement?.id}`) ===
      'true';

    if (dismissed) {
      setIsVisible(false);
      setSlideOut(true);
      return;
    }

    if (!dismissed && announcement) {
      setIsVisible(true);
      setSlideOut(false);
      setCurrentAnnouncementId(announcement?.id);
    }
  }, [announcement, currentAnnouncementId]);

  const handleClose = () => {
    setSlideOut(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(`${ANNOUNCEMENT_PREFIX}${announcement?.id}`, 'true');
    }, 500);
  };

  if (!isVisible || !announcement || !currentAnnouncementId) {
    return null;
  }

  const type = announcement?.type || 'info';
  const styles = announcement?.styles || {};

  return (
    <NoSSRWrapper>
      <ToastContainer slideOut={slideOut} type={type} styles={styles}>
        <div className="announcement">
          <Markdown source={announcement?.message} />
        </div>
        <CloseButton onClick={handleClose} styles={styles}>
          <FiX />
        </CloseButton>
      </ToastContainer>
    </NoSSRWrapper>
  );
};

export default Toast;
