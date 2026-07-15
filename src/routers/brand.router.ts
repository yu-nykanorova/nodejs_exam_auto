import { Router } from "express";

const router = Router();

router.get("/", brandController.getAllBrands);

router.post("/", brandController.createBrand);

router.get("/requests", brandController.getBrandRequests);

router.post("/requests", brandController.createBrandRequest);

router.patch("/requests/:id", brandController.updateBrandRequest);

export const brandRouter = router;
