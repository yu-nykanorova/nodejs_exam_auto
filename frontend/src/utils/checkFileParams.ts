import { ALLOWED_FILE_SIZE, ALLOWED_FILE_TYPES, type FileTarget } from "../constants/fileParams.ts";

export const checkFileParams = (
    fileType: string,
    fileSize: number,
    fileTarget: FileTarget,
): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        return "Invalid file format. Only jpg, png and webp are allowed.";
    }

    if (fileSize > ALLOWED_FILE_SIZE[fileTarget]) {
        return "File size is too large";
    }

    return null;
};