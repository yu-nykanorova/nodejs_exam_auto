import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

export interface FormButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>
{
    children: ReactNode;
}

export const FormButton: FC<FormButtonProps> = ({ className = "", type="button", children, ...rest }) => {
    return (
        <button
            type={type}
            className={`h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};