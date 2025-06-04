import React from 'react';

interface ArcadeEmbedProps {
  src: string;
  title: string;
}

export default function Arcade({ src, title }: ArcadeEmbedProps) {
  return (
    <div className="arcade-embed">
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        loading="lazy"
        allow="clipboard-write"
        allowFullScreen
        className="arcade-iframe"
      />
      <style>{`
        .arcade-embed {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .arcade-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          color-scheme: light;
        }
      `}</style>
    </div>
  );
}
