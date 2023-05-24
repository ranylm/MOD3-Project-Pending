import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Warehouse } from "../../utilities/agent-service";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";
import ItemList from "./ItemList";

export type ItemType = {
  name?: string;
  amount?: number;
  description?: string;
  _id?: string;
};

export type WarehouseData = {
  _id: string;
  name: string;
  owner: string;
  ownerType: string;
  storage: ItemType[] | undefined;
};

export default function WarehouseInterface() {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState<WarehouseData>();
  const [itemToEdit, setItemToEdit] = useState(null);

  const getWarehouseData = async () => {
    if (!warehouseId) return;
    const data = await Warehouse.getWarehouse(warehouseId).send();
    setWarehouse(data.warehouse);
    // console.log(data);
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  return (
    <div>
      <div className="flex flex-row">
        <AddItemForm
          warehouseId={warehouseId}
          getWarehouseData={getWarehouseData}
        />
        {itemToEdit && (
          <EditItemForm item={itemToEdit} getWarehouseData={getWarehouseData} />
        )}
      </div>
      <ItemList
        storage={warehouse?.storage}
        getWarehouseData={getWarehouseData}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}
