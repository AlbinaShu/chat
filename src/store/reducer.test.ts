import { describe, it, expect } from 'vitest';
import { chatReducer, initialState } from './reducer';
import type { IChat, IMessage } from '../interfaces';
import type { ChatAction } from './action.type';
import type { IChatState } from './state.interface';

const mockChat: IChat = {
    id: '1',
    name: 'Mock Chat',
    lastMessageDate: new Date().toISOString(),
};

const mockMessage: IMessage = {
    id: '1',
    chatId: '1',
    content: 'Mock Message',
    createdAt: new Date().toISOString(),
    role: 'user',
};

describe('chatReducer', () => {
    describe('CREATE_CHAT', () => {
        it('should create a new chat', () => {
            const action: ChatAction  = {
                type: 'CREATE_CHAT',
                payload: mockChat,
            };

            const newState = chatReducer(initialState, action);

            expect(newState.chats[0]).toEqual(mockChat);
            expect(newState.activeChatId).toBe(mockChat.id);
            expect(newState.messages[mockChat.id]).toEqual([]);
        });
    });

    describe('UPDATE_CHAT', () => {
        it('should update chat name by id', () => {
            const state: IChatState = {
                ...initialState,
                chats: [mockChat],
                activeChatId: mockChat.id,
                messages: {
                    [mockChat.id]: [],
                },
            };

            const action: ChatAction = {
                type: 'UPDATE_CHAT',
                payload: { chatId: '1', name: 'Mock Chat Updated' },
            };

            const newState = chatReducer(state, action);

            expect(newState.chats[0].name).toBe('Mock Chat Updated');
        });
    });

    describe('DELETE_CHAT', () => {
        it('should delete chat', () => {
            const state: IChatState = {
                ...initialState,
                chats: [mockChat],
                activeChatId: mockChat.id,
                messages: {
                    [mockChat.id]: [],
                },
            };

            const action: ChatAction = {
                type: 'DELETE_CHAT',
                payload: { chatId: '1' },
            };

            const newState = chatReducer(state, action);

            expect(newState.chats).toHaveLength(0);
            expect(newState.messages).not.toHaveProperty('1');
            expect(newState.activeChatId).toBeNull();
        });
    });

    describe('CREATE_MESSAGE', () => {
        it('should create message', () => {
            const state: IChatState = {
                ...initialState,
                chats: [mockChat],
                activeChatId: mockChat.id,
                messages: {
                    [mockChat.id]: [],
                },
            };

            const action: ChatAction = {
                type: 'CREATE_MESSAGE',
                payload: mockMessage,
            };

            const newState = chatReducer(state, action);

            expect(newState.messages[mockMessage.chatId][0]).toEqual(mockMessage);
            expect(newState.chats[0].lastMessageDate).toEqual(mockMessage.createdAt);
        });
    });

    describe('SET_ACTIVE_CHAT_ID', () => {
        it('should set active chat id', () => {
            const action: ChatAction = {
                type: 'SET_ACTIVE_CHAT_ID',
                payload: '1',
            };

            const newState = chatReducer(initialState, action);

            expect(newState.activeChatId).toBe('1');
        });
    });

    describe('SET_IS_LOADING', () => {
        it('should set loading', () => {
            const action: ChatAction = {
                type: 'SET_IS_LOADING',
                payload: true,
            };

            const newState = chatReducer(initialState, action);

            expect(newState.isLoading).toBe(true);
        });
    });
});
