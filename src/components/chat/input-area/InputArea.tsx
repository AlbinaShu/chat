import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import styles from './InputArea.module.css';
import Button from '../../ui/button/Button';

const InputArea: React.FC = () => {
    return (
        <div className={styles.inputArea}>
            <div className={styles.container}>
                <textarea
                    placeholder="Введите сообщение..."
                    rows={3}
                    className={styles.textarea}
                />

                <Button icon={<PaperAirplaneIcon />} />
            </div>
        </div>
    );
};

export default InputArea;