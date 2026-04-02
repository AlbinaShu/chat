import React from 'react';
import type { IChat } from '../../../interfaces';
import ChatItem from '../chat-item/ChatItem';
import styles from './ChatList.module.css';

interface IChatListProps {
    chats: IChat[];
    activeChatId: string | null;
}

const ChatList: React.FC<IChatListProps> = ({
    chats,
    activeChatId,
}) => {
    return (
        <div className={styles.chatList}>
            {chats.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                />
            ))}
        </div>
    );
};

export default ChatList;