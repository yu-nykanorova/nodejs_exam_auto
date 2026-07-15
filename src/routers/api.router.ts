import { Router } from "express";

import { advertRouter } from "./advert.router";
import { authRouter } from "./auth.router";
import { brandRouter } from "./brand.router";
import { modelRouter } from "./model.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/adverts", advertRouter);
router.use("/brands", brandRouter);
router.use("/models", modelRouter);

export const apiRouter = router;
