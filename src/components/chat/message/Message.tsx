import React, { useState } from 'react';
import styles from './Message.module.css';
import type { IMessage } from '../../../interfaces';
import ReactMarkdown from 'react-markdown';
import { ClipboardIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Button from '../../ui/button/Button';

interface IMessageProps {
    message: IMessage;
}

const Message: React.FC<IMessageProps> = ({ message }) => {
    const [isCopied, setIsCopied] = useState(false);
    const isAssistant = message.role === 'assistant';

    const handleMessageCopy = async () => {
        await navigator.clipboard.writeText(message.content);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const userMessage = (
        <div className={`${styles.message} ${styles.userMessage}`}>
            <div className={`${styles.content} ${styles.userContent}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    )

    const assistantMessage = (
        <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.avatar}>
                <SparklesIcon className={styles.icon} />
            </div>

            <div className={`${styles.content} ${styles.assistantContent}`}>
                <div className={styles.contentHeader}>
                    <div className={styles.sender}>Assistant</div>

                    <div className={styles.contentButtons}>
                        {isCopied
                            ? <span>Скопировано</span>
                            : <Button icon={<ClipboardIcon />}
                                className={styles.copyButton}
                                onClick={handleMessageCopy} />
                        }
                    </div>
                </div>

                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    )

    return isAssistant ? assistantMessage : userMessage;
};

export default Message;