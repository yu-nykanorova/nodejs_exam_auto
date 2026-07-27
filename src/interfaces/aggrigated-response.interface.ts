export interface IAggrigatedResponse<T> {
    data: T[];
    totalItems: { count: number }[];
}
