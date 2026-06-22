import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getExamByCode, simulatorPath } from '../routes/paths';
import { LandingScreen } from '../screens/LandingScreen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function ExamLandingPage() {
  const { examCode } = useParams<{ examCode: string }>();
  const navigate = useNavigate();
  const config = getExamByCode(examCode);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <LandingScreen
        config={config}
        onStart={() => navigate(simulatorPath(config.id))}
        onBack={() => navigate(-1)}
      />
      <Footer />
    </>
  );
}
