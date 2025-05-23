import React from 'react';

/**
 * Image component – centers an image, constrains it to a max width,
 * and (optionally) adds a green border + rounded corners. Supports optional aspect ratio.
 *
 * Props
 * ─────
 * src            – required, image URL
 * alt            – optional, alt text (default '')
 * caption        – optional string shown under the image
 * bordered       – boolean, show green border (default true)
 * maxWidth       – number | string, inner container max width (default 700)
 * wrapperStyle   – object, extra styles for the outer wrapper
 * containerStyle – object, extra styles for the inner container
 * imgStyle       – object, extra styles for <img>
 * aspectRatio    – optional string like "4:3" or "16:9"
 */
const Image = ({
  src,
  alt = '',
  caption,
  bordered = true,
  maxWidth = 700,
  wrapperStyle = {},
  containerStyle = {},
  imgStyle = {},
  aspectRatio, // Optional: e.g., "4:3"
}  : {
  src: string;
  alt?: string;
  caption?: string;
  bordered?: boolean;
  maxWidth?: number | string;
  wrapperStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  aspectRatio?: string;
}) => {
  
  // Outer <div> – matches the flex-center + top/bottom margin
  const outer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    ...wrapperStyle,
  };

  // Handle aspect ratio if provided
  let aspectPadding = null;
  if (aspectRatio && aspectRatio.includes(':')) {
    const [w, h] = aspectRatio.split(':').map(Number);
    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
      aspectPadding = `${(h / w) * 100}%`;
    }
  }
  // Inner <div> – replicates the max-width:700px container
  const inner: React.CSSProperties = {
    maxWidth,
    width: '100%',
    position: aspectPadding ? 'relative' : 'static',
    ...(aspectPadding ? { paddingTop: aspectPadding } : {}),
    ...containerStyle,
  };
  // Actual <img>
  const img: React.CSSProperties = {
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    width: aspectPadding ? '100%' : 'auto',
    height: aspectPadding ? '100%' : 'auto',
    objectFit: aspectPadding ? 'cover' : 'initial',
    position: aspectPadding ? 'absolute' : 'static',
    top: 0,
    left: 0,
    border: bordered ? '3px solid #3efcc2' : 'none',
    borderRadius: bordered ? 10 : 0,
    ...imgStyle,
  };

  return (
    <div style={outer}>
      <div style={inner}>
        <img src={src} alt={alt} style={img} />
      </div>
      {caption && (
        <p style={{ textAlign: 'center', fontSize: 14, marginTop: 10 }}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default Image;
