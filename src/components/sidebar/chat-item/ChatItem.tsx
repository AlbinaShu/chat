import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import type { IChat } from '../../../interfaces';
import styles from './ChatItem.module.css';
import Button from '../../ui/button/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '../../../store';

interface IChatItemProps {
    chat: IChat;
    isActive: boolean;
}

const ChatItem: React.FC<IChatItemProps> = ({ chat, isActive }) => {
    const { dispatch } = useChatContext();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [chatName, setChatName] = useState(chat.name);

    const formattedDate = chat.lastMessageDate
        ? format(parseISO(chat.lastMessageDate), 'dd.MM.yy HH:mm')
        : '';

    const handleEditChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsEditing(true);
    }

    const handleSelectChat = () => {
        navigate(`chat/${chat.id}`);
    }

    const handleEditChat = () => {
        if (!chatName) {
            setChatName(chat.name);
            setIsEditing(false);

            return;
        }

        dispatch({
            type: 'UPDATE_CHAT',
            payload: {
                chatId: chat.id,
                name: chatName,
            },
        });

        setIsEditing(false);
    }

    const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();

        if (event.key === 'Enter') {
            handleEditChat();
        } else if (event.key === 'Escape') {
            setChatName(chat.name);
            setIsEditing(false);
        }
    }

    const handleDeleteChat = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const confirmed = confirm('Вы действительно хотите удалить чат?');

        if (!confirmed) return;

        dispatch({
            type: 'DELETE_CHAT',
            payload: { chatId: chat.id },
        });

        if (isActive) {
            navigate('/');
        }
    };

    return (
        <div className={`${styles.chatItem} ${isActive ? styles.active : ''}`} onClick={handleSelectChat}>
            <div className={styles.content}>
                {isEditing
                    ? <input
                        value={chatName}
                        autoFocus
                        onChange={e => setChatName(e.target.value.trim())}
                        onBlur={handleEditChat}
                        onKeyDown={handleEditKeyDown}
                    />
                    : <div className={styles.name}>{chat.name}</div>

                }

                <div className={styles.date}>{formattedDate}</div>
            </div>

            <div className={styles.actions}>
                <Button icon={<PencilIcon />} onClick={handleEditChatClick} />

                <Button icon={<TrashIcon />} onClick={handleDeleteChat} />
            </div>
        </div>
    );
};

export default ChatItem;