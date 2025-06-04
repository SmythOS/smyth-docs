import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function CardGrid({ children }: Props) {
  return (
    <div className="docs-card-grid">
      {children}
      <style>{`
        .docs-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
