import { useState, useCallback } from 'react';
import type { AppScreen, ExamResult, Question } from './types';
import { EXAM_CONFIGS } from './data';
import { pickRandom } from './hooks/utils';
import { SelectorScreen } from './screens/SelectorScreen';
import { LandingScreen } from './screens/LandingScreen';
import { ExamScreen } from './screens/ExamScreen';
import { ResultsScreen } from './screens/ResultsScreen';

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

  switch (screen) {
    case 'selector':
      return <SelectorScreen onSelectExam={handleSelectExam} />;

    case 'landing':
      return (
        <LandingScreen
          config={config}
          onStart={handleStartExam}
          onBack={handleBackFromLanding}
        />
      );

    case 'exam':
      return (
        <ExamScreen
          config={config}
          questions={activeQuestions}
          onComplete={handleExamComplete}
          onCancel={handleCancelExam}
        />
      );

    case 'results':
      return examResult ? (
        <ResultsScreen
          result={examResult}
          config={config}
          onRestart={handleRestartExam}
          onHome={handleGoHome}
        />
      ) : null;

    default:
      return null;
  }
}
