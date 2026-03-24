import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import styles from './InputArea.module.css';
import Button from '../../ui/button/Button';

interface IInputAreaProps {
    isDisabled: boolean;
    onSend: (value: string) => void,
}

const InputArea: React.FC<IInputAreaProps> = ({ isDisabled, onSend }) => {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        onSend(value);
        setValue('');
    };

    return (
        <div className={styles.inputArea}>
            <div className={styles.container}>
                <textarea
                    placeholder="Введите сообщение..."
                    rows={3}
                    value={value}
                    className={styles.textarea}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isDisabled}
                />

                <Button icon={<PaperAirplaneIcon />} 
                        isDisabled={value.trim().length === 0 || isDisabled} 
                        onClick={handleSubmit} 
                />
            </div>
        </div>
    );
};

export default InputArea;