import type { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  icon: string;
  title: string;
  body: ReactNode;
  actions: ReactNode;
}

export function Modal({ icon, title, body, actions }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{body}</div>
        <div className={styles.btns}>{actions}</div>
      </div>
    </div>
  );
}

export { styles as modalStyles };
