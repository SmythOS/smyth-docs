import React from 'react';

interface ValueGridProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}

const ValueGrid: React.FC<ValueGridProps> = ({ children, textAlign = 'left' }) => {
  return (
    <div className="value-grid" style={{ textAlign }}>
      {children}
      <style>{`
        .value-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin: 2rem 0;
        }

        @media (max-width: 640px) {
          .value-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ValueGrid;
