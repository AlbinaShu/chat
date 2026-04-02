import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar/Sidebar';
import Header from '../header/Header';
import styles from './AppLayout.module.css';

const AppLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className={styles.app}>
            <Header onToggleSidebar={toggleSidebar} />

            <div className={styles.container}>
                <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                    <Sidebar />
                </div>

                {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar} />}

                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;