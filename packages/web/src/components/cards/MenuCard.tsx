import { useState } from "react";
import { ShortMenu } from "../../types/restuarant";
import isWithinTimePeriod from "../../utils/isWithinTimePeriod";
import FullMenuModal from "../models/FullMenuModel";
import useMenuDetails from "../../hooks/useMenuDetails";

const MenuCard = (props: ShortMenu): JSX.Element => {
  const [openModel, setOpenModel] = useState(false);
  const { menu, loading, error } = useMenuDetails(props.name);
  const isSoldOut = props.totalInStock - props.sold < 1;
  const isBestSeller = props.totalInStock - props.sold < 100;

  const isDiscounted = () => {
    if (props.discountedTimePeriod) {
      return isWithinTimePeriod(
        props.discountedTimePeriod.begin,
        props.discountedTimePeriod.end
      );
    }
    return false;
  };

  return (
    <div
      className="w-full flex gap-x-3 p-1 border border-neutral-200 rounded-2xl"
      role="button"
      onClick={() => setOpenModel(true)}
    >
      {openModel && menu && (
        <FullMenuModal
          menu={menu}
          loading={false}
          onClose={() => setOpenModel(false)}
        />
      )}
      <div className="relative">
        {isBestSeller ? (
          <div className="absolute -top-4 -right-4">
            <img src="/sales.svg" alt="sales" className="w-12" />
          </div>
        ) : null}
        <img
          src={props.thumbnailImage}
          className="min-w-24 min-h-24 rounded-2xl object-cover object-center"
          alt={"menu image"}
        />
      </div>

      <div className="flex flex-col font-semibold py-1">
        {isSoldOut ? (
          <div className="text-neutral-500">{props.name} (หมด)</div>
        ) : (
          <div>{props.name}</div>
        )}

        {isDiscounted() ? (
          <div className="flex gap-x-2 flex-wrap">
            <div className="line-through text-neutral-500">
              {props.fullPrice} บาท
            </div>
            <div>
              {(props.fullPrice * (1 - props.discountedPercent / 100)).toFixed(
                2
              )}{" "}
              บาท
            </div>
          </div>
        ) : (
          <div>{props.fullPrice} บาท</div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
