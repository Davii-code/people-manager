import Dialog from './Dialog';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirmar ação',
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'danger' // 'danger', 'warning', 'info'
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return '🗑️';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '❓';
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            maxWidth="450px"
            showCloseButton={false}
        >
            <div className={styles.content}>
                <div className={`${styles.iconContainer} ${styles[type]}`}>
                    <span className={styles.icon}>{getIcon()}</span>
                </div>
                <p className={styles.message}>{message}</p>
                <div className={styles.actions}>
                    <button
                        onClick={onClose}
                        className={styles.cancelButton}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`${styles.confirmButton} ${styles[type]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default ConfirmDialog;
