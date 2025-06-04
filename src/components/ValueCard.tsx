import React from 'react';

export interface ValueCardProps {
  title: string;
  description: string;
  highlightColor?: string; 
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  highlightColor = '#3efcc2', // YHellow -> #ffff00
}) => {
  return (
    <div className="value-card">
      <h3 style={{ backgroundColor: highlightColor }}>
        {title}
      </h3>
      <p>{description}</p>
      <style>{`
        .value-card {
          padding: 1rem;
          margin: 0.5rem 0;
          font-family: sans-serif;
        }

        .value-card h3 {
          font-weight: bold;
          display: inline;
          padding: 0 0.25rem;
          border-radius: 4px;
        }

        .value-card p {
          margin-top: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default ValueCard;
