import { Router } from "express";

import { advertController } from "../controllers/advert.controller";

const router = Router();

router.get("/", advertController.getAllAdverts);

router.post("/", advertController.createAdvert);

router.get("/:id", advertController.getById);

router.put("/:id", advertController.updateAdvert);

router.patch("/:id/status", advertController.changeStatus);

router.get("/:id/statistics", advertController.getStatistics);

router.delete("/:id", advertController.deleteById);

export const advertRouter = router;
