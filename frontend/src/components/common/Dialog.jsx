import { useEffect } from 'react';
import styles from './Dialog.module.css';

const Dialog = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = '500px',
    showCloseButton = true
}) => {
    // Previne scroll do body quando o dialog está aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Fecha ao pressionar ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div
                className={styles.dialog}
                style={{ maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className={styles.closeButton}
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
