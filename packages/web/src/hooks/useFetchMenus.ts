import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ShortMenu } from "../types/restuarant";
import api from "../api";

const useAllShortMenus = (initialLoadCount = 10) => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState<ShortMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countMenus, setCountMenus] = useState(Infinity);
  const [loadCount, setLoadCount] = useState(initialLoadCount);
  const [hasFetchedAll, setHasFetchedAll] = useState(false);

  const fetchData = useCallback(async (loadCount: number) => {
    try {
      setLoading(true);
      const restaurantResponse = await api.get(`/restaurants/${restaurantId}`);
      setCountMenus(restaurantResponse.data.menus.length);

      try {
        const menusToLoad = restaurantResponse.data.menus.slice(0, loadCount);
        const menuResponse = await Promise.all(
          menusToLoad.map((name: string) =>
            api.get(`/restaurants/${restaurantId}/menus/${name}/short`)
          )
        );
        setMenus(menuResponse.map((response) => response.data));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch short menu data");
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch restaurant data");
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchData(loadCount);
  }, [fetchData, loadCount]);

  const loadMoreMenus = () => {
    if (loadCount + initialLoadCount >= countMenus) {
      setHasFetchedAll(true);
    }
    setLoadCount((prevCount) => prevCount + initialLoadCount);
  };

  return { menus, loading, error, loadMoreMenus, hasFetchedAll };
}

export default useAllShortMenus;
