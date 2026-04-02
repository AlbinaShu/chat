import type { ChatAction } from "./action.type";
import type { IChatState } from "./state.interface";

export const initialState: IChatState = {
    chats: [],
    activeChatId: null,
    messages: {},
    isLoading: false,
}

export const chatReducer = (state: IChatState, action: ChatAction): IChatState => {
    switch (action.type) {
        case 'CREATE_CHAT':
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                activeChatId: action.payload.id,
                messages: {
                    ...state.messages,
                    [action.payload.id]: []
                }
            };
        case 'UPDATE_CHAT':
            return {
                ...state,
                chats: state.chats.map(chat =>
                    chat.id === action.payload.chatId
                        ? { ...chat, name: action.payload.name }
                        : chat
                ),
            };
        case 'DELETE_CHAT': {
            const updatedChats = state.chats.filter(chat => chat.id !== action.payload.chatId);
            const updatedMessages = { ...state.messages };

            delete updatedMessages[action.payload.chatId];

            return {
                ...state,
                chats: updatedChats,
                messages: updatedMessages,
                activeChatId: state.activeChatId === action.payload.chatId
                    ? null
                    : state.activeChatId
            }
        }
        case 'CREATE_MESSAGE': {
            const updatedChats = state.chats.map(chat => chat.id === action.payload.chatId
                ? { ...chat, lastMessageDate: action.payload.createdAt }
                : chat
            )

            const updatedMessages = {
                ...state.messages,
                [action.payload.chatId]: [...state.messages[action.payload.chatId], action.payload],
            };

            return { ...state, chats: updatedChats, messages: updatedMessages }
        }
        case 'SET_ACTIVE_CHAT_ID':
            return { ...state, activeChatId: action.payload };
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return { ...state };
    }
}