import React, { useState } from 'react';
import { PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/outline';
import styles from './InputArea.module.css';
import Button from '../../ui/button/Button';

interface IInputAreaProps {
    isLoading: boolean;
    onSend: (value: string) => void,
    onStop: () => void,
}

const InputArea: React.FC<IInputAreaProps> = ({ isLoading, onSend, onStop }) => {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        onSend(value);
        setValue('');
    };

    const handleStop = () => {
        onStop();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
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
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />

                {isLoading
                    ? <Button icon={<StopIcon />}
                        onClick={handleStop} />
                    : <Button icon={<PaperAirplaneIcon />}
                        isDisabled={value.trim().length === 0}
                        onClick={handleSubmit} />
                }
            </div>
        </div>
    );
};

export default InputArea;