import type { IChat, IMessage } from "../interfaces";

export type ChatAction =
    { type: 'CREATE_CHAT', payload: IChat } |
    { type: 'UPDATE_CHAT', payload: { chatId: string, name: string } } |
    { type: 'DELETE_CHAT', payload: { chatId: string } } |
    { type: 'CREATE_MESSAGE', payload: IMessage } |
    { type: 'SET_ACTIVE_CHAT_ID', payload: string } |
    { type: 'SET_IS_LOADING', payload: boolean }