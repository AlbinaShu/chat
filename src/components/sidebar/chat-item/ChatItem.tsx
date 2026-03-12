import React from 'react';
import { format, parseISO } from 'date-fns';
import type { IChat } from '../../../interfaces';
import styles from './ChatItem.module.css';
import Button from '../../ui/button/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface IChatItemProps {
    chat: IChat;
    isActive: boolean;
}

const ChatItem: React.FC<IChatItemProps> = ({ chat, isActive }) => {
    const formattedDate = format(parseISO(chat.lastMessageDate), 'dd.MM.yy HH:mm');

    return (
        <div className={`${styles.chatItem} ${isActive ? styles.active : ''}`}>
            <div className={styles.content}>
                <div className={styles.name}>{chat.name}</div>
                <div className={styles.date}>{formattedDate}</div>
            </div>

            <div className={styles.actions}>
                <Button icon={<PencilIcon />} onClick={() => {}} />

                <Button icon={<TrashIcon />}  onClick={() => {}}/>
            </div>
        </div>
    );
};

export default ChatItem;