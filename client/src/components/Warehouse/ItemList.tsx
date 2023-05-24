import { ItemType } from "./WarehouseInterface";
import StorageItem from "./Item";

type Props = {
  storage: ItemType[] | undefined;
  getWarehouseData: () => void;
  setItemToEdit: (a) => void;
};

export default function ItemList({ storage, setItemToEdit }: Props) {
  return (
    <div className="flex flex-row flex-wrap">
      {storage?.map?.((item) => {
        return <StorageItem item={item} setItemToEdit={setItemToEdit} />;
      })}
    </div>
  );
}
