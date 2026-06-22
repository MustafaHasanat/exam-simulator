import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getExamByCode, simulatorPath } from '../routes/paths';
import type { ExamResult } from '../types';
import { ResultsScreen } from '../screens/ResultsScreen';
import { Header } from '../components/Header';

export function ExamResultPage() {
  const { examCode } = useParams<{ examCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const config = getExamByCode(examCode);
  const result = location.state?.result as ExamResult | undefined;

  if (!config) {
    return <Navigate to="/" replace />;
  }

  if (!result || result.examId !== config.id) {
    return <Navigate to={simulatorPath(config.id)} replace />;
  }

  return (
    <>
      <Header />
      <ResultsScreen
        result={result}
        config={config}
        onRestart={() => navigate(simulatorPath(config.id))}
        onHome={() => navigate('/')}
      />
    </>
  );
}
