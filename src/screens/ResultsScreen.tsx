import { useEffect, useRef } from 'react';
import type { ExamResult, ExamConfig } from '../types';
import { LETTERS, formatTime } from '../hooks/utils';
import styles from './ResultsScreen.module.css';

interface ResultsScreenProps {
  result: ExamResult;
  config: ExamConfig;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultsScreen({ result, config, onRestart, onHome }: ResultsScreenProps) {
  const { questions, answers, timeUsed } = result;
  const is102 = config.id === '102';
  const total = questions.length;

  let correct = 0, wrong = 0, skipped = 0;
  questions.forEach((q, i) => {
    if (answers[i] === undefined) skipped++;
    else if (answers[i] === q.a) correct++;
    else wrong++;
  });

  const pct = Math.round((correct / total) * 100);
  const passed = pct >= config.pass;

  // Animate SVG ring
  const ringRef = useRef<SVGCircleElement>(null);
  const circumference = 427.26;
  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    el.style.strokeDashoffset = String(circumference);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = String(circumference - (pct / 100) * circumference);
      });
    });
  }, [pct]);

  const actionBtns = (
    <>
      <button
        className={`${styles.restartBtn} ${is102 ? styles.restartBtn102 : styles.restartBtn101}`}
        onClick={onRestart}
      >
        🔄 New {config.label} Exam
      </button>
      <button className={styles.homeBtn} onClick={onHome}>
        ← All Exams
      </button>
    </>
  );

  return (
    <div className={`${styles.screen} ${passed ? styles.screenPass : styles.screenFail}`}>
      <div className={styles.wrap}>
        {/* ── Score ring ── */}
        <div className={styles.ringWrap}>
          <div className={styles.ringLabel}>Exam Complete — Your Result</div>
          <div className={styles.ringContainer}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle className={styles.ringBg} cx="80" cy="80" r="68" />
              <circle
                ref={ringRef}
                className={`${styles.ringFill} ${passed ? styles.ringPass : styles.ringFail}`}
                cx="80" cy="80" r="68"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
              />
            </svg>
            <div className={styles.ringCenter}>
              <div className={`${styles.scorePct} ${passed ? styles.scorePctPass : styles.scorePctFail}`}>
                {pct}%
              </div>
              <div className={`${styles.scoreVerdict} ${passed ? styles.scoreVerdictPass : styles.scoreVerdictFail}`}>
                {passed ? 'PASS' : 'FAIL'}
              </div>
            </div>
          </div>

          <div className={styles.headline}>
            {passed ? '🎉 Congratulations — You Passed!' : '📚 Not Quite — Keep Studying'}
          </div>
          <div className={styles.resultSub}>
            {passed
              ? `You scored ${correct}/${total} (${pct}%), above the ${config.pass}% pass mark for ${config.label}.`
              : `You scored ${correct}/${total} (${pct}%), below the ${config.pass}% pass mark. Review the explanations and try again.`}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className={styles.statsGrid}>
          {[
            { val: correct, cls: styles.statValGreen, lbl: 'Correct' },
            { val: wrong, cls: styles.statValRed, lbl: 'Wrong' },
            { val: skipped, cls: styles.statValOrange, lbl: 'Skipped' },
            { val: formatTime(timeUsed), cls: styles.statValAccent, lbl: 'Time Used' },
          ].map(({ val, cls, lbl }) => (
            <div key={lbl} className={styles.statBox}>
              <span className={`${styles.statVal} ${cls}`}>{val}</span>
              <span className={styles.statLbl}>{lbl}</span>
            </div>
          ))}
        </div>

        {/* ── Top actions ── */}
        <div className={styles.actions}>{actionBtns}</div>

        {/* ── Review ── */}
        <div>
          <div className={styles.reviewHeader}>Question Review</div>
          {questions.map((q, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === q.a;
            const isSkipped = userAns === undefined;
            const status = isSkipped ? 'skipped' : isCorrect ? 'correct' : 'wrong';

            return (
              <div
                key={i}
                className={`${styles.reviewItem} ${
                  status === 'correct'
                    ? styles.reviewCorrect
                    : status === 'wrong'
                    ? styles.reviewWrong
                    : styles.reviewSkipped
                }`}
              >
                <div className={styles.riTop}>
                  <div className={styles.riNum}>Q{i + 1}</div>
                  <div className={styles.riQtext}>{q.q}</div>
                  <div
                    className={`${styles.riBadge} ${
                      status === 'correct'
                        ? styles.riBadgeCorrect
                        : status === 'wrong'
                        ? styles.riBadgeWrong
                        : styles.riBadgeSkipped
                    }`}
                  >
                    {status.toUpperCase()}
                  </div>
                </div>

                {q.scenario && (
                  <div className={styles.riScenario}>
                    <span className={styles.riScenarioLabel}>Scenario</span>
                    {q.scenario}
                  </div>
                )}

                <div className={styles.riAnswers}>
                  {!isSkipped ? (
                    <div>
                      Your answer:{' '}
                      <span className={isCorrect ? styles.riYourAnsOk : styles.riYourAns}>
                        {LETTERS[userAns]}. {q.opts[userAns]}
                      </span>
                    </div>
                  ) : (
                    <div style={{ color: 'var(--muted)' }}>Not answered</div>
                  )}
                  {!isCorrect && (
                    <div>
                      Correct answer:{' '}
                      <span className={styles.riCorrectAns}>
                        {LETTERS[q.a]}. {q.opts[q.a]}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.riExp}>💡 {q.exp}</div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom actions ── */}
        <div className={styles.actions} style={{ marginTop: '24px' }}>{actionBtns}</div>
      </div>
    </div>
  );
}
