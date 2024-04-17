import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Auth = ({ setIsAuth }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === null) {
      setIsAuth(false);
    } else {
      setIsAuth(isAuth);
    }
  }, []);

  function auth() {
    if (login.length && password.length) {
      const userPassword = localStorage.getItem(login) ?? false;

      if (password == userPassword) {
        localStorage.setItem("isAuth", login);

        setIsAuth(true);
      } else {
        alert("Неправильный логин или пароль");
      }
    }
  }

  return (
    <div className="animate-appearance mx-auto mt-20 bg-white flex flex-col items-center px-4 py-8 w-[400px] rounded">
      <h1 className="font-semibold text-2xl">Авторизация</h1>
      <div className="flex flex-col gap-4 w-full px-8 my-8">
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="Логин"
          className="rounded text-lg px-4 py-2 focus:outline-none bg-neutral-100"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          className="rounded text-lg px-4 py-2 focus:outline-none bg-neutral-100"
        />
        <button
          onClick={() => auth()}
          className="font-semibold mt-10 duration-200 hover:bg-blue-800 text-lg px-6 py-2  text-white rounded bg-blue-600"
        >
          Войти
        </button>
      </div>

      <p className="text-center text-md mt-4">
        Не зарегистрированы? <br />
        <Link to={"/registration"} className="text-blue-500 underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};
