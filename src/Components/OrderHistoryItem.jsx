export const OrderHistoryItem = ({ item, index }) => {
  return (
    <div
      id="notOverflow"
      className="border-y-[1px] border-neutral-200 flex items-center justify-between gap-4 w-full p-4"
    >
      <div id="notOverflow" className="flex gap-4 w-full items-center">
        <h1 className="font-semibold text-lg">{index + 1}.</h1>
        <div id="notOverflow" className="flex flex-col">
          {item.itemsList.map((i, index1) => (
            <h2 className="text-lg" key={index1}>
              {i.name}{" "}
              <span className="text-blue-500 font-bold">x {i.count}</span>
            </h2>
          ))}
        </div>
      </div>
      <div
        id="notOverflow"
        className="text-end font-semibold text-lg min-w-[200px] whitespace-nowrap"
      >
        Итого: {item.total} руб.
      </div>
    </div>
  );
};
