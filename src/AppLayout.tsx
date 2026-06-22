import { Outlet, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import styles from './App.module.css';

export function AppLayout() {
  const { pathname } = useLocation();
  const isFocusedScreen = pathname.startsWith('/exams/simulator/');

  return (
    <div className={styles.layout}>
      <ScrollToTop />
      <main className={`${styles.main} ${isFocusedScreen ? styles.mainFocused : ''}`}>
        <Outlet />
      </main>
    </div>
  );
}
