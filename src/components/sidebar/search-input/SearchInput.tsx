import React from 'react';
import styles from './SearchInput.module.css';

interface ISearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({value, onChange}) => {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                placeholder="Введите название чата..."
                className={`${styles.input}`}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;