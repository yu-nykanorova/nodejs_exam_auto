import joi from "joi";

export const queryValidator = (
    queryOrderEnum: object,
    additionalFields?: Record<string, joi.Schema>,
) => {
    return joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        order: joi
            .string()
            .valid(
                ...Object.values(queryOrderEnum),
                ...Object.values(queryOrderEnum).map((item) => `-${item}`),
            ),
        ...additionalFields,
    });
};
