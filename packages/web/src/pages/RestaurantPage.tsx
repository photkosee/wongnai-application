import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { IoIosArrowBack } from "react-icons/io";

import useAllShortMenuDetails from "../hooks/useFetchMenus";
import useRestaurantDetails from "../hooks/useRestaurantDetails";

import Spinner from "../components/animations/Spinner";
import MenuCard from "../components/cards/MenuCard";
import isWithinTimePeriod from "../utils/isWithinTimePeriod";

const RestaurantPage = () => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const { menus, loading, error, loadMoreMenus, hasFetchedAll } =
    useAllShortMenuDetails();
  const {
    restaurant,
    loading: restaurantLoading,
    error: restaurantError,
  } = useRestaurantDetails();

  useEffect(() => {
    if (inView && !hasFetchedAll) {
      setIsLoading(true);
      const delay = 500;

      const timeout = setTimeout(() => {
        loadMoreMenus();
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [inView, menus, loading]);

  const isOpen = () => {
    if (restaurant) {
      return isWithinTimePeriod(
        restaurant?.activeTimePeriod.open,
        restaurant?.activeTimePeriod.close
      );
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-y-5 items-center">
      <Link
        to="/"
        className="left-7 top-7 xl:left-14 xl:top-14 bg-blue-500 p-1 fixed z-10
        text-white rounded-full hover:bg-blue-400 flex items-center justify-center"
      >
        <IoIosArrowBack className="w-7 h-7" />
      </Link>

      <img
        src={restaurant?.coverImage}
        alt="restaurant logo"
        className="max-h-[50vh] w-full object-cover object-center"
      />

      <div className="pb-12 max-w-xl w-full flex flex-col justify-center items-center">
        {restaurant && (
          <div className="w-full flex flex-col gap-y-10 p-3">
            <div className="flex gap-x-5 items-center flex-wrap gap-y-3">
              <h1 className="font-extrabold text-4xl">{restaurant?.name}</h1>
              {isOpen() ? (
                <div
                  className="w-24 h-8 bg-green-500 text-white rounded-lg
                flex items-center justify-center"
                >
                  เปิด
                </div>
              ) : (
                <div
                  className="w-24 h-8 bg-red-500 text-white rounded-lg
                flex items-center justify-center"
                >
                  ปิด
                </div>
              )}
            </div>

            <div className="flex flex-col gap-y-6">
              {menus.map((menu, index) => (
                <div key={index}>
                  <MenuCard {...menu} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div ref={ref}>{((inView && isLoading) || loading) && <Spinner />}</div>
      </div>
    </div>
  );
};

export default RestaurantPage;
