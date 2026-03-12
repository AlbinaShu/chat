import React from 'react';
import styles from './ChatWindow.module.css';
import { CHATS_MOCK, MESSAGES_MOCK } from '../../../mocks';
import MessageList from '../message-list/MessageList';
import InputArea from '../input-area/InputArea';

interface IChatWindowProps {
    chatId: string;
}

const ChatWindow: React.FC<IChatWindowProps> = ({ chatId }) => {
    const chat = CHATS_MOCK.find(item => item.id === chatId);
    const messages = MESSAGES_MOCK.filter(message => message.chatId === chatId);

    if (!chat) {
        return (
            <div>Чат не найден</div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{chat.name}</h2>
            </div>

            <MessageList messages={messages} />

            <InputArea />
        </div>
    );
};

export default ChatWindow;