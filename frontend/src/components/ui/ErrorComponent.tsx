import type { FC } from "react";

type ErrorComponentProps = {
    message: string;
    className?: string;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({ message, className = "" }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={`p-10 text-red-500 text-center ${className}`}>{message}</div>
    );
};