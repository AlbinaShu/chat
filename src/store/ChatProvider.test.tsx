import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ChatProvider, useChatContext } from './ChatProvider';
import { useEffect } from 'react';
import { initialState } from './reducer';

const TestComponent = () => {
    const { state, dispatch } = useChatContext();

    useEffect(() => {
        dispatch({ type: 'SET_IS_LOADING', payload: true });
    }, []);

    return (
        <div>{state.chats[0]?.name}</div>
    );
};

describe('ChatProvider', () => {
    let mockStorage: Record<string, string> = {};

    vi.stubGlobal('localStorage', {
        getItem: vi.fn((key: string) => mockStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            mockStorage[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete mockStorage[key];
        }),
        clear: vi.fn(() => {
            mockStorage = {};
        }),
    });

    beforeEach(() => {
        mockStorage = {};
    });

    it('should save data to localStorage after change state', async () => {
        render(
            <ChatProvider>
                <TestComponent />
            </ChatProvider>
        );

        const savedData = mockStorage['chat-state'];
        const parsedData = JSON.parse(savedData);

        expect(parsedData.isLoading).toBe(true);
    });

    it('should init state from local storage', async () => {
        mockStorage['chat-state'] = JSON.stringify({
            ...initialState,
            chats: [{ id: '1', name: 'test chat', lastMessageDate: null }]
        });

        const { container } = render(
            <ChatProvider>
                <TestComponent />
            </ChatProvider>
        );

        expect(container).toHaveTextContent('test chat');
    });

    it('should not crash when local storage has invalid data', async () => {
        mockStorage['chat-state'] = '{"name": "test",}';

        expect(() => render(
            <ChatProvider>
                <TestComponent />
            </ChatProvider>
        )).not.toThrow();
    });
});