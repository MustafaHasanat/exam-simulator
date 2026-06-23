import { ContributeCta } from './ContributeCta';
import { CATEGORY_ORDER, CATEGORY_THEMES } from '../themes/categories';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <ContributeCta />
        <div className={styles.providers}>
          {CATEGORY_ORDER.map((name, i) => {
            const theme = CATEGORY_THEMES[name];
            return (
              <span key={name} className={styles.providerGroup}>
                {i > 0 && <span className={styles.sep}>·</span>}
                <span className={styles.providerItem}>
                  <span className={styles.dot} style={{ background: theme.primary }} />
                  {theme.label}
                </span>
              </span>
            );
          })}
        </div>
        <div className={styles.copy}>
          <span>Oscar — Online Simulator for Certification Assessment Readiness</span>
          <span className={styles.sep}>·</span>
          <span>For study purposes only</span>
          <span className={styles.sep}>·</span>
          <span>Not affiliated with certification bodies</span>
        </div>
      </div>
    </footer>
  );
}
