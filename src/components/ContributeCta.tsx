import { buildContributeMailto } from '../utils/contributeEmail';
import styles from './ContributeCta.module.css';

interface ContributeCtaProps {
  examLabel?: string;
  compact?: boolean;
}

export function ContributeCta({ examLabel, compact = false }: ContributeCtaProps) {
  const mailto = buildContributeMailto(examLabel);

  return (
    <div className={`${styles.cta} ${compact ? styles.compact : ''}`}>
      <p className={styles.text}>
        {examLabel
          ? `Want to help us build the ${examLabel} question bank? We'd love your contribution.`
          : 'Want to help us build a question bank for your certification? We\u2019d love your contribution.'}
      </p>
      <a href={mailto} className={styles.btn}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Contact us
      </a>
    </div>
  );
}
