import hljs from 'highlight.js';
import React, {useEffect} from 'react';

import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

export default function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) {
  const isLoaded = useHydrationIsLoaded();
  useEffect(() => {
    if (isLoaded) {
      hljs.initHighlightingOnLoad();
    }
  }, [isLoaded]);

  return (
    <pre className="custom-scrollbar">
      <code className={`${language} hljs`}>{children}</code>
    </pre>
  );
}
