import axios from "axios";

const BASE_URL = "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api";

export const fetchRestaurant = async (restaurantId: string) => {
  const response = await axios.get(`${BASE_URL}/restaurants/${restaurantId}.json`);
  return response.data;
};

export const fetchMenu = async (restaurantId: string, menuName: string) => {
  const response = await axios.get(`${BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/short.json`);
  return response.data;
};

export const fetchFullMenu = async (restaurantId: string, menuName: string) => {
  const response = await axios.get(`${BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/full.json`);
  return response.data;
};