import { Router } from "express";

import { advertController } from "../controllers/advert.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { AdvertValidator } from "../validators/advert.validator";

const router = Router();

router.get(
    "/",
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

router.get("/:id", commonMiddleware.isIdValid("id"), advertController.getById);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_ADVERT),
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(AdvertValidator.update),
    advertController.updateAdvert,
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
    advertController.deleteOwnAdvert,
);

export const advertRouter = router;
