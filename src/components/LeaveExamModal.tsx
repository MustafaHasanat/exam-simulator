import { Modal, modalStyles } from './Modal';

interface LeaveExamModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LeaveExamModal({ onConfirm, onCancel }: LeaveExamModalProps) {
  return (
    <Modal
      icon="🚪"
      title="Leave This Exam?"
      body={
        <>
          Your answers and remaining time will be <strong>lost permanently</strong> if you
          leave now. You will need to start a new attempt from scratch.
        </>
      }
      actions={
        <>
          <button className={modalStyles.btnGhost} onClick={onCancel}>
            Stay on Exam
          </button>
          <button className={modalStyles.btnDanger} onClick={onConfirm}>
            Leave Anyway
          </button>
        </>
      }
    />
  );
}
