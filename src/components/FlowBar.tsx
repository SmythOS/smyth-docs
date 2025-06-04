import React from 'react';

type Props = { items: string[] };

export default function FlowBar({ items }: Props) {
  return (
    <div className="flow-bar">
      {items.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <span aria-hidden className="flow-arrow">→</span>
          )}
          <span className="flow-label">{label}</span>
        </React.Fragment>
      ))}
      <style>{`
        .flow-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .flow-arrow {
          margin: 0 0.35em;
          font-size: 0.9em;
          font-weight: 600;
          transform: translateY(0.1em);
          color: #1f2937;
        }

        .flow-label {
          white-space: nowrap;
        }

        :root[data-theme='dark'] .flow-arrow {
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
