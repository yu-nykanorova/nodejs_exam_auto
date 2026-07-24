import { Router } from "express";

import { brandController } from "../controllers/brand.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { BrandValidator } from "../validators/brand.validator";

const router = Router();

router.get("/", brandController.getAllBrands);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.CREATE_BRAND),
    commonMiddleware.isBodyValid(BrandValidator.create),
    brandController.createBrand,
);

router.get(
    "/requests",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.READ_BRAND_REQUESTS),
    brandController.getBrandRequests,
);

router.post(
    "/requests",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(PermissionsEnum.SEND_BRAND_REQUEST),
    commonMiddleware.isBodyValid(BrandValidator.create),
    brandController.createBrandRequest,
);

router.patch(
    "/requests/:id",
    authMiddleware.checkAccessToken,
    permissionsMiddleware.checkPermission(
        PermissionsEnum.UPDATE_BRAND_REQUEST_STATUS,
    ),
    commonMiddleware.isIdValid("id"),
    brandController.updateBrandRequest,
);

export const brandRouter = router;
