import React, { ReactNode, useState } from 'react';
import {
  Info,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';

interface Props {
  type?: 'info' | 'warn' | 'tip';
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const BaseCallout = ({
  type = 'info',
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const typeStyles = {
    info: {
      icon: <Info size={20} style={{ color: '#2563eb', marginRight: 6 }} />,
      label: 'INFO',
      borderColor: '#2563eb',
    },
    warn: {
      icon: <AlertTriangle size={20} style={{ color: '#b45309', marginRight: 6 }} />,
      label: 'WARNING',
      borderColor: '#f59e0b',
    },
    tip: {
      icon: <Lightbulb size={20} style={{ color: '#059669', marginRight: 6 }} />,
      label: 'TIP',
      borderColor: '#34d399',
    },
  };

  const { icon, label, borderColor } = typeStyles[type];

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`final-callout callout-${type}`}
      style={{
        borderLeft: `6px solid ${borderColor}`, // fallback to always show the line
      }}
    >
      {/* Header */}
      <div
        onClick={collapsible ? toggle : undefined}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: collapsible ? 'pointer' : 'default',
          padding: '16px 20px 0 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <span
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginRight: 4,
            }}
          >
            {title || label}
          </span>
        </div>

        {collapsible && (
          <ChevronDown
            size={18}
            style={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s ease-in-out',
              marginTop: 1,
              opacity: 0.75,
            }}
          />
        )}
      </div>

      {/* Content */}
      {(!collapsible || isOpen) && (
        <div
          style={{
            marginTop: 10,
            padding: '0 20px 16px 20px',
            fontSize: '1.075rem',
            lineHeight: '1.6',
          }}
        >
          {children}
        </div>
      )}

      {/* Static Theme-aware CSS */}
      <style>
        {`
          .final-callout {
            border-radius: 8px;
            margin: 24px 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
            font-size: 1rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease-in-out;
          }

          .final-callout:hover {
            ${collapsible ? 'box-shadow: 0 3px 6px rgba(0,0,0,0.06);' : ''}
          }

          :root[data-theme='light'] .callout-info {
            background-color: #e0f2fe;
            color: #0c0c0c;
          }

          :root[data-theme='dark'] .callout-info {
            background-color: #1e3a8a22;
            color: #dbeafe;
          }

          :root[data-theme='light'] .callout-warn {
            background-color: #fef3c7;
            color: #78350f;
          }

          :root[data-theme='dark'] .callout-warn {
            background-color: #78350f22;
            color: #fde68a;
          }

          :root[data-theme='light'] .callout-tip {
            background-color: #d1fae5;
            color: #065f46;
          }

          :root[data-theme='dark'] .callout-tip {
            background-color: #065f4622;
            color: #bbf7d0;
          }
        `}
      </style>
    </div>
  );
};

export default BaseCallout;
