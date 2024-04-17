import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

export const Cart = ({
  setShowCart,
  setCartItems,
  cartItems,
  setOrderHistory,
  gameWinsCount,
}) => {
  const [forChangeItemCount, setForChangeItemCount] = useState(0);

  const [amount, setAmount] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const temp = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setAmount(temp);
    setDelivery(temp / 10);
    setTotal(temp + temp / 10);
  }, [forChangeItemCount]);

  function changeItemCount() {
    setForChangeItemCount((prev) => ++prev);
  }

  return (
    <div className="animate-appearance flex flex-col w-[600px] h-max bg-white rounded-lg p-10 mx-auto inset-1 mt-20 fixed z-[999]">
      <button
        onClick={() => setShowCart(false)}
        className="text-2xl absolute z-[100] top-4 right-4"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/58/58253.png"
          className="w-6 hover:opacity-50 opacity-70"
        />
      </button>
      <h1 className="text-2xl font-semibold mb-6">Ваш заказ</h1>
      {cartItems.length ? (
        <>
          <hr className="border-none h-[0.5px] bg-neutral-700 opacity-30" />
          <div id="notOverflow" className="max-h-[400px] overflow-y-auto my-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setCartItems={setCartItems}
                cartItems={cartItems}
                changeItemCount={changeItemCount}
              />
            ))}
          </div>
          <hr className="border-none h-[0.5px] bg-neutral-700 opacity-30" />
          <div className="flex flex-col items-end gap-2 mt-6">
            <span className=" font-light text-gray-500">
              Сумма: {amount} руб.
            </span>
            <span className=" font-light text-gray-500">
              Доставка: {delivery} руб.
            </span>
            {gameWinsCount ? (
              <>
                <span className=" font-semibold text-gray-500">
                  Итого без скидки: {total} руб.
                </span>
                <span className=" font-light text-gray-500">
                  Скидка: {(gameWinsCount / 10).toFixed(1)}% ={" "}
                  {((amount + delivery) * (gameWinsCount / 1000)).toFixed(2)}
                </span>
              </>
            ) : null}
            <span className=" text-3xl font-light">
              Итого: {(total - total * (gameWinsCount / 1000)).toFixed(2)} руб.
            </span>
          </div>
          <button
            onClick={() => {
              alert(
                "Заказ оформлен! Вы можете посмотреть историю заказов в профиле"
              );

              setOrderHistory((prev) => {
                if (prev && prev.length) {
                  return [
                    ...prev,
                    {
                      itemsList: cartItems,
                      total: (total - total * (gameWinsCount / 1000)).toFixed(
                        2
                      ),
                    },
                  ];
                } else {
                  return [
                    {
                      itemsList: cartItems,
                      total,
                    },
                  ];
                }
              });

              setCartItems([]);
              setShowCart(false);
            }}
            className="self-end mt-10 flex gap-4 items-center font-semibold duration-200 hover:bg-blue-800 text-lg px-10 py-2  text-white rounded bg-blue-600"
          >
            Заказать
          </button>
        </>
      ) : (
        <h1 className="font-light text-gray-500 text-xl">
          Ваша корзина пуста!
        </h1>
      )}
    </div>
  );
};
