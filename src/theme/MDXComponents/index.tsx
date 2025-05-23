import React from 'react';
import Link from '@docusaurus/Link';
import YouTube from '@site/src/components/Youtube';
import Arcade from '@site/src/components/Arcade';
import { Card } from "@site/src/components/Card";
import CardGrid from '@site/src/components/CardGrid';
import MDXComponents from '@theme-original/MDXComponents';
import Button from '@site/src/components/Button';
import Image from '@site/src/components/Image';
import PageFeedback from '@site/src/components/PageFeedback';
import ValueCard from '@site/src/components/ValueCard';
import ValueGrid from '@site/src/components/ValueGrid';

export default {
  // keep defaults
  ...MDXComponents,
  Link,
  YouTube,
  Arcade,
  Card,
  CardGrid,
  Image,
  PageFeedback,
  Button,
  ValueCard,
  ValueGrid,
};
