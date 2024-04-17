import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Auth } from "./Components/Auth";
import { Route, Routes } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { Profile } from "./Components/Profile";
import { Products } from "./Components/Products";
import { ProductCard } from "./Components/ProductCard";
import { Cart } from "./Components/Cart";
import { Game } from "./Game/Game";
import { Error } from "./Components/Error";

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [gameWinsCount, setGameWinsCount] = useState(0);

  const [orderHistory, setOrderHistory] = useState([]);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === null) {
      setIsAuth(false);
    } else {
      setIsAuth(isAuth);
    }
  }, []);

  useEffect(() => {
    if (showCart) {
      document.documentElement.style.setProperty(
        "--isOverflowHidden",
        "hidden"
      );
    } else {
      document.documentElement.style.setProperty("--isOverflowHidden", "auto");
    }
  }, [showCart]);

  return (
    <div
      id="App"
      className={`animate-appearance min-w-screen h-full min-h-screen flex flex-col bg-gradient-to-r from-cyan-100 to-blue-100 px-4`}
    >
      {showCart ? (
        <Cart
          gameWinsCount={gameWinsCount}
          setOrderHistory={setOrderHistory}
          setShowCart={setShowCart}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ) : null}
      <div
        className={`duration-500 ${
          showCart ? "opacity-40 pointer-events-none select-none" : ""
        }`}
      >
        <Routes>
          {/* <Route path="*" element={<Error />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/game"
            element={[
              <Header
                setShowCart={setShowCart}
                userName={isAuth}
                setIsAuth={setIsAuth}
                cartItems={cartItems}
                key={!!isAuth}
              />,
              <Game key={!isAuth} setGameWinsCount={setGameWinsCount} />,
            ]}
          />
          <Route
            path="/"
            element={
              isAuth ? (
                [
                  <Header
                    setShowCart={setShowCart}
                    userName={isAuth}
                    setIsAuth={setIsAuth}
                    cartItems={cartItems}
                    key={!!isAuth}
                  />,
                  <Products key={!isAuth} setCartItems={setCartItems} />,
                ]
              ) : (
                <Auth setIsAuth={setIsAuth} />
              )
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/profile"
            element={[
              <Header
                setShowCart={setShowCart}
                userName={isAuth}
                setIsAuth={setIsAuth}
                cartItems={cartItems}
                key={!!isAuth}
              />,
              <Profile
                orderHistory={orderHistory}
                setIsAuth={setIsAuth}
                userName={isAuth}
                key={!isAuth}
                gameWinsCount={gameWinsCount}
              />,
            ]}
          />
          <Route
            path="/product/:id"
            element={[
              <Header
                userName={isAuth}
                setShowCart={setShowCart}
                setIsAuth={setIsAuth}
                cartItems={cartItems}
                key={!!isAuth}
              />,
              <ProductCard setCartItems={setCartItems} key={!isAuth} />,
            ]}
          />
        </Routes>
      </div>
    </div>
  );
};
