import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.accentBar} />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <svg className={styles.logoIcon} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="url(#hexGrad)" strokeWidth="1.8" />
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="url(#hexFill)" opacity="0.25" />
            <circle cx="14" cy="14" r="3" fill="url(#hexGrad)" />
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--accent2)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <linearGradient id="hexFill" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--accent2)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.brandText}>
            <span className={styles.brandName}>ExamSim</span>
            <span className={styles.brandDot}>·</span>
            <span className={styles.brandSub}>Practice Exams Simulator</span>
          </div>
        </div>
        <div className={styles.right}>
          <span className={styles.pill}>4 Exams</span>
          <span className={styles.pill}>340+ Questions</span>
        </div>
      </div>
    </header>
  );
}
