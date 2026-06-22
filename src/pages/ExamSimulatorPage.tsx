import { useCallback, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getExamByCode, examPath, resultPath } from '../routes/paths';
import { pickRandom } from '../hooks/utils';
import { useExamLeaveGuard } from '../hooks/useExamLeaveGuard';
import type { ExamResult } from '../types';
import { ExamScreen } from '../screens/ExamScreen';
import { Header } from '../components/Header';
import { LeaveExamModal } from '../components/LeaveExamModal';

export function ExamSimulatorPage() {
  const { examCode } = useParams<{ examCode: string }>();
  const navigate = useNavigate();
  const config = getExamByCode(examCode);
  const leaveGuard = useExamLeaveGuard(true);

  const questions = useMemo(() => {
    if (!config) return [];
    return pickRandom(config.bank, config.questions);
  }, [config]);

  const handleComplete = useCallback(
    (result: ExamResult) => {
      leaveGuard.allowLeave();
      navigate(resultPath(config!.id), { state: { result } });
    },
    [config, leaveGuard, navigate],
  );

  const handleCancel = useCallback(() => {
    leaveGuard.allowLeave();
    if (config) navigate(examPath(config.id));
  }, [config, leaveGuard, navigate]);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header onHomeClick={leaveGuard.interceptHome} />
      <ExamScreen
        config={config}
        questions={questions}
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
      {leaveGuard.showModal && (
        <LeaveExamModal
          onConfirm={leaveGuard.confirmLeave}
          onCancel={leaveGuard.cancelLeave}
        />
      )}
    </>
  );
}
