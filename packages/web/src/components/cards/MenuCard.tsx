import { useState } from "react";
import { ShortMenu } from "../../types/restuarant";
import isWithinTimePeriod from "../../utils/isWithinTimePeriod";
import FullMenuModal from "../modals/FullMenuModal";
import useMenuDetails from "../../hooks/useMenuDetails";

const MenuCard = (props: ShortMenu): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { menu, loading, error } = useMenuDetails(props.name);

  const renderModal = () => {
    if (openModal && menu) {
      return (
        <FullMenuModal
          menu={menu}
          loading={false}
          onClose={() => setOpenModal(false)}
        />
      );
    }

    return null;
  };

  const renderIsSoldOut = () => {
    if (props.totalInStock - props.sold < 1) {
      return <div className="text-neutral-500">{props.name} (หมด)</div>;
    }
    return <div>{props.name}</div>;
  };

  const renderIsDiscounted = () => {
    if (
      props.discountedTimePeriod &&
      isWithinTimePeriod(
        props.discountedTimePeriod.begin,
        props.discountedTimePeriod.end
      )
    ) {
      return (
        <div className="flex gap-x-2 flex-wrap">
          <div className="line-through text-neutral-500">
            {props.fullPrice} บาท
          </div>
          <div>
            {(props.fullPrice * (1 - props.discountedPercent / 100)).toFixed(2)}{" "}
            บาท
          </div>
        </div>
      );
    }
    return <div>{props.fullPrice} บาท</div>;
  };

  const renderIsBestSeller = () => {
    if (props.totalInStock - props.sold < 100) {
      return (
        <div className="absolute -top-4 -right-4">
          <img src="/sales.svg" alt="sales" className="w-12" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="w-full flex gap-x-3 p-1 border border-neutral-200 rounded-2xl"
      role="button"
      onClick={() => setOpenModal(true)}
    >
      {renderModal()}

      <div className="relative">
        {renderIsBestSeller()}

        <img
          src={props.thumbnailImage}
          className="min-w-24 min-h-24 rounded-2xl object-cover object-center"
          alt={"menu image"}
        />
      </div>

      <div className="flex flex-col font-semibold py-1">
        {renderIsSoldOut()}
        {renderIsDiscounted()}
      </div>
    </div>
  );
};

export default MenuCard;
