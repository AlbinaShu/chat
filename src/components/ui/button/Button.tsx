import React from 'react';
import styles from './Button.module.css';

interface IButtonProps {
    isDisabled?: boolean;
    text?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = ({
    isDisabled = false, text, icon, iconPosition = 'left', className, onClick,
}) => {
    return (
        <button className={`${styles.button} ${className} ${isDisabled ? styles.disabled : ''}`} 
                disabled={isDisabled}
                onClick={onClick}
        >
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