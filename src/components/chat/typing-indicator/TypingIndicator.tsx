import styles from './TypingIndicator.module.css';

interface ITypingIndicatorProps {
    isVisible: boolean;
}

const TypingIndicator: React.FC<ITypingIndicatorProps> = ({ isVisible = true }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </div>
        </div>
    );
};

export default TypingIndicator;