import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up/seller",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.signUpSeller,
);
router.post(
    "/sign-up/buyer",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.signUpBuyer,
);

router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.login),
    authController.login,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post(
    "/forgot-password",
    commonMiddleware.isBodyValid(UserValidator.sendEmail),
    authController.forgotPasswordSendEmail,
);

router.put(
    "/forgot-password",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
    commonMiddleware.isBodyValid(UserValidator.setNewPassword),
    authController.forgotPasswordChange,
);

router.put(
    "/change-password",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(UserValidator.update),
    authController.changePassword,
);

router.put(
    "/set-password",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.CREATE_PASSWORD),
    commonMiddleware.isBodyValid(UserValidator.setNewPassword),
    authController.setPassword,
);

router.post("/logout", authMiddleware.checkRefreshToken, authController.logout);

export const authRouter = router;
