import React, { useState } from 'react';
import styles from './ChatWindow.module.css';
import { CHATS_MOCK } from '../../../mocks';
import MessageList from '../message-list/MessageList';
import InputArea from '../input-area/InputArea';
import type { IMessage } from '../../../interfaces';
import TypingIndicator from '../typing-indicator/TypingIndicator';

interface IChatWindowProps {
    chatId: string;
}

const ChatWindow: React.FC<IChatWindowProps> = ({ chatId }) => {
    const chat = CHATS_MOCK.find(item => item.id === chatId);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = (content: string) => {
        const newMessage: IMessage = {
            chatId,
            content,
            id: `${Date.now()}`,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        setTimeout(() => {
            const assistantMessage: IMessage = {
                chatId,
                id: `${Date.now()}`,
                content: 'Сообщение ассистента',
                role: 'assistant',
                createdAt: new Date().toISOString()
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 2000);
    };

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

            {isLoading && <TypingIndicator isVisible={isLoading} />}

            <InputArea isDisabled={isLoading} onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;