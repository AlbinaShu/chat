export function getFromLocalStorage<T>(key: string): T | null {
    try {
        const data = localStorage.getItem(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export function setToLocalStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
}