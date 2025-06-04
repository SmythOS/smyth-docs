import { ReactNode } from 'react';

export default function TermTable({ children }: { children: ReactNode }) {
  return (
    <table className="term-table">
      <tbody className="term-body">{children}</tbody>
      <style>{`
        .term-table {
          width: 100%;
          margin: 1.5rem 0;
          border: 1px solid #e5e7eb;
          border-collapse: collapse;
        }

        .term-body > tr + tr {
          border-top: 1px solid #e5e7eb;
        }

        :root[data-theme='dark'] .term-table {
          border-color: #334155;
        }

        :root[data-theme='dark'] .term-body > tr + tr {
          border-color: #334155;
        }
      `}</style>
    </table>
  );
}
