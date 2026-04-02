import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { IChatState } from './state.interface';
import type { ChatAction } from './action.type';
import { chatReducer, initialState } from './reducer';
import { getFromLocalStorage, setToLocalStorage } from '../utils';

const LOCAL_STORAGE_KEY = 'chat-state';

export const ChatContext = createContext<{
    state: IChatState;
    dispatch: React.Dispatch<ChatAction>;
} | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const init = () => {
        return getFromLocalStorage<IChatState>(LOCAL_STORAGE_KEY) ?? initialState;
    }
    const [state, dispatch] = useReducer(chatReducer, initialState, init);

    useEffect(() => {
        setToLocalStorage(LOCAL_STORAGE_KEY, state);
    }, [state]);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error('incorrect using chat context: it must be inside ChatProvider');
    }

    return context;
};