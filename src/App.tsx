import { useState, useCallback } from 'react';
import type { AppScreen, ExamResult, Question } from './types';
import { EXAM_CONFIGS } from './data';
import { pickRandom } from './hooks/utils';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SelectorScreen } from './screens/SelectorScreen';
import { LandingScreen } from './screens/LandingScreen';
import { ExamScreen } from './screens/ExamScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import styles from './App.module.css';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('selector');
  const [selectedExamId, setSelectedExamId] = useState<string>('101');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const config = EXAM_CONFIGS[selectedExamId];

  const handleSelectExam = useCallback((examId: string) => {
    setSelectedExamId(examId);
    setScreen('landing');
  }, []);

  const handleStartExam = useCallback(() => {
    const questions = pickRandom(config.bank, config.questions);
    setActiveQuestions(questions);
    setExamResult(null);
    setScreen('exam');
  }, [config]);

  const handleExamComplete = useCallback((result: ExamResult) => {
    setExamResult(result);
    setScreen('results');
  }, []);

  const handleCancelExam = useCallback(() => {
    setScreen('landing');
  }, []);

  const handleRestartExam = useCallback(() => {
    handleStartExam();
  }, [handleStartExam]);

  const handleGoHome = useCallback(() => {
    setScreen('selector');
  }, []);

  const handleBackFromLanding = useCallback(() => {
    setScreen('selector');
  }, []);

  // Exam and Results are focused screens — show minimal chrome (header only)
  const isFocusedScreen = screen === 'exam' || screen === 'results';
  const showFooter = !isFocusedScreen;

  return (
    <div className={styles.layout}>
      <Header />
      <main className={`${styles.main} ${isFocusedScreen ? styles.mainFocused : ''}`}>
        {screen === 'selector' && (
          <SelectorScreen onSelectExam={handleSelectExam} />
        )}
        {screen === 'landing' && (
          <LandingScreen
            config={config}
            onStart={handleStartExam}
            onBack={handleBackFromLanding}
          />
        )}
        {screen === 'exam' && (
          <ExamScreen
            config={config}
            questions={activeQuestions}
            onComplete={handleExamComplete}
            onCancel={handleCancelExam}
          />
        )}
        {screen === 'results' && examResult && (
          <ResultsScreen
            result={examResult}
            config={config}
            onRestart={handleRestartExam}
            onHome={handleGoHome}
          />
        )}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
