import type { ISelectOptions } from "../components/ui/FormSelect.tsx";

type BaseArrayItem = {
    _id: string;
    name: string;
}

export const buildOptionsFromObject = (object: Record<string, string>): ISelectOptions[] => {
    return Object.values(object).map((value) => ({
        optionValue: value,
        optionName: value,
    }))
}

export const buildOptionsFromArray = <T extends BaseArrayItem>(array: T[]): ISelectOptions[] => {
    return array.map((item) => ({
        optionValue: item._id,
        optionName: item.name,
    }));
};