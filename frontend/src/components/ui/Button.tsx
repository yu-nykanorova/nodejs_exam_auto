import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>
{
    children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ className = "", type="button", children, ...rest }) => {
    return (
        <button
            type={type}
            className={`h-8 rounded-md cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};