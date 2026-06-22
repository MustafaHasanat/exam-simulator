import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.providers}>
          <span className={styles.providerItem}>
            <span className={styles.dot} style={{ background: 'var(--accent)' }} />
            The Open Group · TOGAF®
          </span>
          <span className={styles.sep}>·</span>
          <span className={styles.providerItem}>
            <span className={styles.dot} style={{ background: 'var(--aws)' }} />
            Amazon Web Services
          </span>
        </div>
        <div className={styles.copy}>
          <span>Practice Exams Simulator</span>
          <span className={styles.sep}>·</span>
          <span>For study purposes only</span>
          <span className={styles.sep}>·</span>
          <span>Not affiliated with certification bodies</span>
        </div>
      </div>
    </footer>
  );
}
