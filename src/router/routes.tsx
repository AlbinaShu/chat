import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import ChatWindow from '../components/chat/chat-window/ChatWindow';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'chat/:id',
                element: <ChatWindow />,
            },
            {
                path: '*',
                element: <Navigate to="/" />,
            },
        ],
    },
]);