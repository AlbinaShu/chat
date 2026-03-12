import type { IMessage } from "../interfaces";

export const MESSAGES_MOCK: IMessage[] = [
    { id: '1', chatId: '1', content: '*user message 1 with markdown*', role: 'user', createdAt: new Date().toISOString() },
    { id: '2', chatId: '1', content: '**assistant message 1 with markdown**', role: 'assistant', createdAt: new Date().toISOString() },
    { id: '3', chatId: '1', content: 'user message 2', role: 'user', createdAt: new Date().toISOString() },
    { id: '4', chatId: '1', content: 'assistant message 2', role: 'assistant', createdAt: new Date().toISOString() },
    { id: '5', chatId: '1', content: 'user message 3', role: 'user', createdAt: new Date().toISOString() },
    { id: '6', chatId: '1', content: 'assistant message 3', role: 'assistant', createdAt: new Date().toISOString() },
];
