import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { FullMenu } from "../types/restuarant";
import api from "../api";

const useMenuDetails = (menuName: string) => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState<FullMenu>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!menuName) {
      return;
    }

    try {
      const response = await api.get(`/restaurants/${restaurantId}/menus/${menuName}/full`)
      setMenu(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch full menu data");
      setLoading(false);
    }
  }, [restaurantId, menuName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { menu, loading, error };
}

export default useMenuDetails;
