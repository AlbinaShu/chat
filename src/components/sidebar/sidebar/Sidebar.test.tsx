import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useChatContext } from '../../../store';
import type { IChatState } from '../../../store/state.interface';

vi.mock('../../../store', () => ({
    useChatContext: vi.fn(),
}));

describe('Sidebar', () => {
    const mockState: IChatState = {
        chats: [
            {id: '1', name: 'chat 1', lastMessageDate: null},
            {id: '2', name: 'chat 2', lastMessageDate: null},
        ],
        messages: {
            '1': [],
            '2': [],
        },
        activeChatId: '2',
        isLoading: false,
    }

    beforeEach(() => {
        (useChatContext as any).mockReturnValue({
            state: mockState,
            dispatch: vi.fn(),
        });
    });

    const renderWithRouter = (component: React.ReactNode) => {
        return render(<BrowserRouter>{component}</BrowserRouter>);
    };

    it('should filter chats list by search name', async () => {
        const user = userEvent.setup();

        renderWithRouter(<Sidebar />);

        const searchInput = screen.getByPlaceholderText('Введите название чата...');

        await user.type(searchInput, 'chat 2');

        expect(screen.queryByText('chat 1')).not.toBeInTheDocument();
        expect(screen.getByText('chat 2')).toBeInTheDocument();
    
        await user.clear(searchInput);
        await user.type(searchInput, 'chat 1');

        expect(screen.getByText('chat 1')).toBeInTheDocument();
        expect(screen.queryByText('chat 2')).not.toBeInTheDocument();
    });

    it('should show all chat when search value is empty', async () => {
        const user = userEvent.setup();

        renderWithRouter(<Sidebar />);

        const searchInput = screen.getByPlaceholderText('Введите название чата...');

        await user.type(searchInput, 'chat 2');
        await user.clear(searchInput);

        expect(screen.getByText('chat 1')).toBeInTheDocument();
        expect(screen.getByText('chat 2')).toBeInTheDocument();
    });
});