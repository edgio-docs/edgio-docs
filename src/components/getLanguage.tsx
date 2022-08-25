export default function getDescriptiveLanguage(language: string) {
  const normalizedLanguageString = language.replace('language-', '');

  switch (normalizedLanguageString) {
    case 'diff':
      return 'Diff';
    case 'jsx':
      return 'JSX';
    case 'js':
    case 'javascript':
      return 'JavaScript';
    case 'ts':
    case 'tsx':
    case 'typescript':
      return 'TypeScript';
    case 'bash':
    case 'cli':
    case 'terminal':
      return 'Bash';
    case 'json':
      return 'JSON';
    case 'md':
    case 'markdown':
      return 'Markdown';
    case 'dir':
    case 'directory':
      return 'Directory';
    case 'html':
    case 'htm':
      return 'HTML';
    case 'yml':
    case 'yaml':
      return 'YAML';
    case 'groovy':
      return 'Groovy';
    case 'graphql':
      return 'GraphQL';
    case 'unknown':
      return '';
    default:
      return normalizedLanguageString;
  }
}
