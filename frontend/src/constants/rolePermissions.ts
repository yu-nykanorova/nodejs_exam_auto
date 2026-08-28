import { type Role, roles } from "./roles.ts";
import { type Permission, permissions } from "./permissions.ts";

export const rolePermissions: Record<Role, Permission[]> = {
    [roles.ADMIN]: [
        permissions.READ_PROFILE,
        permissions.UPDATE_PROFILE,
        permissions.CREATE_MANAGER,
        permissions.READ_USERS,
        permissions.DELETE_USER,
        permissions.UPDATE_USER_STATUS,

        permissions.READ_ADVERTS,
        permissions.READ_ADVERT,
        permissions.DELETE_ADVERT,
        permissions.UPDATE_ADVERT_STATUS,
        permissions.READ_ADVERT_STATISTICS,

        permissions.READ_BRANDS,
        permissions.READ_MODELS,
        permissions.CREATE_BRAND,
        permissions.CREATE_MODEL,

        permissions.READ_BRAND_REQUESTS,
        permissions.READ_MODEL_REQUESTS,
        permissions.UPDATE_BRAND_REQUEST_STATUS,
        permissions.UPDATE_MODEL_REQUEST_STATUS,
    ],

    [roles.MANAGER]: [
        permissions.READ_PROFILE,
        permissions.UPDATE_PROFILE,
        permissions.READ_USERS,
        permissions.DELETE_USER,
        permissions.UPDATE_USER_STATUS,

        permissions.READ_ADVERTS,
        permissions.READ_ADVERT,
        permissions.DELETE_ADVERT,
        permissions.UPDATE_ADVERT_STATUS,
        permissions.READ_ADVERT_STATISTICS,

        permissions.READ_BRANDS,
        permissions.READ_MODELS,
        permissions.CREATE_BRAND,
        permissions.CREATE_MODEL,

        permissions.READ_BRAND_REQUESTS,
        permissions.READ_MODEL_REQUESTS,
        permissions.UPDATE_BRAND_REQUEST_STATUS,
        permissions.UPDATE_MODEL_REQUEST_STATUS,
    ],

    [roles.SELLER]: [
        permissions.READ_PROFILE,
        permissions.UPDATE_PROFILE,
        permissions.DELETE_PROFILE,

        permissions.READ_ADVERTS,
        permissions.READ_ADVERT,
        permissions.READ_OWN_ADVERTS,
        permissions.CREATE_ADVERT,
        permissions.UPDATE_ADVERT,
        permissions.DELETE_ADVERT,
        permissions.READ_ADVERT_STATISTICS,

        permissions.READ_BRANDS,
        permissions.READ_MODELS,
        permissions.SEND_BRAND_REQUEST,
        permissions.SEND_MODEL_REQUEST,
        permissions.MANAGE_ACCOUNT_TYPE,
    ],

    [roles.BUYER]: [
        permissions.READ_PROFILE,
        permissions.UPDATE_PROFILE,
        permissions.DELETE_PROFILE,

        permissions.READ_ADVERTS,
        permissions.READ_ADVERT,

        permissions.READ_BRANDS,
        permissions.READ_MODELS,
    ],
};