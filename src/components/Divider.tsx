export default function Divider() {
  return (
    <>
      <div className="docs-divider" />
      <style>{`
        .docs-divider {
          margin: 1rem 0;
          height: 1px;
          width: 100%;
          background-color: #e5e7eb;
        }

        :root[data-theme='dark'] .docs-divider {
          background-color: #334155;
        }
      `}</style>
    </>
  );
}