import { ReactNode } from 'react';

export default function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="feature-grid">
      {children}
      <style>{`
        .feature-grid {
          display: grid;
          gap: 1rem;
          margin: 1rem 0;
        }

        @media (min-width: 640px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
