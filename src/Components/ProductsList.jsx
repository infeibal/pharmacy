import { useEffect, useState } from "react";
import { Product } from "./Product";
import { products } from "../data";

export const ProductsList = ({ filter, sort, setCartItems }) => {
  const withoutSort = "Без сортировки";
  const priceDownSort = "По убыванию цены";
  const priceUpSort = "По возрастанию цены";
  const ratingSort = "По рейтингу";

  const [pageLength, setPageLength] = useState(8);

  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    setProductsToShow(
      products
        .filter((item) => {
          if (filter === "Все") {
            return true;
          } else {
            return item.type == filter;
          }
        })
        .sort((a, b) => {
          if (sort === withoutSort) {
            return 0;
          }
          if (sort === priceDownSort) {
            return b.price - a.price;
          }
          if (sort === priceUpSort) {
            return a.price - b.price;
          }

          if (sort === ratingSort) {
            return b.rating - a.rating;
          }

          return 0;
        })
    );
  }, [filter, sort]);

  return (
    <>
      <div id="notOverflow" className=" flex flex-wrap justify-around gap-6">
        {productsToShow
          .filter((item, index) => index + 1 <= pageLength)
          .map((item) => (
            <Product key={item.id} item={item} setCartItems={setCartItems} />
          ))}
      </div>
      {productsToShow.length > pageLength || productsToShow <= pageLength ? (
        <button
          onClick={() => {
            setPageLength((prev) => prev + 4);
          }}
          className="mt-6 self-center flex gap-4 items-center font-semibold duration-200 hover:bg-neutral-600 text-lg px-6 py-2  text-white rounded bg-neutral-500"
        >
          Показать еще
        </button>
      ) : null}
    </>
  );
};
