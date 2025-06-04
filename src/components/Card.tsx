import React, { PropsWithChildren } from "react";
import Link from "@docusaurus/Link";

export interface CardProps {
  title: string;
  description: string;
  to: string;
}

export function CardGrid({ children }: PropsWithChildren<{}>) {
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

export function Card({ title, description, to }: CardProps) {
  return (
    <Link className="docs-card" to={to} aria-label={`Navigate to ${title}`}> 
      <h3>{title}</h3>
      <p>{description}</p>
      <style>{`
        .docs-card {
          display: block;
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background-color: #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          color: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .docs-card:hover {
          transform: scale(1.07);
          border-color: #08b68f;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-decoration: none;
        }

        .docs-card h3 {
          margin: 0 0 0.4rem;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .docs-card p {
          margin: 0;
          font-size: 0.9rem;
          color: #4b5563;
        }

        :root[data-theme='dark'] .docs-card {
          background-color: #1e293b;
          border-color: #334155;
        }

        :root[data-theme='dark'] .docs-card p {
          color: #cbd5e1;
        }
      `}</style>
    </Link>
  );
}
