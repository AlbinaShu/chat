import React from 'react';
import styles from './Message.module.css';
import type { IMessage } from '../../../interfaces';
import ReactMarkdown from 'react-markdown';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface IMessageProps {
    message: IMessage;
}

const Message: React.FC<IMessageProps> = ({ message }) => {
    const isAssistant = message.role === 'assistant';

    const userMessage = (
        <div className={`${styles.message} ${styles.userMessage}`}>
            <div className={`${styles.content} ${styles.userContent}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    )

    const assistantMessage = (
        <div className={styles.message}>
            <div className={styles.avatar}>
                <SparklesIcon className={styles.icon} />
            </div>

            <div className={`${styles.content} ${styles.assistantContent}`}>
                <div className={styles.sender}>Assistant</div>

                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    )

    return isAssistant ? assistantMessage : userMessage;
};

export default Message;