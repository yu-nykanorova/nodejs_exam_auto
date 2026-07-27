import { Router } from "express";

import { modelController } from "../controllers/model.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { ModelValidator } from "../validators/model.validator";

const router = Router();

router.get("/", modelController.getAllModels);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.CREATE_MODEL),
    commonMiddleware.isBodyValid(ModelValidator.create),
    modelController.createModel,
);

router.get(
    "/requests",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_MODEL_REQUESTS),
    modelController.getModelRequests,
);

router.post(
    "/requests",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.SEND_MODEL_REQUEST),
    commonMiddleware.isBodyValid(ModelValidator.create),
    modelController.createModelRequest,
);

router.get(
    "/requests/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_MODEL_REQUESTS),
    commonMiddleware.isIdValid("id"),
    modelController.getModelRequestById,
);

router.patch(
    "/requests/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(
        PermissionsEnum.UPDATE_MODEL_REQUEST_STATUS,
    ),
    commonMiddleware.isIdValid("id"),
);

export const modelRouter = router;
