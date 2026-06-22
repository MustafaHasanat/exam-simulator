import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  totalSeconds: number;
  onExpire: () => void;
}

export function useTimer({ totalSeconds, onExpire }: UseTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [timeUsed, setTimeUsed] = useState(0);
  const [running, setRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          onExpireRef.current();
          return 0;
        }
        return s - 1;
      });
      setTimeUsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback(() => {
    setSecondsLeft(totalSeconds);
    setTimeUsed(0);
    setRunning(true);
  }, [totalSeconds]);

  const stop = useCallback(() => setRunning(false), []);

  const formatted = (() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  })();

  const urgency: 'normal' | 'warn' | 'danger' =
    secondsLeft <= 300 ? 'danger' : secondsLeft <= 600 ? 'warn' : 'normal';

  return { secondsLeft, timeUsed, formatted, urgency, start, stop };
}
