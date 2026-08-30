export const saveToLocalStorage = <T>(
    key: string,
    value: T,
) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
    const object = localStorage.getItem(key);

    if (!object) {
        return null;
    }

    return JSON.parse(object) as T;
};

export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};