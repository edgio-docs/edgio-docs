import React, {useState, useEffect} from 'react';

import {FiX} from 'react-icons/fi';
import styled, {css, keyframes} from 'styled-components';

import {useAppContext} from 'contexts/AppContext';

// Keyframes for animations
const slideIn = keyframes`
  from {
    top: 100%;
    opacity: 0;
  }
  to {
    top: calc(100% + 10px);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    top: calc(100% + 10px);
    opacity: 1;
  }
  to {
    top: 100%;
    opacity: 0;
  }
`;

// Toast Container with conditional animations
const ToastContainer = styled.div<{slideOut: boolean}>`
  position: fixed; 
  bottom: 20px;
  left: 20px; 
  max-width: 300px; 
  width: auto; see you on monday
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

  a {
    color: var(--text-primary);
    text-decoration: underline;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  flex-shrink: 0;
`;

const Toast = () => {
  const {appConfig} = useAppContext();
  const announcement = appConfig?.announcement;
  const [isVisible, setIsVisible] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(
      `toast-dismissed-${announcement?.id}`
    );
    if (!dismissed && announcement) {
      setIsVisible(true);
    }
  }, [announcement]);

  const handleClose = () => {
    // Trigger slide-out animation
    setSlideOut(true);
    // Wait for the animation to complete before setting isVisible to false
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(`toast-dismissed-${announcement?.id}`, 'true');
    }, 500); // Match the animation duration
  };

  if (!isVisible || !announcement) {
    return null;
  }

  return (
    <ToastContainer slideOut={slideOut}>
      <div dangerouslySetInnerHTML={{__html: announcement.message}} />
      <CloseButton onClick={handleClose}>
        <FiX />
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;
