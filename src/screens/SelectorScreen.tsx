import { EXAM_CONFIGS } from '../data';
import styles from './SelectorScreen.module.css';

interface SelectorScreenProps {
  onSelectExam: (examId: string) => void;
}

export function SelectorScreen({ onSelectExam }: SelectorScreenProps) {
  const exams = Object.values(EXAM_CONFIGS);

  return (
    <div className={styles.screen}>
      <div className={styles.eyebrow}>TOGAF® Certification · Exam Simulator</div>
      <h1 className={styles.title}>
        Choose Your <em>Exam</em>
      </h1>
      <p className={styles.sub}>
        Select a certification exam below. Each session draws 40 questions
        randomly from a 120+ question bank.
      </p>

      <div className={styles.cards}>
        {exams.map((cfg) => {
          const is102 = cfg.id === '102';
          return (
            <div
              key={cfg.id}
              className={`${styles.card} ${is102 ? styles.card102 : styles.card101}`}
              onClick={() => onSelectExam(cfg.id)}
            >
              <div className={`${styles.level} ${is102 ? styles.level102 : styles.level101}`}>
                {cfg.level}
              </div>
              <div className={styles.code}>{cfg.label}</div>
              <div className={styles.name}>{cfg.fullName}</div>

              <div className={styles.stats}>
                {[
                  { val: cfg.questions, lbl: 'Questions' },
                  { val: `${cfg.minutes}m`, lbl: 'Duration' },
                  { val: `${cfg.pass}%`, lbl: 'Pass Mark' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className={styles.stat}>
                    <span className={`${styles.statVal} ${is102 ? styles.statVal102 : styles.statVal101}`}>
                      {val}
                    </span>
                    <span className={styles.statLbl}>{lbl}</span>
                  </div>
                ))}
              </div>

              <p className={styles.desc}>
                {is102
                  ? 'Tests ability to apply TOGAF in real-world scenarios. Scenario-based questions requiring analysis and judgment. Open book in the real exam.'
                  : 'Tests knowledge and understanding of TOGAF terminology, the ADM lifecycle, core concepts, and the Architecture Content Framework. Closed book.'}
              </p>

              <button className={`${styles.cardBtn} ${is102 ? styles.cardBtn102 : styles.cardBtn101}`}>
                Start {cfg.label} →
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        {exams.map((cfg, i) => (
          <span key={cfg.id}>
            {cfg.label} bank: {cfg.bank.length} questions
            {i < exams.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
