import { Router } from "express";

const router = Router();

router.get("/", modelController.getAllModels);

router.post("/", modelController.createModel);

router.get("/requests", modelController.getModelRequests);

router.post("/requests", modelController.createModelRequest);

router.patch("/requests/:id", modelController.updateModelRequest);

export const modelRouter = router;