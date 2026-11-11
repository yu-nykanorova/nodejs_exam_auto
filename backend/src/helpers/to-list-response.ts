import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

class ToListResponse {
    public toListResDto<T, R>(
        dataResponse: IPaginatedResponse<T>,
        toPublicResDto: (item: T) => R,
    ) {
        const data = dataResponse.data;

        return {
            totalItems: dataResponse.totalItems,
            totalPages: dataResponse.totalPages,
            prevPage: dataResponse.prevPage,
            nextPage: dataResponse.nextPage,
            data: data.map(toPublicResDto),
        };
    }
}

export const toListResponse = new ToListResponse();
