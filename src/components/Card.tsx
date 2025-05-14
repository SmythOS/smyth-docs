import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  description: string;
  to: string;
};

export default function Card({ title, description, to }: CardProps) {
  return (
    <Link className={styles.card} to={to}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
