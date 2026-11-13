import type { FC, LabelHTMLAttributes, ReactNode } from "react";

export interface FormInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}

export const FormInputLabel: FC<FormInputLabelProps> = ({ className = "", children, ...rest }) => {
    return (
        <label
            className={`text-sm font-medium ${className}`}
            {...rest}
        >
            {children}
        </label>
    );
};