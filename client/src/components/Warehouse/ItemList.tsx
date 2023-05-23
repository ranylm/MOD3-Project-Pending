import { ItemType } from "./WarehouseInterface";
import StorageItem from "./Item";

type Props = {
  storage: ItemType[] | undefined;
  getWarehouseData: () => void;
};

export default function ItemList({ storage }: Props) {
  return (
    <div className="flex flex-row flex-wrap">
      {storage?.map?.((item) => {
        return <StorageItem item={item} />;
      })}
    </div>
  );
}
