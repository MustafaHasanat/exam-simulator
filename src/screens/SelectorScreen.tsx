import { useMemo, useRef, useEffect, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXAM_CONFIGS } from '../data';
import { examPath } from '../routes/paths';
import { SearchBar } from '../components/SearchBar';
import searchStyles from '../components/SearchBar.module.css';
import { CATEGORY_ORDER, categoryStyle, getCategoryTheme } from '../themes/categories';
import type { ExamConfig } from '../types';
import styles from './SelectorScreen.module.css';

interface SelectorScreenProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string | null;
  onCategoryChange: (provider: string | null) => void;
  onHeroSearchVisibleChange: (visible: boolean) => void;
}

function ExamCard({ cfg, onSelect }: { cfg: ExamConfig; onSelect: () => void }) {
  return (
    <div
      className={styles.card}
      style={categoryStyle(cfg.provider)}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className={styles.levelBadge}>{cfg.level}</div>
      <div className={styles.code}>{cfg.label}</div>
      <div className={styles.name}>{cfg.fullName}</div>

      <div className={styles.stats}>
        {[
          { val: cfg.questions, lbl: 'Questions' },
          { val: `${cfg.minutes}m`, lbl: 'Duration' },
          { val: `${cfg.pass}%`, lbl: 'Pass Mark' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className={styles.stat}>
            <span className={styles.statVal}>{val}</span>
            <span className={styles.statLbl}>{lbl}</span>
          </div>
        ))}
      </div>

      <p className={styles.desc}>{cfg.description}</p>

      <div className={styles.cardFooter}>
        <span className={styles.priceTag}>{cfg.price}</span>
        <button className={styles.cardBtn}>
          Start {cfg.label} →
        </button>
      </div>
    </div>
  );
}

export function SelectorScreen({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onHeroSearchVisibleChange,
}: SelectorScreenProps) {
  const navigate = useNavigate();
  const heroSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroSearchRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => onHeroSearchVisibleChange(entry.isIntersecting),
      { threshold: 0, rootMargin: '-58px 0px 0px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onHeroSearchVisibleChange]);

  const allExams = useMemo(() => Object.values(EXAM_CONFIGS), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allExams.forEach((cfg) => {
      counts[cfg.provider] = (counts[cfg.provider] ?? 0) + 1;
    });
    return counts;
  }, [allExams]);

  const filterCategories = useMemo(
    () => CATEGORY_ORDER.filter((p) => categoryCounts[p]),
    [categoryCounts],
  );

  const filtered = useMemo(() => {
    const list = category ? allExams.filter((cfg) => cfg.provider === category) : allExams;
    const q = search.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      (cfg) =>
        cfg.fullName.toLowerCase().includes(q) ||
        cfg.label.toLowerCase().includes(q) ||
        cfg.provider.toLowerCase().includes(q) ||
        cfg.level.toLowerCase().includes(q),
    );
  }, [allExams, search, category]);

  const groups = useMemo(() => {
    const map: Record<string, ExamConfig[]> = {};
    filtered.forEach((cfg) => {
      if (!map[cfg.provider]) map[cfg.provider] = [];
      map[cfg.provider].push(cfg);
    });
    const ordered = CATEGORY_ORDER.filter((p) => map[p]?.length).map((p) => ({
      provider: p,
      exams: map[p],
    }));
    const rest = Object.keys(map)
      .filter((p) => !CATEGORY_ORDER.includes(p as typeof CATEGORY_ORDER[number]))
      .map((p) => ({ provider: p, exams: map[p] }));
    return [...ordered, ...rest];
  }, [filtered]);

  const totalQuestions = allExams.reduce((s, c) => s + c.bank.length, 0);

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <div className={styles.brandMark}>
          <div className={styles.brandRow}>
            <img src="/logo.png" alt="" className={styles.brandLogo} aria-hidden="true" />
            <span className={styles.brandName}>Oscar</span>
          </div>
          <p className={styles.brandTagline}>
            <span className={styles.acronymLetter}>O</span>nline{' '}
            <span className={styles.acronymLetter}>S</span>imulator for{' '}
            <span className={styles.acronymLetter}>C</span>ertification{' '}
            <span className={styles.acronymLetter}>A</span>ssessment{' '}
            <span className={styles.acronymLetter}>R</span>eadiness
          </p>
        </div>
        <h1 className={styles.title}>
          Master Your <em>Certification</em>
        </h1>
        <p className={styles.sub}>
          Choose from {allExams.length} certification tracks · {totalQuestions.toLocaleString()}+ practice questions ·
          Randomised each attempt
        </p>

        <div ref={heroSearchRef} className={styles.searchWrap}>
          <div className={styles.searchBarWrap}>
            <SearchBar
              value={search}
              onChange={onSearchChange}
              className={searchStyles.heroWrap}
              inputClassName={searchStyles.heroInput}
            />
          </div>

          <div className={styles.categoryFilters} role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`${styles.categoryChip} ${!category ? styles.categoryChipActive : ''}`}
              onClick={() => onCategoryChange(null)}
              aria-pressed={!category}
            >
              All
              <span className={styles.chipCount}>{allExams.length}</span>
            </button>
            {filterCategories.map((provider) => {
              const theme = getCategoryTheme(provider);
              const active = category === provider;
              return (
                <button
                  key={provider}
                  type="button"
                  className={`${styles.categoryChip} ${active ? styles.categoryChipActive : ''}`}
                  style={{
                    '--chip-primary': theme.primary,
                    '--chip-tint': theme.tint,
                  } as CSSProperties}
                  onClick={() => onCategoryChange(active ? null : provider)}
                  aria-pressed={active}
                >
                  <span className={styles.chipDot} />
                  {theme.label}
                  <span className={styles.chipCount}>{categoryCounts[provider]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className={styles.empty}>
          No exams match
          {search && <> <strong>"{search}"</strong></>}
          {category && (
            <>
              {search ? ' in' : ''} <strong>{getCategoryTheme(category).label}</strong>
            </>
          )}
        </div>
      ) : (
        <div className={styles.groups}>
          {groups.map(({ provider, exams }, gi) => (
            <section
              key={provider}
              className={styles.providerSection}
              style={categoryStyle(provider)}
              data-category={provider}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.providerBadge}>{provider}</span>
                <span className={styles.sectionLine} />
                <span className={styles.sectionCount}>
                  {exams.length} exam{exams.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className={styles.cards}>
                {exams.map((cfg, ci) => (
                  <div
                    key={cfg.id}
                    style={{ animationDelay: `${gi * 0.08 + ci * 0.07}s` }}
                    className={styles.cardWrapper}
                  >
                    <ExamCard cfg={cfg} onSelect={() => navigate(examPath(cfg.id))} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className={styles.statsBar}>
        {allExams.length} exams · {totalQuestions.toLocaleString()} total questions
      </div>
    </div>
  );
}
