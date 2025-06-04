export default function SectionHeading({ children }) {
  return (
    <h2 className="section-heading">
      {children}
      <style>{`
        .section-heading {
          margin: 1.5rem 0 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
      `}</style>
    </h2>
  );
}
