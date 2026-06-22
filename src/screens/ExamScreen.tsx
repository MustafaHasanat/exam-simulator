import { useState, useCallback, useEffect } from 'react';
import type { ExamConfig, Question, ExamResult } from '../types';
import { useTimer } from '../hooks/useTimer';
import { LETTERS } from '../hooks/utils';
import { Modal, modalStyles } from '../components/Modal';
import { categoryStyle } from '../themes/categories';
import styles from './ExamScreen.module.css';

interface ExamScreenProps {
  config: ExamConfig;
  questions: Question[];
  onComplete: (result: ExamResult) => void;
  onCancel: () => void;
}

type ModalType = 'cancel' | 'submit' | 'timeout' | null;

export function ExamScreen({ config, questions, onComplete, onCancel }: ExamScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [modal, setModal] = useState<ModalType>(null);
  const catStyle = categoryStyle(config.provider);
  const total = questions.length;

  const handleExpire = useCallback(() => setModal('timeout'), []);

  const { formatted, urgency, timeUsed, start, stop } = useTimer({
    totalSeconds: config.minutes * 60,
    onExpire: handleExpire,
  });

  // Start timer on mount
  useEffect(() => {
    start();
    return () => stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = useCallback(
    (finalAnswers: Record<number, number>, finalTimeUsed: number) => {
      stop();
      onComplete({ examId: config.id, questions, answers: finalAnswers, timeUsed: finalTimeUsed });
    },
    [stop, onComplete, config.id, questions]
  );

  const selectAnswer = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optIdx }));
  };

  const answeredCount = Object.keys(answers).length;
  const unanswered = total - answeredCount;

  const timerClass = [
    styles.timer,
    urgency === 'danger' ? styles.timerDanger : urgency === 'warn' ? styles.timerWarn : '',
  ]
    .filter(Boolean)
    .join(' ');

  const q = questions[currentQ];
  const selectedOpt = answers[currentQ];

  return (
    <div className={styles.screen} style={catStyle}>
      {/* ── Topbar ── */}
      <div className={styles.topbar}>
        <div className={styles.topLeft}>
          <span className={styles.examLabel}>
            {config.label}
          </span>
          <span className={styles.qCounter}>
            Q <strong>{currentQ + 1}</strong> / {total}
          </span>
        </div>

        <div className={styles.topCenter}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentQ + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.topRight}>
          <div className={timerClass}>{formatted}</div>
          <button className={styles.cancelBtn} onClick={() => setModal('cancel')}>
            Cancel Exam
          </button>
        </div>
      </div>

      {/* ── Question body ── */}
      <div className={styles.body}>
        <div className={styles.domainTag}>{q.domain}</div>

        {q.scenario && (
          <div className={styles.scenario}>
            <span className={styles.scenarioLabel}>Scenario</span>
            {q.scenario}
          </div>
        )}

        <div className={styles.qText}>{q.q}</div>

        <div className={styles.options}>
          {q.opts.map((opt, oi) => {
            const selected = selectedOpt === oi;
            const selectedClass = selected ? styles.optionSelected : '';
            const letterClass = selected ? styles.optLetterSelected : '';
            return (
              <button
                key={oi}
                className={`${styles.optionBtn} ${selectedClass}`}
                onClick={() => selectAnswer(oi)}
              >
                <span className={`${styles.optLetter} ${letterClass}`}>{LETTERS[oi]}</span>
                <span className={styles.optText}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div className={styles.footer}>
        <div className={styles.answeredCount}>
          Answered: <strong>{answeredCount}</strong> / {total}
        </div>
        <div className={styles.navBtns}>
          <button
            className={styles.navBtn}
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((q) => q - 1)}
          >
            ← Prev
          </button>
          {currentQ < total - 1 ? (
            <button className={styles.navBtn} onClick={() => setCurrentQ((q) => q + 1)}>
              Next →
            </button>
          ) : (
            <button
              className={styles.submitBtn}
              onClick={() => setModal('submit')}
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {/* ── Dot sidebar nav ── */}
      <div className={styles.dotNav}>
        {questions.map((_, i) => {
          const isCurrent = i === currentQ;
          const isAnswered = answers[i] !== undefined && !isCurrent;
          const dotClass = [
            styles.dot,
            isCurrent ? styles.dotCurrent : isAnswered ? styles.dotAnswered : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <button
              key={i}
              className={dotClass}
              title={`Q${i + 1}`}
              onClick={() => setCurrentQ(i)}
            />
          );
        })}
      </div>

      {/* ── Cancel modal ── */}
      {modal === 'cancel' && (
        <Modal
          icon="⚠️"
          title="Cancel This Exam?"
          body="Your progress will be lost. You will return to the exam landing page."
          actions={
            <>
              <button className={modalStyles.btnGhost} onClick={() => setModal(null)}>
                Keep Going
              </button>
              <button className={modalStyles.btnDanger} onClick={onCancel}>
                Yes, Cancel
              </button>
            </>
          }
        />
      )}

      {/* ── Submit modal ── */}
      {modal === 'submit' && (
        <Modal
          icon="📋"
          title="Submit Your Exam?"
          body={
            <>
              You have answered {answeredCount} of {total} questions.
              {unanswered > 0 && (
                <>
                  {' '}
                  <strong>
                    {unanswered} question{unanswered > 1 ? 's' : ''} unanswered
                  </strong>{' '}
                  — will be marked as skipped. Submit anyway?
                </>
              )}
              {unanswered === 0 && ' Are you ready to submit and see your results?'}
            </>
          }
          actions={
            <>
              <button className={modalStyles.btnGhost} onClick={() => setModal(null)}>
                Review More
              </button>
              <button
                className={modalStyles.btnPrimary}
                style={catStyle}
                onClick={() => finish(answers, timeUsed)}
              >
                Submit Now
              </button>
            </>
          }
        />
      )}

      {/* ── Timeout modal ── */}
      {modal === 'timeout' && (
        <Modal
          icon="⏰"
          title="Time's Up!"
          body="Your time has ended. Your exam has been submitted automatically with your current answers."
          actions={
            <button
              className={modalStyles.btnPrimary}
              style={catStyle}
              onClick={() => finish(answers, timeUsed)}
            >
              See My Results
            </button>
          }
        />
      )}
    </div>
  );
}
