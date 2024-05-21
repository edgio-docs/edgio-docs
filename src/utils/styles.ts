export const generateDynamicStyles = (styles: React.CSSProperties) => {
  let dynamicStyles = '';

  const processStyles = (styles: object | null, selectorPrefix = '') => {
    if (styles) {
      Object.entries(styles).forEach(([selector, style]) => {
        if (typeof style === 'object') {
          processStyles(
            style as React.CSSProperties,
            `${selectorPrefix}${selector} `
          );
        } else {
          // Apply styles directly
          dynamicStyles += `${selectorPrefix}{ ${selector}: ${style}; }`;
        }
      });
    }
  };

  processStyles(styles);

  return dynamicStyles;
};
