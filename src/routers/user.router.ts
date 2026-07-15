import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/me", userController.getMe);
router.get("/me/adverts", userController.getMeAdverts);
router.put("/me", userController.updateMe);
router.patch("/me/account-type", userController.updateMeAccountType);
router.delete("/me", userController.deleteMe);

router.post("/managers", userController.createManager);

router.get("/:id", userController.getById);

router.patch("/:id/status", userController.changeStatus);

router.delete("/:id", userController.deleteById);

export const userRouter = router;
