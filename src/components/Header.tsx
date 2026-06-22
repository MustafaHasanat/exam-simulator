import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EXAM_CONFIGS } from '../data';
import { SearchBar } from './SearchBar';
import styles from './Header.module.css';

interface HeaderProps {
  showStickySearch?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  /** When set, intercepts logo click and delegates to caller (e.g. exam leave guard). */
  onHomeClick?: (e: React.MouseEvent) => void;
}

export function Header({ showStickySearch = false, search = '', onSearchChange, onHomeClick }: HeaderProps) {
  const { examCount, questionCount } = useMemo(() => {
    const exams = Object.values(EXAM_CONFIGS);
    return {
      examCount: exams.length,
      questionCount: exams.reduce((sum, cfg) => sum + cfg.bank.length, 0),
    };
  }, []);

  const brandContent = (
    <>
      <img src="/logo.png" alt="" className={styles.logo} aria-hidden="true" />
      <span className={styles.brandName}>Oscar</span>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.accentBar} />
      <div className={styles.inner}>
        {onHomeClick ? (
          <a href="/" className={styles.brand} aria-label="Oscar home" onClick={onHomeClick}>
            {brandContent}
          </a>
        ) : (
          <Link to="/" className={styles.brand} aria-label="Oscar home">
            {brandContent}
          </Link>
        )}

        <div className={styles.right}>
          <span className={styles.pill}>{examCount} Exams</span>
          <span className={styles.pill}>{questionCount.toLocaleString()}+ Questions</span>

          {onSearchChange && (
            <div className={`${styles.searchSlot} ${showStickySearch ? styles.searchSlotVisible : ''}`}>
              <SearchBar
                value={search}
                onChange={onSearchChange}
                className={styles.headerSearch}
                placeholder="Search exams…"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
