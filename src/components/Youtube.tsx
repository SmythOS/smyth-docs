import React from 'react';

interface Props {
  videoId: string;
  title?: string;
}

const YouTube = ({ videoId, title = 'YouTube Video' }: Props) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 ratio
        height: 0,
        overflow: 'hidden',
        margin: '1rem 0',
        borderRadius: '8px',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
      ></iframe>
    </div>
  );
};

export default YouTube;
