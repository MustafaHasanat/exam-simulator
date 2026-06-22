import type { ExamConfig } from '../types';
import { categoryStyle } from '../themes/categories';
import styles from './LandingScreen.module.css';

interface LandingScreenProps {
  config: ExamConfig;
  onStart: () => void;
  onBack: () => void;
}

export function LandingScreen({ config, onStart, onBack }: LandingScreenProps) {
  const catStyle = categoryStyle(config.provider);

  return (
    <div className={styles.screen} style={catStyle}>
      <div className={styles.inner}>

        <button className={styles.backBtn} onClick={onBack}>
          ← All Exams
        </button>

        <div className={styles.headerBlock}>
          <div className={styles.badge}>
            {config.provider} · {config.level}
          </div>

          <h1 className={styles.title}>
            {config.fullName.split('–').map((part, i) => (
              i === 0
                ? <span key={i}>{part.trim()}</span>
                : <em key={i} className={styles.accent}>&nbsp;– {part.trim()}</em>
            ))}
          </h1>

          <p className={styles.sub}>{config.about}</p>
        </div>

        <div className={styles.metaGrid}>
          {[
            { val: config.questions, lbl: 'Questions', icon: '❓' },
            { val: config.minutes,   lbl: 'Minutes',   icon: '⏱' },
            { val: `${config.pass}%`, lbl: 'Pass Mark', icon: '🎯' },
            { val: config.bank.length, lbl: 'Bank Size', icon: '📚' },
          ].map(({ val, lbl, icon }) => (
            <div key={lbl} className={styles.metaBox}>
              <span className={styles.metaIcon}>{icon}</span>
              <span className={styles.metaVal}>{val}</span>
              <span className={styles.metaLbl}>{lbl}</span>
            </div>
          ))}
        </div>

        <div className={styles.detailPanel}>
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>Exam Domains</h3>
            <div className={styles.domains}>
              {config.examDomains.map((d) => (
                <div key={d.name} className={styles.domainRow}>
                  <div className={styles.domainLabel}>
                    <span className={styles.domainName}>{d.name}</span>
                    <span className={styles.domainWeight}>{d.weight}%</span>
                  </div>
                  <div className={styles.domainTrack}>
                    <div
                      className={styles.domainFill}
                      style={{ width: `${d.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>Exam Information</h3>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Provider</span>
                <span className={styles.infoValue}>{config.provider}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Exam Code</span>
                <span className={styles.infoValue}>{config.label}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Exam Fee</span>
                <span className={`${styles.infoValue} ${styles.priceHighlight}`}>{config.price}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Prerequisites</span>
                <span className={styles.infoValue}>{config.prerequisites ?? 'None'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Format</span>
                <span className={styles.infoValue}>
                  {config.questions} questions · {config.minutes} min
                </span>
              </div>
            </div>

            <a
              href={config.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerBtn}
            >
              <span>Register for this Exam</span>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {config.note && (
          <div className={styles.note}>
            <svg className={styles.noteIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>
              <strong>{config.note.split(':')[0]}:</strong>
              {config.note.split(':').slice(1).join(':')}
            </p>
          </div>
        )}

        <div className={styles.ctaRow}>
          <div className={styles.bankInfo}>
            {config.bank.length} questions in bank · {config.questions} drawn randomly per attempt
          </div>
          <button className={styles.startBtn} onClick={onStart}>
            Start Practice Exam
          </button>
        </div>

      </div>
    </div>
  );
}
