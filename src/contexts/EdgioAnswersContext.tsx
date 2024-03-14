import React, {ReactNode, createContext, useContext, useState} from 'react';

interface EdgioAnswersContextType {
  starterQuestions: string[];
  setStarterQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Create a context with a default value
const EdgioAnswersContext = createContext<EdgioAnswersContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const EdgioAnswersProvider = ({children}: Props) => {
  const [starterQuestions, setStarterQuestions] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  return (
    <EdgioAnswersContext.Provider
      value={{starterQuestions, setStarterQuestions, query, setQuery}}>
      {children}
    </EdgioAnswersContext.Provider>
  );
};

export const useEdgioAnswersContext = () => {
  const context = useContext(EdgioAnswersContext);
  if (context === undefined) {
    throw new Error(
      'useEdgioAnswers must be used within an EdgioAnswersProvider'
    );
  }
  return context;
};
