interface IGetAccessTokenResponse {
    access_token: string;
    expires_at: number;
}

interface IGigaChatMessage {
    role: 'user' | 'system' | 'assistant' | 'function';
    content: string;
}

interface IGigaChatRequestParams {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    repetition_penalty?: number;
}

interface IGigaChatRequestBody extends IGigaChatRequestParams {
    model: string;
    messages: IGigaChatMessage[];
}

interface IGigaChatResponse {
    choices: {
        message: {
            role: string;
            content: string;
        }
    }[];
    created: number;
    model: string;
    object: string;
}


const DEFAULT_GIGA_CHAT_REQUEST_PARAMS: IGigaChatRequestParams = {
    temperature: 1.0,
    top_p: 0.9,
    max_tokens: 2000,
    repetition_penalty: 1.0,
}

let accessToken: string | null = null;
let accessTokenExpiresAt: number = 0;

async function getAccessToken(authKey: string, scope: string): Promise<string> {
    if (accessToken && Date.now() < accessTokenExpiresAt) {
        return accessToken;
    }

    try {
        const response = await fetch('/api/v2/oauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authKey}`,
                'RqUID': crypto.randomUUID()
            },
            body: `scope=${scope}`
        });

        if (!response.ok) {
            throw new Error(`Ошибка при получении access token: ${response.status}`);
        }

        const data: IGetAccessTokenResponse = await response.json();

        accessToken = data.access_token;
        accessTokenExpiresAt = data.expires_at;

        return accessToken;
    } catch (error) {
        console.error('Ошибка при получении access token:', error);

        throw error;
    }
}

export async function getGigaChatResponse(
    authKey: string,
    scope: string,
    messages: IGigaChatMessage[],
    abortSignal: AbortSignal,
    params = DEFAULT_GIGA_CHAT_REQUEST_PARAMS,
): Promise<string> {
    try {
        const accessToken = await getAccessToken(authKey, scope);
        const requestBody: IGigaChatRequestBody = {
            model: 'GigaChat',
            messages: messages,
            ...params,
        };

        const response = await fetch('/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody),
            signal: abortSignal,
        });

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(errorText);
        }

        const data: IGigaChatResponse = await response.json();

        return data.choices[0]?.message.content ?? '';
    } catch (error) {
        console.error('Ошибка при запросе к GigaChat:', error);

        throw error;
    }
}
