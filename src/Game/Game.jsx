import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const Mine = -1;
const Transparent = 0;
const Fill = 1;
const Flag = 2;
const Question = 3;

const mapMaskToView = {
  0: null,
  1: "🌿",
  2: "🚩",
  3: "❓",
};

function createField(size) {
  const field = new Array(size * size).fill(0);

  function inc(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === Mine) return;

      field[y * size + x] += 1;
    }
  }

  for (let i = 0; i < size; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y * size + x] === Mine) continue;

    field[y * size + x] = Mine;

    i += 1;

    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
  }

  return field;
}

export const Game = ({ setGameWinsCount }) => {
  const size = 10;
  const dimension = new Array(size).fill(null);

  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState(() => new Array(size * size).fill(Fill));
  const [death, setDeath] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setWin(
      !field.some(
        (f, i) => f === Mine && mask[i] !== Flag && mask[i] !== Transparent
      )
    );
  }, [field, mask]);

  useEffect(() => {
    if (death && !win) {
      alert(
        "Вы выиграли!\nДа, это была игра «Найди бомбу» и вы успешно справились с миссией.\nБонусы зачислены на ваш аккаунт!"
      );

      setGameWinsCount((prev) => ++prev);
      return;
    }

    if (win && !death) {
      alert(
        "Вы выиграли!\nДа, это была игра «Заставь поля флажками и не важно какие» и вы успешно справились с миссией.\nБонусы зачислены на ваш аккаунт!"
      );

      setGameWinsCount((prev) => ++prev);
      return;
    }
  }, [death, win]);

  return (
    <div className="animate-appearance flex flex-col items-center">
      <div className="rounded-t-lg bg-white py-2 px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3106/3106716.png"
          alt="restart-img"
          className="duration-500 scale-100 w-6 cursor-pointer hover:scale-110 "
          onClick={() => {
            setWin(false);

            setField(() => createField(size));
            setMask(() => new Array(size * size).fill(Fill));

            setDeath(false);
          }}
        />
      </div>
      <div className=" gap-4 mx-auto w-max p-6 h-max min-h-[100px] bg-white rounded-lg">
        {dimension.map((_, y) => {
          return (
            <div key={y} className=" flex justify-between items-center">
              {dimension.map((_, x) => {
                return (
                  <div
                    style={{
                      background: death || win ? "#fbbf24" : "#4ade80",
                    }}
                    className={`select-none cursor-pointer flex justify-center items-center m-[1px] w-10 h-10 rounded-lg `}
                    key={x}
                    onClick={() => {
                      if (win || death) return;
                      if (mask[y * size + x] === Transparent) return;

                      const clearing = [];

                      function clear(x, y) {
                        if (x >= 0 && x < size && y >= 0 && y < size) {
                          if (mask[y * size + x] === Transparent) return;

                          clearing.push([x, y]);
                        }
                      }

                      clear(x, y);

                      while (clearing.length) {
                        const [x, y] = clearing.pop();

                        mask[y * size + x] = Transparent;

                        if (field[y * size + x] !== 0) continue;

                        clear(x + 1, y);
                        clear(x - 1, y);
                        clear(x, y + 1);
                        clear(x, y - 1);
                      }

                      if (field[y * size + x] === Mine) {
                        mask.forEach((_, i) => (mask[i] = Transparent));

                        setDeath(true);
                      }

                      setMask((prev) => [...prev]);
                    }}
                    onContextMenu={(e) => {
                      if (win || death) return;
                      e.preventDefault();
                      e.stopPropagation();

                      if (mask[y * size + x] === Transparent) return;

                      if (mask[y * size + x] === Fill) {
                        mask[y * size + x] = Flag;
                      } else if (mask[y * size + x] === Flag) {
                        mask[y * size + x] = Question;
                      } else if (mask[y * size + x] === Question) {
                        mask[y * size + x] = Fill;
                      }

                      setMask((prev) => [...prev]);
                    }}
                  >
                    {mask[y * size + x] !== Transparent ? (
                      mapMaskToView[mask[y * size + x]]
                    ) : field[y * size + x] === Mine ? (
                      "💣"
                    ) : (
                      <span className="text-white font-semibold overflow-hidden">
                        {field[y * size + x]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
