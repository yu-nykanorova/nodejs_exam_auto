import { Router } from "express";

import { fileConstants } from "../constants/file.constants";
import { advertController } from "../controllers/advert.controller";
import { FileTypeEnum } from "../enums/file-type.enum";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { AdvertValidator } from "../validators/advert.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.identifyUser,
    commonMiddleware.isQueryValid(AdvertValidator.query),
    advertController.getAllAdverts,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.CREATE_ADVERT),
    commonMiddleware.isBodyValid(AdvertValidator.create),
    advertController.createAdvert,
);

router.get(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.identifyUser,
    advertController.getById,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_ADVERT),
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(AdvertValidator.update),
    advertController.updateAdvert,
);

router.post(
    "/:id/photo",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_ADVERT),
    commonMiddleware.isFileValid(fileConstants[FileTypeEnum.PHOTO]),
    advertController.uploadPhoto,
);

router.delete(
    "/:id/photo",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_ADVERT),
    advertController.deletePhoto,
);

router.patch(
    "/:id/status",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_ADVERT_STATUS),
    commonMiddleware.isIdValid("id"),
    advertController.changeStatus,
);

router.get(
    "/:id/statistics",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(
        PermissionsEnum.READ_ADVERT_STATISTICS,
    ),
    commonMiddleware.isIdValid("id"),
    advertController.getStatistics,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.DELETE_ADVERT),
    commonMiddleware.isIdValid("id"),
    advertController.deleteAdvert,
);

export const advertRouter = router;
