import { useState, useMemo } from 'react';
import { EXAM_CONFIGS } from '../data';
import type { ExamConfig } from '../types';
import styles from './SelectorScreen.module.css';

interface SelectorScreenProps {
  onSelectExam: (examId: string) => void;
}

// Per-exam theme tokens (CSS class suffixes)
const CARD_THEME: Record<string, { card: string; level: string; statVal: string; btn: string }> = {
  '101': { card: styles.card101, level: styles.level101, statVal: styles.statVal101, btn: styles.cardBtn101 },
  '102': { card: styles.card102, level: styles.level102, statVal: styles.statVal102, btn: styles.cardBtn102 },
  'SAA': { card: styles.cardSAA, level: styles.levelSAA, statVal: styles.statValSAA, btn: styles.cardBtnSAA },
  'SAP': { card: styles.cardSAP, level: styles.levelSAP, statVal: styles.statValSAP, btn: styles.cardBtnSAP },
};

// Provider section styles
const PROVIDER_THEME: Record<string, { section: string; badge: string; line: string }> = {
  'TOGAF': { section: styles.sectionTOGAF, badge: styles.badgeTOGAF, line: styles.lineTOGAF },
  'AWS':   { section: styles.sectionAWS,   badge: styles.badgeAWS,   line: styles.lineAWS   },
};

function ExamCard({ cfg, onSelect }: { cfg: ExamConfig; onSelect: () => void }) {
  const theme = CARD_THEME[cfg.id] ?? CARD_THEME['101'];
  return (
    <div
      className={`${styles.card} ${theme.card}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className={`${styles.levelBadge} ${theme.level}`}>{cfg.level}</div>
      <div className={styles.code}>{cfg.label}</div>
      <div className={styles.name}>{cfg.fullName}</div>

      <div className={styles.stats}>
        {[
          { val: cfg.questions, lbl: 'Questions' },
          { val: `${cfg.minutes}m`, lbl: 'Duration' },
          { val: `${cfg.pass}%`, lbl: 'Pass Mark' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className={styles.stat}>
            <span className={`${styles.statVal} ${theme.statVal}`}>{val}</span>
            <span className={styles.statLbl}>{lbl}</span>
          </div>
        ))}
      </div>

      <p className={styles.desc}>{cfg.description}</p>

      <div className={styles.cardFooter}>
        <span className={styles.priceTag}>{cfg.price}</span>
        <button className={`${styles.cardBtn} ${theme.btn}`}>
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

  // Group filtered exams by provider, preserving order
  const groups = useMemo(() => {
    const order = ['TOGAF', 'AWS'];
    const map: Record<string, ExamConfig[]> = {};
    filtered.forEach((cfg) => {
      if (!map[cfg.provider]) map[cfg.provider] = [];
      map[cfg.provider].push(cfg);
    });
    return order.filter((p) => map[p]?.length).map((p) => ({ provider: p, exams: map[p] }));
  }, [filtered]);

  const totalQuestions = allExams.reduce((s, c) => s + c.bank.length, 0);

  return (
    <div className={styles.screen}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Certification · Practice Exams Simulator</div>
        <h1 className={styles.title}>
          Master Your <em>Certification</em>
        </h1>
        <p className={styles.sub}>
          Choose from {allExams.length} certification tracks · {totalQuestions}+ practice questions ·
          Randomised each attempt
        </p>

        {/* ── Search bar ── */}
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

      {/* ── Provider groups ── */}
      {groups.length === 0 ? (
        <div className={styles.empty}>
          No exams match <strong>"{search}"</strong>
        </div>
      ) : (
        <div className={styles.groups}>
          {groups.map(({ provider, exams }, gi) => {
            const pt = PROVIDER_THEME[provider] ?? PROVIDER_THEME['TOGAF'];
            return (
              <section
                key={provider}
                className={`${styles.providerSection} ${pt.section}`}
                style={{ animationDelay: `${gi * 0.08}s` }}
              >
                {/* section header */}
                <div className={styles.sectionHeader}>
                  <span className={`${styles.providerBadge} ${pt.badge}`}>{provider}</span>
                  <span className={`${styles.sectionLine} ${pt.line}`} />
                  <span className={styles.sectionCount}>
                    {exams.length} exam{exams.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* cards row */}
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
            );
          })}
        </div>
      )}

      {/* ── Stats footer ── */}
      <div className={styles.statsBar}>
        {allExams.map((cfg, i) => (
          <span key={cfg.id}>
            {cfg.label} · {cfg.bank.length} questions
            {i < allExams.length - 1 ? <span className={styles.statSep}>·</span> : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
