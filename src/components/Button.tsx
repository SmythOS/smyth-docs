import React from 'react';

const Button = ({ href, title, description, marginTop = 0 }) => {
  return (
    <div className="docs-btn-wrapper" style={{ marginTop }}>
      <a href={href} className="docs-btn">
        <div>
          <span className="docs-btn-title">{title}</span>
          <span className="docs-btn-desc">{description}</span>
        </div>
      </a>
      <style>{`
        .docs-btn-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .docs-btn {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 20px;
          text-decoration: none;
          color: #08b68f;
          background-color: #ffffff;
          border: 2px solid #08b68f;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .docs-btn:hover {
          background-color: #08b68f;
          color: #ffffff;
        }

        .docs-btn-title {
          font-weight: bold;
          font-size: 22px;
          display: block;
        }

        .docs-btn-desc {
          font-weight: 300;
          font-size: 14px;
          display: block;
        }

        :root[data-theme='dark'] .docs-btn {
          background-color: #0f172a;
          color: #3efcc2;
          border-color: #3efcc2;
        }

        :root[data-theme='dark'] .docs-btn:hover {
          background-color: #3efcc2;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
};

export default Button;
