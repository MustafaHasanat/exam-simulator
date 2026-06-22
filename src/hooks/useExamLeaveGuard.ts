import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { useBlocker, useBeforeUnload, useNavigate } from 'react-router-dom';

export type LeaveAction =
  | { kind: 'navigate'; to: string }
  | { kind: 'reload' };

export function useExamLeaveGuard(enabled: boolean) {
  const navigate = useNavigate();
  const allowLeaveRef = useRef(false);
  const [pending, setPending] = useState<LeaveAction | null>(null);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!enabled || allowLeaveRef.current) return false;
    return (
      currentLocation.pathname !== nextLocation.pathname ||
      currentLocation.search !== nextLocation.search
    );
  });

  useBeforeUnload(
    useCallback(() => {
      if (enabled && !allowLeaveRef.current) return true;
    }, [enabled]),
  );

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (allowLeaveRef.current) return;

      const isRefresh =
        e.key === 'F5' ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r');

      if (isRefresh) {
        e.preventDefault();
        setPending({ kind: 'reload' });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled]);

  const allowLeave = useCallback(() => {
    allowLeaveRef.current = true;
  }, []);

  const requestLeave = useCallback((action: LeaveAction) => {
    if (allowLeaveRef.current) {
      if (action.kind === 'navigate') navigate(action.to);
      else window.location.reload();
      return;
    }
    setPending(action);
  }, [navigate]);

  const interceptHome = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      requestLeave({ kind: 'navigate', to: '/' });
    },
    [requestLeave],
  );

  const confirmLeave = useCallback(() => {
    allowLeaveRef.current = true;

    if (blocker.state === 'blocked') {
      blocker.proceed();
      setPending(null);
      return;
    }

    const action = pending;
    setPending(null);

    if (action?.kind === 'navigate') navigate(action.to);
    else if (action?.kind === 'reload') window.location.reload();
  }, [blocker, pending, navigate]);

  const cancelLeave = useCallback(() => {
    setPending(null);
    if (blocker.state === 'blocked') blocker.reset();
  }, [blocker]);

  const showModal = pending !== null || blocker.state === 'blocked';

  return {
    showModal,
    confirmLeave,
    cancelLeave,
    interceptHome,
    allowLeave,
  };
}
