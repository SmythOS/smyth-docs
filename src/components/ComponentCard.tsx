interface Props {
  name: string;
  description: string;
}

export default function ComponentCard({ name, description }: Props) {
  return (
    <div className="component-card">
      <h4>{name}</h4>
      <p>{description}</p>
      <style>{`
        .component-card {
          margin: 0.5rem 0;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .component-card h4 {
          margin: 0 0 0.25rem;
          font-weight: 600;
          color: #111827;
        }

        .component-card p {
          margin: 0;
          font-size: 0.875rem;
          color: #4b5563;
        }

        :root[data-theme='dark'] .component-card {
          background: #1e293b;
          border-color: #334155;
        }

        :root[data-theme='dark'] .component-card h4 {
          color: #f3f4f6;
        }

        :root[data-theme='dark'] .component-card p {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
