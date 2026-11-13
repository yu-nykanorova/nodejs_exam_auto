import type { FC, SelectHTMLAttributes } from "react";

export interface ISelectOptions {
    optionValue: string;
    optionName: string;
}

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    defaultOption: string;
    optionValues: ISelectOptions[];
}

export const FormSelect: FC<FormSelectProps> = ({ defaultOption, optionValues, className = "", ...rest }) => {
    return (
        <select
            className={`h-10 px-3 border border-gray-300 rounded-md bg-white outline-none focus:border-blue-500 ${className}`}
            {...rest}
        >
            <option value="">{defaultOption}</option>
            {
                optionValues.map((value) => (
                    <option key={value.optionValue} value={value.optionValue}>{value.optionName}</option>
                ))
            }
        </select>
    );
};