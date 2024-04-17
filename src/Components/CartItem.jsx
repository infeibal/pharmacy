import { useState } from "react";

export const CartItem = ({ item, setCartItems, changeItemCount }) => {
  const maxItemsCount = 50;

  const [itemCount, setItemCount] = useState(1);

  return (
    <div className="flex min-h-[50px]  items-center gap-4">
      <div className="w-[80px] h-[80px]">
        <img
          src={item.img}
          className="object-cover w-[70px] h-[70px] rounded-lg"
        />
      </div>
      <div className="flex gap-4 items-center justify-between w-full">
        <h2 className="text-lg font-semibold line-clamp-2 w-[150px]">
          {item.name}
        </h2>
        <div className="flex justify-between gap-4 items-center">
          <button
            disabled={!(itemCount - 1)}
            onClick={() => {
              setItemCount((prev) => {
                return --prev;
              });

              setCartItems((prev) => {
                const index = prev.findIndex((item1) => item1.id === item.id);

                prev[index].count = itemCount - 1;

                return prev;
              });

              changeItemCount();
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png"
              alt="minus"
              className={`w-5 ${
                itemCount - 1 ? "hover:opacity-30" : ""
              } opacity-50 `}
            />
          </button>
          <span className="text-lg font-light">{itemCount}</span>
          <button
            disabled={!!(itemCount >= maxItemsCount)}
            onClick={() => {
              setItemCount((prev) => {
                return prev < maxItemsCount ? ++prev : prev;
              });

              setCartItems((prev) => {
                const index = prev.findIndex((item1) => item1.id === item.id);

                prev[index].count = itemCount + 1;

                return prev;
              });

              changeItemCount();
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
              alt="plus"
              className={`w-5  opacity-50 ${
                itemCount >= maxItemsCount ? "" : "hover:opacity-30"
              }`}
            />
          </button>
        </div>
        <p className="text-lg font-light w-[90px] text-center">
          {item.price * itemCount} руб.
        </p>
        <button
          className="text-2xl"
          onClick={() => {
            setCartItems((prev) => {
              return prev.filter((item1) => item1.id !== item.id);
            });

            changeItemCount();
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/58/58253.png"
            className="w-5 hover:opacity-30 opacity-50"
          />
        </button>
      </div>
    </div>
  );
};
