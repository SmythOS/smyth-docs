import React from 'react';
import Link from '@docusaurus/Link';
import YouTube from '@site/src/components/Youtube';
import Arcade from '@site/src/components/Arcade';
import Card from '@site/src/components/Card';
import CardGrid from '@site/src/components/CardGrid';
import MDXComponents from '@theme-original/MDXComponents';

export default {
  // keep defaults
  ...MDXComponents,
  // expose Link globally
  Link,
  YouTube,
  Arcade,
  Card,
  CardGrid,
};
