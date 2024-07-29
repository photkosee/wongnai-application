import { useCallback, useEffect, useState } from "react"
import { Restaurant } from "../types/restuarant";
import api from "../api";

const useAllRestaurant = (restaurantIds: number[]) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const responses = await Promise.all(
        restaurantIds.map((id) => api.get(`/restaurants/${id}`))
      );
      setRestaurants(responses.map((response) => response.data));
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch restaurant data");
      setLoading(false);
    }
  }, [restaurantIds]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { restaurants, loading, error };
}

export default useAllRestaurant;
