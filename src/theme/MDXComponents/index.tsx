import React from 'react';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme-original/MDXComponents';

export default {
  // keep defaults
  ...MDXComponents,
  // expose Link globally
  Link,
};
