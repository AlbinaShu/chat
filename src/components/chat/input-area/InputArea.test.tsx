import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputArea from './InputArea';

describe('InputArea', () => {
    const defaultProps = {
        isLoading: false,
        onSend: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should send message after input not empty message and click button', async () => {
        const user = userEvent.setup();

        render(<InputArea {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('Введите сообщение...');
        const sendButton = screen.getByRole('button');

        await user.type(textarea, 'Test message');
        await user.click(sendButton);

        expect(defaultProps.onSend).toHaveBeenCalledTimes(1);
        expect(defaultProps.onSend).toHaveBeenCalledWith('Test message');
    });

    it('should send message after input not empty message and press Enter', async () => {
        const user = userEvent.setup();

        render(<InputArea {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('Введите сообщение...');

        await user.type(textarea, 'Test message{Enter}');

        expect(defaultProps.onSend).toHaveBeenCalledTimes(1);
        expect(defaultProps.onSend).toHaveBeenCalledWith('Test message');
    });

    it('send button must be disabled when input value is empty', async () => {
        const user = userEvent.setup();

        render(<InputArea {...defaultProps} />);

        const textarea = screen.getByPlaceholderText('Введите сообщение...');
        const sendButton = screen.getByRole('button');

        expect(sendButton).toHaveProperty('disabled', true);

        await user.type(textarea, 'Test message');
        await user.clear(textarea);

        expect(sendButton).toHaveProperty('disabled', true);
    });
});