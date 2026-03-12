import React from 'react';
import styles from './Button.module.css';

interface IButtonProps {
    text?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
    onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({
    text, icon, iconPosition = 'left', className, onClick, 
}) => {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {icon && iconPosition === 'left' && (
                <span className={styles.icon}>{icon}</span>
            )}

            {text && <span>{text}</span>}

            {icon && iconPosition === 'right' && (
                <span className={styles.icon}>{icon}</span>
            )}
        </button>
    );
};

export default Button;