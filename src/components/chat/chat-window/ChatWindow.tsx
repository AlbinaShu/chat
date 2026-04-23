import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ChatWindow.module.css';
import MessageList from '../message-list/MessageList';
import InputArea from '../input-area/InputArea';
import type { IMessage } from '../../../interfaces';
import TypingIndicator from '../typing-indicator/TypingIndicator';
import { useChatContext } from '../../../store';
import { getGigaChatResponse } from '../../../api/gigachat';

const ChatWindow: React.FC = () => {
    const { id } = useParams();
    const { state, dispatch } = useChatContext();
    const [abortController, setAbortController] = useState<AbortController | null>(null);

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

    const handleSend = async (content: string) => {
        const newMessage: IMessage = {
            chatId: state.activeChatId as string,
            content,
            id: `${Date.now()}`,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        dispatch({ type: 'CREATE_MESSAGE', payload: newMessage });
        dispatch({ type: 'SET_IS_LOADING', payload: true });

        if (messages.length === 0) {
            generateChatNameByFirstMessage(newMessage.content);
        }

        try {
            const allMessages = [...messages, newMessage];

            const controller = new AbortController();
            setAbortController(controller);

            const assistantResponse = await getGigaChatResponse(
                import.meta.env.VITE_GIGA_CHAT_AUTH_KEY,
                import.meta.env.VITE_GIGA_CHAT_SCOPE,
                allMessages,
                controller.signal,
            );

            const assistantMessage: IMessage = {
                chatId: state.activeChatId as string,
                id: `${Date.now()}`,
                content: assistantResponse,
                role: 'assistant',
                createdAt: new Date().toISOString()
            };

            dispatch({ type: 'CREATE_MESSAGE', payload: assistantMessage });
        } catch (err) {
            console.error('Ошибка при запросе к GigaChat:', err);

            if ((err as Error).name === 'AbortError') {
                return;
            }

            const errorMessage: IMessage = {
                chatId: state.activeChatId as string,
                id: `${Date.now()}`,
                content: `Ошибка при запросе к GigaChat: ${err}. Попробуйте еще раз`,
                role: 'assistant',
                createdAt: new Date().toISOString()
            };

            dispatch({ type: 'CREATE_MESSAGE', payload: errorMessage });
        } finally {
            dispatch({ type: 'SET_IS_LOADING', payload: false });
            setAbortController(null);
        }
    };

    const handleStop = () => {
        if (!abortController) {
            return;
        }

        abortController.abort();
        setAbortController(null);
        dispatch({ type: 'SET_IS_LOADING', payload: false });
    };

    const generateChatNameByFirstMessage = (firstMessage: string) => {
        const chatNameMaxLength = 30;
        const messageMinLength = 10;

        let newChatName: string | null = null;

        if (firstMessage.length < messageMinLength) {
            return;
        } else if (firstMessage.length > chatNameMaxLength) {
            newChatName = firstMessage[0].toUpperCase() + firstMessage.slice(1, chatNameMaxLength) + '...';
        } else {
            newChatName = firstMessage[0].toUpperCase() + firstMessage.slice(1, chatNameMaxLength);
        }


        if (newChatName) {
            dispatch({ type: 'UPDATE_CHAT', payload: { chatId: chat?.id as string, name: newChatName } })
        }
    }

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

            <InputArea
                isLoading={state.isLoading}
                onSend={handleSend}
                onStop={handleStop}
            />
        </div>
    );
};

export default ChatWindow;