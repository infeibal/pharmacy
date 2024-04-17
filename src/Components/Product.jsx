import { Link } from "react-router-dom";

export const Product = ({ item, setCartItems }) => {
  return (
    <div className=" relative ">
      <Link
        to={`/product/${item.id}`}
        className=" w-[400px] gap-4 border-t-2 border-x-2 border-neutral-200  rounded-t-lg flex flex-col items-center relative"
      >
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <p className="text-lg font-semibold">{item.rating}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            alt="rating-img"
            className="w-6"
          />
        </div>
        <img src={item.img} className="mt-10  max-w-[296px] max-h-[196px]" />
        <div className="flex flex-col justify-between w-full p-4 h-[148px] bg-neutral-200">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="font-light">{item.type}</p>
          </div>
          <div className="flex items-center self-end w-full justify-between">
            <h2 className="font-bold text-xl">{item.price} руб.</h2>
          </div>
        </div>
      </Link>

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
        className="absolute right-4  bottom-4 flex gap-4 items-center font-semibold duration-200 hover:bg-blue-800 text-lg px-6 py-2  text-white rounded bg-blue-600"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
          alt=""
          className="w-5 invert"
        />
        В корзину
      </button>
    </div>
  );
};
