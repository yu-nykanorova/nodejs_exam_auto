export const ALLOWED_FILE_TYPES = ["image/webp", "image/png", "image/jpeg"];

export const ALLOWED_FILE_SIZE = {
    user: 5 * 1024 * 1024,
    advert: 10 * 1024 * 1024,
} as const;

export type FileTarget = keyof typeof ALLOWED_FILE_SIZE;

