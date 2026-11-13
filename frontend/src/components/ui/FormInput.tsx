import type { FC, InputHTMLAttributes } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const FormInput: FC<FormInputProps> = ({ className = "", type = "text", error = false, ...rest }) => {
    return (
        <input
            className={`h-10 px-3 rounded-md outline-none focus:border-blue-500 ${error ? "border border-red-500" : "border border-gray-300"} ${className}`}
            type={type}
            {...rest}
        />
    );
};