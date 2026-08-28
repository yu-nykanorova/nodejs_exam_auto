import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use((requestObject) => {
    const accessToken = localStorage.getItem('accessToken');

    if(accessToken) {
        requestObject.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestObject;
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken =
                    localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw error;
                }

                const { data } = await axiosInstance.post(
                    '/auth/refresh',
                    { refreshToken },
                );

                localStorage.setItem(
                    'accessToken',
                    data.accessToken,
                );

                localStorage.setItem(
                    'refreshToken',
                    data.refreshToken,
                );

                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export const getItems = async <T, >(
    url: string,
    params?: unknown,
): Promise<T> => {
    const {data} = await axiosInstance.get<T>(url, {params});
    return data;
};

export const postItem = async <T, D>(
    url: string,
    body: D,
): Promise<T> => {
    const { data } = await axiosInstance.post<T>(url, body);

    return data;
};

export const putItem = async <T, D>(
    url: string,
    body: D,
): Promise<T> => {
    const { data } = await axiosInstance.put<T>(url, body);

    return data;
};

export const patchItem = async <T, D>(
    url: string,
    body: D,
): Promise<T> => {
    const { data } = await axiosInstance.patch<T>(url, body);

    return data;
};

export const deleteItem = async <T>(
    url: string,
): Promise<T> => {
    const { data } = await axiosInstance.delete<T>(url);

    return data;
};