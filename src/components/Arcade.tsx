import React from 'react';

interface ArcadeEmbedProps {
  src: string;
  title: string;
}

export default function Arcade({ src, title }: ArcadeEmbedProps) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        loading="lazy"
        allow="clipboard-write"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          colorScheme: 'light',
          border: 'none',
        }}
      />
    </div>
  );
}
