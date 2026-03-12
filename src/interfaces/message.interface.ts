export interface IMessage {
    id: string;
    chatId: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
}