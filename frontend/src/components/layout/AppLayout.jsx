import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

const AppLayout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.mainContainer}>
                <Sidebar />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
