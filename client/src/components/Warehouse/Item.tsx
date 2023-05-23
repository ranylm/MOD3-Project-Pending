import { ItemType } from "./WarehouseInterface";

type Props = { item: ItemType };

export default function Item({ item }: Props) {
  return (
    <div className="shadow-lg rounded-lg flex flex-col bg-teal-800 m-2 p-2 min-w-[15rem] border border-teal-500">
      {/* <span>{item._id}</span> */}
      <span className="text-teal-300 capitalize text-2xl font-semibold tracking-wide font-sans">
        {item.name}
      </span>
      <span className="tracking-widest font-mono text-lg text-neutral-300">
        QTY:{item.amount}
      </span>
      <span className="text-white tracking-wide">{item.description}</span>
    </div>
  );
}
