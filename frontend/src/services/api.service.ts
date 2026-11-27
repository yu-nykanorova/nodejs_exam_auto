import axios, { type InternalAxiosRequestConfig } from "axios";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../utils/localStorage.ts";
import type { IAuthResponse } from "../interfaces/IAuth.ts";

type RetryRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

const publicEndpoints = [
    "/auth/login",
    "/auth/refresh",
    "/auth/forgot-password",
    "/auth/set-password",
    "/auth/logout",
]

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((requestObject) => {
    if (publicEndpoints.includes(requestObject.url ?? "")) {
        return requestObject;
    }

    const accessToken = getFromLocalStorage<IAuthResponse>("tokens")?.accessToken;

    if(accessToken) {
        requestObject.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestObject;
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config as RetryRequestConfig;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !publicEndpoints.includes(originalRequest.url ?? "")
        ) {
            originalRequest._retry = true;

            try {
                const tokens =
                    getFromLocalStorage<IAuthResponse>(
                        "tokens",
                    );

                if (!tokens) {
                    throw new Error("Tokens not found");
                }

                const { data } =
                    await axiosInstance.post<IAuthResponse>(
                        "/auth/refresh",
                        {
                            refreshToken:
                            tokens.refreshToken,
                        },
                    );

                saveToLocalStorage(
                    "tokens",
                    data,
                );

                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                removeFromLocalStorage("tokens");

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

export const postItem = async <T, D = undefined>(
    url: string,
    body?: D,
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

export const deleteItem = async (
    url: string,
): Promise<void> => {
    await axiosInstance.delete(url);
};