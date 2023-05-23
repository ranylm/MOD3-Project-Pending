import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Warehouse } from "../../utilities/agent-service";
import AddItemForm from "./AddItemForm";
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

  const getWarehouseData = async () => {
    if (!warehouseId) return;
    const data = await Warehouse.getWarehouse(warehouseId).send();
    setWarehouse(data.warehouse);
    console.log(data);
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  return (
    <div className="w-full">
      <h1>WarehouseInterface</h1>
      <AddItemForm
        warehouseId={warehouseId}
        getWarehouseData={getWarehouseData}
      />
      <ItemList
        storage={warehouse?.storage}
        getWarehouseData={getWarehouseData}
      />
    </div>
  );
}
