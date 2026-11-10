import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type JSX, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from './modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ title, onClose, children }: TModalProps): JSX.Element => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const modalRoot = document.getElementById('modals');
  if (!modalRoot) return <></>;

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h2 className={`text text_type_main-large ${styles.title}`}>{title}</h2>}
          <button className={styles.close_button} onClick={onClose} type="button">
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
