import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../common/ConfirmDialog';
import styles from './Header.module.css';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = () => {
        console.log('🚪 Fazendo logout...');

        // Toast de despedida
        toast.info('Até logo! 👋');

        // Executa logout após um pequeno delay
        setTimeout(() => {
            logout();
            navigate('/login', { replace: true });
        }, 500);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <h1>People Manager</h1>
                    </div>

                    <div className={styles.userInfo}>
                        {user && (
                            <>
                                <span className={styles.userName}>
                                    Olá, {user.name || user.login}
                                </span>
                                <button
                                    onClick={handleLogoutClick}
                                    className={styles.logoutButton}
                                >
                                    🚪 Sair
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Dialog de Confirmação de Logout */}
            <ConfirmDialog
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogoutConfirm}
                title="Sair do Sistema"
                message="Deseja realmente sair do sistema? Você precisará fazer login novamente para acessar."
                confirmText="Sair"
                cancelText="Cancelar"
                type="warning"
            />
        </>
    );
};

export default Header;
