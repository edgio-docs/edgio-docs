export default function getLanguage(language: string) {
  const normalizedLanguageString = language.replace('language-', '');

  switch (normalizedLanguageString) {
    case 'js':
      return 'JavaScript';
    case 'ts':
    case 'tsx':
    case 'typescript':
      return 'TypeScript';
    case 'bash':
      return 'Terminal';
    case 'json':
      return 'JSON';
    case 'md':
    case 'markdown':
      return 'Markdown';
    default:
      return normalizedLanguageString;
  }
}
