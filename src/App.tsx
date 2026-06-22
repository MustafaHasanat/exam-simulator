import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { SelectorPage } from './pages/SelectorPage';
import { ExamLandingPage } from './pages/ExamLandingPage';
import { ExamSimulatorPage } from './pages/ExamSimulatorPage';
import { ExamResultPage } from './pages/ExamResultPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <SelectorPage /> },
      { path: '/exams/:examCode', element: <ExamLandingPage /> },
      { path: '/exams/simulator/:examCode/result', element: <ExamResultPage /> },
      { path: '/exams/simulator/:examCode', element: <ExamSimulatorPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
