import React, { useEffect, useRef } from 'react';
import styles from './MessageList.module.css';
import type { IMessage } from '../../../interfaces';
import Message from '../message/Message';

interface IMessageListProps {
    messages: IMessage[];
}

const MessagesList: React.FC<IMessageListProps> = React.memo(({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.container}>
            {messages.map(message => (
                <Message key={message.id} message={message} />
            ))}

            <div ref={bottomRef}></div>
        </div>
    )
});

export default MessagesList;