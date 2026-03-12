import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';
import styles from './Header.module.css';
import Button from '../ui/button/Button';

export interface IHeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<IHeaderProps> = ({ onToggleSidebar }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');

            return;
        };

        document.documentElement.classList.remove('dark');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <header className={styles.header}>
            <Button className={styles.burger} icon={<Bars3Icon />} onClick={onToggleSidebar} />

            <div className={styles.title}>Messenger</div>

            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
            >
                {isDark ? <SunIcon className={styles.icon} /> : <MoonIcon className={styles.icon} />}
            </button>
        </header>
    );
};

export default Header;