import React from 'react';
interface Props {
  type?:
    | 'required'
    | 'optional'
    | 'recommended'
    | 'not required'
    | 'supported'
    | 'not supported'
    | string;
  children?: React.ReactNode;
}

const colorMap: Record<string, string> = {
  required: '#b91c1c',        // red
  optional: '#2563eb',        // blue
  recommended: '#059669',     // green
  'not required': '#92400e',  // amber (dark)
  supported: '#065f46',       // teal-dark
  'not supported': '#7c2d12', // brown-dark
  default: '#6b7280',         // gray
};

const bgMap: Record<string, string> = {
  required: '#fee2e2',
  optional: '#dbeafe',
  recommended: '#d1fae5',
  'not required': '#fef3c7',
  supported: '#d1fae5',       
  'not supported': '#fee2e2', 
  default: '#e5e7eb',
};

export default function Badge({ type = 'default', children }: Props) {
  const key = String(type).toLowerCase();
  const color = colorMap[key] || colorMap.default;
  const background = bgMap[key] || bgMap.default;

  return (
    <span
      style={{
        backgroundColor: background,
        color,
        borderRadius: '0.375rem',
        padding: '2px 8px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        display: 'inline-block',
        lineHeight: 1.4,
        letterSpacing: '0.02em',
      }}
      aria-label={typeof children === 'string' ? children : type}
    >
      {children || type}
    </span>
  );
}
