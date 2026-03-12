import React from 'react';
import styles from './MessageList.module.css';
import type { IMessage } from '../../../interfaces';
import Message from '../message/Message';

interface IMessageListProps {
    messages: IMessage[];
}

const MessagesList: React.FC<IMessageListProps> = ({ messages }) => {
    return (
        <div className={styles.container}>
            {messages.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    )
};

export default MessagesList;