import { useLocation } from "react-router-dom";
import { products } from "../data";

export const ProductCard = ({ setCartItems }) => {
  let location = useLocation();
  const itemId = +location.pathname.split("/")[2];
  const item = products.find((item) => item.id === itemId);

  return (
    <div
      id="notOverflow"
      className="animate-appearance flex bg-white rounded-lg w-max py-10 px-20 mx-auto items-center justify-between h-[328px]"
    >
      <img
        src={item.img}
        alt="product-img"
        className="max-h-full
      "
      />
      <div className="flex flex-col w-full py-4 h-full items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          <h1 className="self-end">{item.type}</h1>
          <div className="self-end flex items-center gap-1 mt-6">
            <p className="text-lg font-semibold">{item.rating}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
              alt="rating-img"
              className="w-6"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <h1 className="font-bold text-xl">{item.price} руб.</h1>
          <button
            onClick={() =>
              setCartItems((prev) => {
                if (prev && prev.length) {
                  const isExist = prev.find((item1) => item1.id == item.id);
                  return isExist ? [...prev] : [...prev, { ...item, count: 1 }];
                } else {
                  return [{ ...item, count: 1 }];
                }
              })
            }
            className="w-[170px] flex gap-4 items-center font-semibold duration-200 hover:bg-blue-800 text-lg px-6 py-2  text-white rounded bg-blue-600"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
              alt=""
              className="w-5 invert"
            />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
