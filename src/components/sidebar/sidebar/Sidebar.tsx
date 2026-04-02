import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import ChatList from '../chat-list/ChatList';
import SearchInput from '../search-input/SearchInput';
import styles from './Sidebar.module.css';
import Button from '../../ui/button/Button';
import { useChatContext } from '../../../store';
import type { IChat } from '../../../interfaces';

const Sidebar: React.FC = () => {
    const { state, dispatch } = useChatContext();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredChats = useMemo(() => {
        const trimmedSearch = search.toLowerCase().trim();

        if (!trimmedSearch) {
            return state.chats;
        }

        return state.chats.filter(chat => {
            const chatName = chat.name.toLowerCase();
            const messages = state.messages[chat.id];
            const lastMessage =
                messages.length > 0
                    ? messages[messages.length - 1].content.toLowerCase()
                    : '';

            return chatName.includes(trimmedSearch) || lastMessage.includes(trimmedSearch);
        });
    }, [search, state.chats, state.messages]);

    const handleCreateChat = () => {
        const newChat: IChat = {
            id: Date.now().toString(),
            name: `Новый чат ${state.chats.length + 1}`,
            lastMessageDate: null,
        };

        dispatch({ type: 'CREATE_CHAT', payload: newChat });
        navigate(`/chat/${newChat.id}`);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.search}>
                    <SearchInput value={search} onChange={setSearch} />
                </div>

                <Button icon={<PlusIcon />} onClick={handleCreateChat} />
            </div>

            <ChatList
                chats={filteredChats}
                activeChatId={state.activeChatId}
            />
        </div>
    );
};

export default Sidebar;