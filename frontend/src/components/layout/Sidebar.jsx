import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                >
                    <span className={styles.icon}>👥</span>
                    <span>Funcionários</span>
                </NavLink>

                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                >
                    <span className={styles.icon}>👤</span>
                    <span>Usuários</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
