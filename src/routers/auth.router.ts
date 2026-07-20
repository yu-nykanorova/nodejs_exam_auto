import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", authController.signUp);

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);

router.post("/forgot-password", authController.forgotPasswordSendEmail);

router.put("/forgot-password", authController.forgotPasswordChange);

router.put("/change-password", authController.changePassword);

router.put("/set-password", authController.setPassword);

router.post("/logout", authController.logout);

export const authRouter = router;
