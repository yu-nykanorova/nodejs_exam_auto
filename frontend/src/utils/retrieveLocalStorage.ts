export const retrieveLocalStorage = <T>(key: string): T | null => {
    const object = localStorage.getItem(key);

    if (!object) {
        return null;
    }

    return JSON.parse(object) as T;
};