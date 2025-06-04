import React from 'react';
import Link from '@docusaurus/Link';

interface Props {
  to: string;                 
  children: React.ReactNode;  
}

export default function DocLink({ to, children }: Props) {
  const external = /^https?:\/\//.test(to);
  return (
    <Link
      to={to}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="doc-link"
    >
      {children}
      <style>{`
        .doc-link {
          color: #10b981;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .doc-link:hover {
          text-decoration: underline;
        }

        :root[data-theme='dark'] .doc-link {
          color: #6ee7b7;
        }
      `}</style>
    </Link>
  );
}
