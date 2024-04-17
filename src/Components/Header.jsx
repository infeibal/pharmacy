import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Header = ({ setShowCart, userName, setIsAuth, cartItems }) => {
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === null) {
      setIsAuth(false);
    } else {
      setIsAuth(isAuth);
    }
  }, []);

  return (
    <header className="min-h-20 mb-4 mx-auto w-[900px] rounded-b-lg flex justify-center items-center gap-6 bg-white">
      <Link
        to="/"
        className="text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg"
      >
        <img
          src="	https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
          alt=""
          className="w-5"
        />
        Главная
      </Link>
      <span
        onClick={() => {
          alert("Кнопка-пасхалка 🥚🐇\n\nВ ТЗ этого не было");
        }}
        className="text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          className="w-5"
          alt=""
        />
        О нас
      </span>
      <span
        onClick={() => {
          alert("Кнопка-пасхалка 🥚🐇\n\nВ ТЗ этого не было");
        }}
        className="text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1034/1034131.png"
          alt=""
          className="w-5"
        />
        Контакты
      </span>
      <Link
        to="/game"
        className="relative text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/686/686589.png"
          alt=""
          className="w-7"
        />
        Игра
      </Link>
      <span
        onClick={() => setShowCart(true)}
        className="relative text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        {cartItems.length ? (
          <div
            id="notOverflow"
            className="left-6 top-1 animate-appearance absolute rounded-full w-[16px] h-[16px] bg-orange-500 flex items-center justify-center text-[12px]"
          >
            {cartItems.length > 9 ? "9+" : cartItems.length}
          </div>
        ) : null}
        <img
          src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
          alt=""
          className="w-5"
        />
        Корзина
      </span>
      <Link
        to="/profile"
        className="text-lg font-semibold flex items-center gap-2 duration-500 hover:bg-neutral-200 px-4 py-2 rounded-lg"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/9187/9187475.png"
          alt=""
          className="w-5"
        />
        {userName}
      </Link>
    </header>
  );
};
