import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import ChatItem from './ChatItem';
import { useChatContext } from '../../../store';
import type { IChat } from '../../../interfaces';

vi.mock('../../../store', () => ({
    useChatContext: vi.fn(),
}));

describe('ChatItem', () => {
    const mockChat: IChat = {
        id: '1',
        name: 'Mock chat',
        lastMessageDate: null,
    };

    beforeEach(() => {
        vi.clearAllMocks();

        (useChatContext as any).mockReturnValue({
            dispatch: vi.fn(),
        });
    });

    const renderWithRouter = (component: React.ReactNode) => {
        return render(<BrowserRouter>{component}</BrowserRouter>);
    };

    it('should show confirm modal after click delete button', async () => {
        const user = userEvent.setup();
        const confirmSpy = vi.spyOn(window, 'confirm');
        
        renderWithRouter(<ChatItem chat={mockChat} isActive={false} />);
        
        const deleteButton = screen.getAllByRole('button')[1];
        
        await user.click(deleteButton);
        
        expect(confirmSpy).toHaveBeenCalledWith('Вы действительно хотите удалить чат?');
    });
});