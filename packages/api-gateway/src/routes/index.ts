import { Router } from "express";
import restaurantRoutes from "./restaurantRoutes";

const router = Router();

router.use("/restaurants", restaurantRoutes);

export default router;