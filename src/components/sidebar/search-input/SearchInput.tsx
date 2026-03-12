import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Введите название чата..."
                className={`${styles.input}`}
            />
        </div>
    );
};

export default SearchInput;