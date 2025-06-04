import React, { ReactNode } from 'react';

export default function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="steps-list">
      {React.Children.map(children, (child) => (
        <li className="steps-item">{child}</li>
      ))}
      <style>{`
        .steps-list {
          margin-left: 1.5rem;
          list-style: decimal;
          font-size: 1rem;
          color: #1f2937;
        }

        .steps-item > * {
          padding-left: 0.25rem;
        }

        .steps-item {
          margin-bottom: 0.75rem;
        }

        :root[data-theme='dark'] .steps-list {
          color: #e2e8f0;
        }
      `}</style>
    </ol>
  );
}
