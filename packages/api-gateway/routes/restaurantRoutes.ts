import { Router } from "express";
import { getRestaurant, getMenu, getFullMenu } from "../controllers/restaurantController";

const router = Router();

router.get("/:restaurantId", getRestaurant);
router.get("/:restaurantId/menus/:menuName/short", getMenu);
router.get("/:restaurantId/menus/:menuName/full", getFullMenu);

export default router;