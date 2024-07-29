import { Link } from "react-router-dom";
import { Restaurant } from "../../types/restuarant";
import isWithinTimePeriod from "../../utils/isWithinTimePeriod";

const RestaurantCard = (props: Restaurant): JSX.Element => {
  const isOpen = () => {
    if (props.activeTimePeriod) {
      return isWithinTimePeriod(
        props.activeTimePeriod.open,
        props.activeTimePeriod.close
      );
    }
    return false;
  };

  return (
    <Link
      to={`/${props.id}`}
      className="w-full flex gap-x-5 p-1 border border-neutral-200 rounded-2xl"
    >
      <img
        src={props.coverImage}
        className="w-40 h-40 sm:w-60 rounded-2xl object-cover object-center"
        alt={"restaurant image"}
      />

      <div className="flex flex-col py-2 gap-y-3">
        <h2 className="font-bold text-xl">{props.name}</h2>
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
    </Link>
  );
};

export default RestaurantCard;
