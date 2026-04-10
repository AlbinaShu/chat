import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Message from './Message';
import type { IMessage } from '../../../interfaces';

describe('Message', () => {
    it('should show user message', () => {
        const userMessage: IMessage = {
            id: '1',
            chatId: '1',
            role: 'user',
            content: 'Test user message',
            createdAt: new Date().toISOString(),
        };

        const { container } = render(<Message message={userMessage} />);

        expect(container).toHaveTextContent('Test user message');
        expect(container.children.item(0)?.className).toContain('userMessage');
    });

    it('should show assistant message', () => {
        const assistantMessage: IMessage = {
            id: '2',
            chatId: '1',
            role: 'assistant',
            content: 'Test assistant message',
            createdAt: new Date().toISOString(),

        };

        const { container } = render(<Message message={assistantMessage} />);

        expect(container).toHaveTextContent('Test assistant message');
        expect(container.children.item(0)?.className).toContain('assistantMessage');
    });

    it('assistant message must have copy button', async () => {
        const userMessage: IMessage = {
            id: '1',
            chatId: '1',
            role: 'user',
            content: 'Test user message',
            createdAt: new Date().toISOString(),
        };

        const assistantMessage: IMessage = {
            id: '2',
            chatId: '1',
            role: 'assistant',
            content: 'Test assistant message',
            createdAt: new Date().toISOString(),

        };

        const { rerender } = render(<Message message={assistantMessage} />);

        let copyButton = await screen.queryByRole('button');
        expect(copyButton).toBeInTheDocument();

        rerender(<Message message={userMessage} />)

        copyButton = await screen.queryByRole('button');
        expect(copyButton).toBeNull();
    });
});