import cn from 'classnames';
import Prism from 'prismjs';
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
    Prism.highlightAll();
  }, [isLoaded]);

  return (
    <pre className={cn('custom-scrollbar', language)}>
      <code className={`${language}`}>{children}</code>
    </pre>
  );
}
