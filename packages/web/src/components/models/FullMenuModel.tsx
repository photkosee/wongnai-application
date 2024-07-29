import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { FullMenu } from "../../types/restuarant";
import isWithinTimePeriod from "../../utils/isWithinTimePeriod";
import ChoiceButton from "../inputs/ChoiceButton";

interface FullMenuModelProps {
  menu: FullMenu;
  loading: boolean;
  onClose: () => void;
}

const FullMenuModel = (props: FullMenuModelProps): JSX.Element => {
  const [isClosing, setIsClosing] = useState(false);
  const menu = props.menu;
  const isSoldOut = menu.totalInStock - menu.sold < 1;
  const isDiscounted = () => {
    if (menu.discountedTimePeriod) {
      return isWithinTimePeriod(
        menu.discountedTimePeriod.begin,
        menu.discountedTimePeriod.end
      );
    }
    return menu.discountedPercent > 0;
  };

  const closeModel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      props.onClose();
    }, 300);
  };

  return (
    <div
      className={`w-screen h-screen bg-black/50 fixed top-0 left-0
      z-20 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
    >
      <div className="h-screen flex items-end justify-center">
        <div
          className={`max-w-3xl w-full h-[80vh] rounded-t-xl bg-white shadow-xl
          z-30 overflow-hidden ${
            isClosing ? "animate-slideDown" : "animate-slideUp"
          }`}
        >
          <div className="relative h-full flex flex-col justify-between pb-5">
            <div className="w-full py-5 px-14 flex justify-center fixed bg-white">
              <h2 className="font-semibold text-xl sm:text-2xl text-center break-words">
                {isSoldOut ? (
                  <div className="text-neutral-500">{menu.name} (หมด)</div>
                ) : (
                  <div>{menu.name}</div>
                )}
              </h2>

              <button
                className="absolute top-4 right-3 p-2 rounded-full hover:bg-neutral-100"
                onClick={() => closeModel()}
              >
                <IoIosArrowDown className="w-7 h-7" />
              </button>
            </div>

            <div className="h-full overflow-y-auto pt-14">
              <img
                src={props.menu.largeImage}
                alt="menu image"
                className="w-full h-full max-h-80 object-cover object-center fade-in"
              />

              <div className="p-5 xl:px-12 flex flex-col gap-y-2">
                <h2 className="font-semibold text-xl sm:text-2xl">
                  {isDiscounted() ? (
                    <div className="flex gap-x-2 flex-wrap">
                      <div className="line-through text-neutral-500">
                        ราคา {menu.fullPrice} บาท
                      </div>
                      <div>
                        ราคา{" "}
                        {menu.fullPrice * (1 - menu.discountedPercent / 100)}{" "}
                        บาท
                      </div>
                    </div>
                  ) : (
                    <div>ราคา {menu.fullPrice} บาท</div>
                  )}
                </h2>

                <div className="h-[1.5px] bg-neutral-300" />

                {menu.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-y-1 font-semibold text-lg"
                  >
                    <h3>{option.label}</h3>

                    <div className="flex gap-1 flex-wrap text-sm">
                      {option.choices.map((choice, index) => (
                        <div key={index}>
                          <ChoiceButton prop={choice.label} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 xl:px-12">
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg 
                hover:bg-green-400 mt-3"
                onClick={() => closeModel()}
              >
                กดเพื่อสั่ง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenuModel;
