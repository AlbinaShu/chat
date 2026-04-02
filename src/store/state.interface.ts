import type { IChat, IMessage } from "../interfaces";

export interface IChatState {
    chats: IChat[];
    activeChatId: string | null;
    messages: Record<string, IMessage[]>;
    isLoading: boolean;
}