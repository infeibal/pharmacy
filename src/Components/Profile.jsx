import { useState } from "react";
import { OrderHistoryItem } from "./OrderHistoryItem";

export const Profile = ({
  userName,
  setIsAuth,
  orderHistory,
  gameWinsCount,
}) => {
  const aboutMeProfile = "Информация о себе";
  const orderHistoryProfile = "История заказов";
  const bonusPerGame = "Бонусы за игру";

  const [newName, setNewName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  let isNameUpdated = false;

  const [profileType, setProfileType] = useState(aboutMeProfile);

  return (
    <div id="notOverflow" className="animate-appearance mx-auto flex flex-col">
      <div
        id="notOverflow"
        className="mx-auto bg-neutral-200 max-w-[600px] flex justify-around pt-4 px-4 rounded-t-lg"
      >
        <button
          onClick={(e) => setProfileType(aboutMeProfile)}
          className={`text-lg px-4 py-2 hover:bg-white duration-300 rounded-t-lg ${
            profileType === aboutMeProfile ? "bg-white" : ""
          }`}
        >
          {aboutMeProfile}
        </button>
        <button
          onClick={(e) => setProfileType(orderHistoryProfile)}
          className={`text-lg px-4 py-2 hover:bg-white duration-300 rounded-t-lg ${
            profileType === orderHistoryProfile ? "bg-white" : ""
          }`}
        >
          {orderHistoryProfile}
        </button>
        <button
          onClick={(e) => setProfileType(bonusPerGame)}
          className={`text-lg px-4 py-2 hover:bg-white duration-300 rounded-t-lg ${
            profileType === bonusPerGame ? "bg-white" : ""
          }`}
        >
          {bonusPerGame}
        </button>
      </div>
      <div
        id="notOverflow"
        className="bg-white w-max mx-auto min-w-[558px] rounded-lg p-4"
      >
        {profileType === aboutMeProfile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 font-light text-gray-500 text-xl">
              Ваше имя:<span className="font-semibold">{userName}</span>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Смена имени
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                className="rounded text-lg px-4 py-2 focus:outline-none bg-neutral-100"
                placeholder="Сменить имя"
                name=""
                id=""
              />
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Смена пароля
              </label>
              <div className="flex flex-col gap-2">
                <input
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  type="text"
                  className="rounded text-lg px-4 py-2 focus:outline-none bg-neutral-100"
                  placeholder="Старый пароль"
                  name=""
                  id=""
                />
                <input
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  type="text"
                  className="rounded text-lg px-4 py-2 focus:outline-none bg-neutral-100"
                  placeholder="Новый пароль"
                  name=""
                  id=""
                />
              </div>
            </div>

            <button
              disabled={!(newName || (newPass && oldPass))}
              onClick={() => {
                if (newName && newName.length) {
                  if (newName === userName) {
                    alert("Ошибка! Новое имя совпадает с текущим");
                  } else {
                    const oldUserPass = localStorage.getItem(`${userName}`);
                    localStorage.removeItem(`${userName}`);
                    localStorage.setItem(newName, `${oldUserPass}`);
                    localStorage.setItem("isAuth", newName);
                    setIsAuth(newName);

                    isNameUpdated = true;
                  }
                }

                if (oldPass && oldPass.length && newPass && newPass.length) {
                  let actuallyOldPass = localStorage.getItem(`${userName}`);
                  if (isNameUpdated) {
                    actuallyOldPass = localStorage.getItem(`${newName}`);
                  }
                  if (actuallyOldPass === oldPass) {
                    if (newPass === actuallyOldPass) {
                      alert("Пароль совпадает с текущим!");
                    } else if (isNameUpdated) {
                      localStorage.setItem(newName, `${newPass}`);

                      isNameUpdated = false;

                      alert("Пароль изменен!");
                    } else {
                      localStorage.setItem(userName, `${newPass}`);
                      alert("Пароль изменен!");
                    }
                  } else {
                    alert("Старый пароль неверный!");
                  }
                } else if (
                  newPass &&
                  newPass.length &&
                  !oldPass &&
                  !oldPass.length
                ) {
                  alert("Поле старого пароля пусто!");
                }
              }}
              className={` mt-6 flex gap-4 items-center font-semibold duration-200 hover:bg-blue-800 text-lg w-[235px] text-center justify-center py-2  text-white rounded bg-blue-600 ${
                newName || (newPass && oldPass)
                  ? ""
                  : "bg-blue-800 cursor-default"
              }`}
            >
              Сохранить
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("isAuth");
                window.location.href = "/";
              }}
              className="mt-14 flex gap-4 items-center font-semibold duration-200 hover:bg-red-800 text-lg px-[58px] py-2  text-white rounded bg-red-600"
            >
              Выйти
            </button>
          </div>
        ) : null}
        {profileType === orderHistoryProfile ? (
          <div
            id="notOverflow"
            className="flex flex-col items-center gap-4 w-full"
          >
            {orderHistory.map((item, index) => (
              <OrderHistoryItem key={index} item={item} index={index} />
            ))}
            {!orderHistory.length ? (
              <h1 className="font-light text-gray-500 text-xl">
                Ваша история заказов пуста!
              </h1>
            ) : null}
          </div>
        ) : null}
        {profileType === bonusPerGame ? (
          <div className="flex justify-between items-center gap-4 p-4 font-light text-gray-500 text-xl">
            <span>
              <h1>
                Ваши победы: <b>{gameWinsCount}</b>
              </h1>{" "}
              <h2>
                Ваша скидка: <b>{gameWinsCount / 10}%</b>
              </h2>
            </span>
            <span>1 Победа = 0.1% скидка!</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
