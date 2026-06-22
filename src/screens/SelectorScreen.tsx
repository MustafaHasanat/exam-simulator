import { useState, useMemo } from 'react';
import { EXAM_CONFIGS } from '../data';
import { CATEGORY_ORDER, categoryStyle } from '../themes/categories';
import type { ExamConfig } from '../types';
import styles from './SelectorScreen.module.css';

interface SelectorScreenProps {
  onSelectExam: (examId: string) => void;
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

export function SelectorScreen({ onSelectExam }: SelectorScreenProps) {
  const [search, setSearch] = useState('');

  const allExams = useMemo(() => Object.values(EXAM_CONFIGS), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allExams;
    return allExams.filter(
      (cfg) =>
        cfg.fullName.toLowerCase().includes(q) ||
        cfg.label.toLowerCase().includes(q) ||
        cfg.provider.toLowerCase().includes(q) ||
        cfg.level.toLowerCase().includes(q),
    );
  }, [allExams, search]);

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
        <div className={styles.eyebrow}>Certification · Practice Exams Simulator</div>
        <h1 className={styles.title}>
          Master Your <em>Certification</em>
        </h1>
        <p className={styles.sub}>
          Choose from {allExams.length} certification tracks · {totalQuestions.toLocaleString()}+ practice questions ·
          Randomised each attempt
        </p>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search exams by name, provider, or level…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Clear">
              ✕
            </button>
          )}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className={styles.empty}>
          No exams match <strong>"{search}"</strong>
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
                    <ExamCard cfg={cfg} onSelect={() => onSelectExam(cfg.id)} />
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
