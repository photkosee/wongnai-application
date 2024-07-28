import { Request, Response } from "express";
import { fetchRestaurant, fetchMenu, fetchFullMenu } from "../services/restaurantService";

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const data = await fetchRestaurant(restaurantId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const data = await fetchMenu(restaurantId, menuName);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
};

export const getFullMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const data = await fetchFullMenu(restaurantId, menuName);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch full menu data" });
  }
};