import type { FC, FormHTMLAttributes, ReactNode } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
}

export const Form: FC<FormProps> = ({ className = "", children, ...rest }) => {
    return (
        <form className={`flex flex-col bg-white ${className}`} {...rest}>
            {children}
        </form>
    );
};