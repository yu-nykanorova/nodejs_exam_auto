import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_USERS),
    userController.getAllUsers,
);

router.get(
    "/me",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_PROFILE),
    userController.getMe,
);
router.get(
    "/me/adverts",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_OWN_ADVERTS),
    userController.getMeAdverts,
);
router.put(
    "/me",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_PROFILE),
    userController.updateMe,
);
router.patch(
    "/me/account-type",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.MANAGE_ACCOUNT_TYPE),
    userController.updateMeAccountType,
);
router.delete(
    "/me",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.DELETE_PROFILE),
    userController.deleteMe,
);

router.post(
    "/managers",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.CREATE_MANAGER),
    userController.createManager,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_USERS),
    userController.getById,
);
router.patch(
    "/:id/status",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.UPDATE_USER_STATUS),
    userController.changeStatus,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.DELETE_USER),
    userController.deleteById,
);

export const userRouter = router;
