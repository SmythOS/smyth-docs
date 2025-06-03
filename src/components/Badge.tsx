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
  const color = colorMap[type.toLowerCase()] || colorMap.default;
  const background = bgMap[type.toLowerCase()] || bgMap.default;

  return (
    <span
      style={{
        backgroundColor: background,
        color: color,
        borderRadius: '0.375rem',
        padding: '2px 8px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        display: 'inline-block',
        lineHeight: 1.4,
      }}
    >
      {children || type}
    </span>
  );
}
