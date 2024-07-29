import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Restaurant } from "../types/restuarant";
import api from "../api";

const useRestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`)
      setRestaurant(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch restaurant data");
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { restaurant, loading, error };
}

export default useRestaurantDetails;
