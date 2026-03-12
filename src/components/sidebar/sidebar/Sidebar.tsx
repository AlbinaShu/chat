import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import ChatList from '../chat-list/ChatList';
import SearchInput from '../search-input/SearchInput';
import type { IChat } from '../../../interfaces';
import styles from './Sidebar.module.css';
import Button from '../../ui/button/Button';

interface ISidebarProps {
    chats: IChat[];
    activeChatId: string;
}

const Sidebar: React.FC<ISidebarProps> = ({
    chats,
    activeChatId,
}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.search}>
                    <SearchInput />
                </div>

                <Button icon={<PlusIcon />} />
            </div>

            <ChatList
                chats={chats}
                activeChatId={activeChatId}
            />
        </div>
    );
};

export default Sidebar;