import React from 'react';

const Button = ({ href, title, description, marginTop = 0 }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop,
  };

  const buttonStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    textDecoration: 'none',
    color: 'rgb(69, 201, 169)',
    backgroundColor: 'white',
    border: '2px solid rgb(69, 201, 169)',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <a
        href={href}
        style={buttonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgb(69, 201, 169)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = 'rgb(69, 201, 169)';
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold', fontSize: 22, display: 'block' }}>{title}</span>
          <span style={{ fontWeight: 300, fontSize: 14, display: 'block' }}>{description}</span>
        </div>
      </a>
    </div>
  );
};

export default Button;
