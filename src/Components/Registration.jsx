import { useState } from "react";
import { Link } from "react-router-dom";

export const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function reg() {
    if (login.length && password.length) {
      if (localStorage.getItem(login)) {
        alert("Такой пользователь уже существует");
      } else {
        localStorage.setItem(login, password);
        window.location.href = "/";
      }
    }
  }

  return (
    <div className="mx-auto mt-20 bg-white flex flex-col items-center px-4 py-8 w-[400px] rounded">
      <h1 className="font-semibold text-2xl">Регистрация</h1>
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
          onClick={() => reg()}
          className="font-semibold mt-10 duration-200 hover:bg-blue-800 text-lg px-6 py-2  text-white rounded bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </div>

      <p className="text-center text-md mt-4">
        Есть аккаунт? <br />
        <Link to={"/"} className="text-blue-500 underline">
          Войти
        </Link>
      </p>
    </div>
  );
};
