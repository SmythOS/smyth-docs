// src/components/mdx/Badge.tsx
import React from 'react';

interface Props {
  type?: 'required' | 'optional' | 'recommended' | string;
  children?: React.ReactNode;
}

const colorMap: Record<string, string> = {
  required: '#b91c1c',      // red
  optional: '#2563eb',      // blue
  recommended: '#059669',   // green
  default: '#6b7280',       // gray
};

const bgMap: Record<string, string> = {
  required: '#fee2e2',
  optional: '#dbeafe',
  recommended: '#d1fae5',
  default: '#e5e7eb',
};

export default function Badge({ type = 'default', children }: Props) {
  const badgeType = type.toLowerCase();
  return (
    <span className={`badge badge-${badgeType}`}>{children || type}
      <style>{`
        .badge {
          border-radius: 0.375rem;
          padding: 2px 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          line-height: 1.4;
        }

        .badge-required { background-color: #fee2e2; color: #b91c1c; }
        .badge-optional { background-color: #dbeafe; color: #2563eb; }
        .badge-recommended { background-color: #d1fae5; color: #059669; }
        .badge-default { background-color: #e5e7eb; color: #6b7280; }

        :root[data-theme='dark'] .badge-required { background-color: #4c0519; color: #fecaca; }
        :root[data-theme='dark'] .badge-optional { background-color: #1e3a8a; color: #bfdbfe; }
        :root[data-theme='dark'] .badge-recommended { background-color: #064e3b; color: #86efac; }
        :root[data-theme='dark'] .badge-default { background-color: #374151; color: #d1d5db; }
      `}</style>
    </span>
  );
}
