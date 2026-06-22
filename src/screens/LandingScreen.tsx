import type { ExamConfig } from '../types';
import styles from './LandingScreen.module.css';

interface LandingScreenProps {
  config: ExamConfig;
  onStart: () => void;
  onBack: () => void;
}

export function LandingScreen({ config, onStart, onBack }: LandingScreenProps) {
  const is102 = config.id === '102';
  const accentClass = is102 ? styles.accent102 : styles.accent101;

  return (
    <div className={`${styles.screen} ${is102 ? styles.screen102 : styles.screen101}`}>
      <button className={styles.backBtn} onClick={onBack}>
        ← All Exams
      </button>

      <div className={`${styles.badge} ${is102 ? styles.badge102 : styles.badge101}`}>
        {config.label} · {config.level}
      </div>

      <h1 className={styles.title}>
        TOGAF<sup>®</sup> {is102 ? 'Practitioner' : 'Foundation'}
        <br />
        <em className={accentClass}>Practice Exam</em>
      </h1>

      <p className={styles.sub}>
        {is102 ? 'Scenario-based' : 'Real exam format'} · {config.questions} questions ·{' '}
        {config.minutes}-minute timer · Randomised from a {config.bank.length}-question bank
      </p>

      <div className={styles.metaGrid}>
        {[
          { val: config.questions, lbl: 'Questions' },
          { val: config.minutes, lbl: 'Minutes' },
          { val: `${config.pass}%`, lbl: 'Pass Mark' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className={styles.metaBox}>
            <span className={`${styles.metaVal} ${is102 ? styles.metaVal102 : styles.metaVal101}`}>
              {val}
            </span>
            <span className={styles.metaLbl}>{lbl}</span>
          </div>
        ))}
      </div>

      <button
        className={`${styles.startBtn} ${is102 ? styles.startBtn102 : styles.startBtn101}`}
        onClick={onStart}
      >
        Start Exam
      </button>

      <div className={styles.bankInfo}>
        Bank: {config.bank.length} questions · {config.questions} drawn at random each attempt
      </div>

      {is102 && (
        <div className={styles.note102}>
          <strong>Open Book Exam:</strong> In the real OGEA-102, you may reference the TOGAF
          standard. This simulator is closed-book to help you study — practise recalling
          principles under pressure for maximum retention.
        </div>
      )}
    </div>
  );
}
