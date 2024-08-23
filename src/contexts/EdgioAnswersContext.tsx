import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {useRouter} from 'next/router';

import {ContextType} from './AppContext';

interface EdgioAnswersContextType {
  starterQuestions: string[];
  setStarterQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: boolean;
  openModal: (query?: string) => void;
  closeModal: () => void;
  overrideContext: ContextType | null;
  setOverrideContext: React.Dispatch<React.SetStateAction<ContextType | null>>;
}

const defaultContext: EdgioAnswersContextType = {
  starterQuestions: [],
  setStarterQuestions: () => {},
  query: '',
  setQuery: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  overrideContext: null,
  setOverrideContext: () => {},
};

const ROUTE_HASH = '#edgio-answers';

// Create a context with a default value
const EdgioAnswersContext =
  createContext<EdgioAnswersContextType>(defaultContext);

interface Props {
  children: ReactNode;
}

export const EdgioAnswersProvider = ({children}: Props) => {
  const router = useRouter();
  const [starterQuestions, setStarterQuestions] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overrideContext, setOverrideContext] = useState<ContextType | null>(
    null
  );

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

  /**
   * Opens the modal and optionally sets the query.
   * @param query - The query to set (optional).
   */
  const openModal = (query?: string) => {
    if (query) {
      setQuery(query);
    }

    router.push(
      {
        hash: ROUTE_HASH,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const closeModal = () => {
    const path = window.location.pathname;
    router.push(path, path, {shallow: true});
  };

  return (
    <EdgioAnswersContext.Provider
      value={{
        starterQuestions,
        setStarterQuestions,
        query,
        setQuery,
        isModalOpen,
        openModal,
        closeModal,
        overrideContext,
        setOverrideContext,
      }}>
      {children}
    </EdgioAnswersContext.Provider>
  );
};

/**
 * Custom hook that provides access to the EdgioAnswersContext.
 * @returns The EdgioAnswersContext value
 * @throws {Error} If used outside of an EdgioAnswersProvider
 */
export const useEdgioAnswersContext = () => {
  const context = useContext(EdgioAnswersContext);
  if (context === undefined) {
    throw new Error(
      'useEdgioAnswers must be used within an EdgioAnswersProvider'
    );
  }
  return context;
};

/**
 * Custom hook that returns the `openModal` function from the `useEdgioAnswersContext` hook.
 * This hook can be used to open the Answers modal.
 *
 * @returns The `openModal` function from the `useEdgioAnswersContext` hook.
 */
export const useOpenEdgioModal = () => {
  const {openModal} = useEdgioAnswersContext();
  return openModal;
};
