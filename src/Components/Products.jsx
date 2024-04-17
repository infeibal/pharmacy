import { useState } from "react";
import { ProductsList } from "./ProductsList";

export const Products = ({ setCartItems }) => {
  const withoutSort = "Без сортировки";
  const priceDownSort = "По убыванию цены";
  const priceUpSort = "По возрастанию цены";
  const ratingSort = "По рейтингу";

  const [filter, setFilter] = useState("Все");
  const [sort, setSort] = useState("Без сортировки");

  return (
    <main
      id="notOverflow"
      className="animate-appearance bg-white rounded-lg h-full p-4 pb-10 flex flex-col gap-6"
    >
      <div className="mx-auto flex gap-4">
        <button
          onClick={() => setFilter("Все")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Все" ? "bg-blue-800" : ""
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter("Таблетки")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Таблетки" ? "bg-blue-800" : ""
          }`}
        >
          Таблетки
        </button>
        <button
          onClick={() => setFilter("Сиропы")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Сиропы" ? "bg-blue-800" : ""
          }`}
        >
          Сиропы
        </button>
        <button
          onClick={() => setFilter("Бинты")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Бинты" ? "bg-blue-800" : ""
          }`}
        >
          Бинты
        </button>
        <button
          onClick={() => setFilter("Шприцы")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Шприцы" ? "bg-blue-800" : ""
          }`}
        >
          Шприцы
        </button>
        <button
          onClick={() => setFilter("Гигиена")}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold duration-300 hover:bg-blue-800 ${
            filter === "Гигиена" ? "bg-blue-800" : ""
          }`}
        >
          Гигиена
        </button>
        <div className="flex items-center relative">
          <select
            onChange={(e) => setSort(e.target.value)}
            id="select"
            className=" w-[250px] border-2 border-blue-500 rounded-full px-4 appearance-none focus:outline-none py-2 text-lg font-semibold "
          >
            <option disabled>Сортировка</option>
            <option>{withoutSort}</option>
            <option>{priceUpSort}</option>
            <option>{priceDownSort}</option>
            <option>{ratingSort}</option>
          </select>
          <img
            src="https://cdn-icons-png.flaticon.com/512/32/32195.png"
            className="w-4 absolute right-4 pointer-events-none"
          />
        </div>
      </div>
      <ProductsList filter={filter} sort={sort} setCartItems={setCartItems} />
    </main>
  );
};
