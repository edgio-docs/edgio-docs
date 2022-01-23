import React from 'react';

const supportedFrameworks = [
  {
    name: 'Next.js',
    href: '',
  },
  {
    name: 'Nuxt.js',
    href: '',
  },
  {
    name: 'Edge Network',
    href: '',
  },
  {
    name: 'Vue Storefront',
    href: '',
  },
  {
    name: 'Serverless functions',
    href: '',
  },
  {
    name: 'Remix',
    href: '',
  },
];

function SupportedFrameworkCard() {
  return (
    <div className="text-xl text-primary dark:text-primary-dark leading-relaxed">
      <div className="framework-card">
        <div className="framework-logo"></div>
        <h3 className="framework-card__name">Next.js</h3>
      </div>
    </div>
  );
}

SupportedFrameworkCard.displayName = 'SupportedFrameworkCard';

export default SupportedFrameworkCard;
