import React, { useState } from 'react';
import { CHATS_MOCK } from '../../mocks';
import Sidebar from '../sidebar/sidebar/Sidebar';
import Header from '../header/Header';
import styles from './AppLayout.module.css';
import ChatWindow from '../chat/chat-window/ChatWindow';

const AppLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chats, setChats] = useState(CHATS_MOCK);
    const [activeChatId, setActiveChatId] = useState(chats[0].id);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className={styles.app}>
            <Header onToggleSidebar={toggleSidebar} />

            <div className={styles.container}>
                <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                    <Sidebar
                        chats={chats}
                        activeChatId={activeChatId}
                    />
                </div>

                {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar} />}

                <div className={styles.main}>
                    <ChatWindow chatId={activeChatId} />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;