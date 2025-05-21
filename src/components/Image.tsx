import React from 'react';

/**
 * Image component – centers an image, constrains it to a max width,
 * and (optionally) adds a green border + rounded corners.
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
}) => {
  // Outer <div> – matches the flex-center + top/bottom margin
  const outer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    ...wrapperStyle,
  };

  // Inner <div> – replicates the max-width:700px container
  const inner = {
    maxWidth,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...containerStyle,
  };

  // Actual <img>
  const img = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: 'auto',
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
