import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ChatWindow.module.css';
import MessageList from '../message-list/MessageList';
import InputArea from '../input-area/InputArea';
import type { IMessage } from '../../../interfaces';
import TypingIndicator from '../typing-indicator/TypingIndicator';
import { useChatContext } from '../../../store';

const ChatWindow: React.FC = () => {
    const { id } = useParams();
    const { state, dispatch } = useChatContext();

    const chat = state.chats.find(chat => chat.id === id);
    const messages = state.messages[id as string];

    useEffect(() => {
        if (id) {
            dispatch({
                type: 'SET_ACTIVE_CHAT_ID',
                payload: id,
            });
        }
    }, [id]);

    const handleSend = (content: string) => {
        const newMessage: IMessage = {
            chatId: state.activeChatId as string,
            content,
            id: `${Date.now()}`,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        dispatch({ type: 'CREATE_MESSAGE', payload: newMessage });
        dispatch({ type: 'SET_IS_LOADING', payload: true });

        setTimeout(() => {
            const assistantMessage: IMessage = {
                chatId: state.activeChatId as string,
                id: `${Date.now()}`,
                content: 'Сообщение ассистента',
                role: 'assistant',
                createdAt: new Date().toISOString()
            };

            dispatch({ type: 'CREATE_MESSAGE', payload: assistantMessage });
            dispatch({ type: 'SET_IS_LOADING', payload: false });
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

            {state.isLoading && <TypingIndicator isVisible={state.isLoading} />}

            <InputArea isLoading={state.isLoading} onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;