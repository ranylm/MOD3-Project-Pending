import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../utilities/agent-service";
import { WarehouseData } from "../Warehouse/WarehouseInterface";

export default function UserWarehouseList() {
  const [warehouses, setWarehouse] = useState<WarehouseData[]>();

  async function getWarehouseData() {
    const warehouseData = await User.getWareHouseList().send();
    setWarehouse(warehouseData);
    console.log(warehouseData);
  }

  useEffect(() => {
    getWarehouseData();
  }, []);

  return (
    <div>
      <h1>Warehouses</h1>
      {warehouses?.map?.((warehouse) => {
        return (
          <Link to={`/warehouse/${warehouse._id}`}>
            <p className="text-teal-300 capitalize shadow-lg rounded-lg flex flex-col bg-teal-800 m-2 p-2 min-w-[15rem] border border-teal-500">
              {warehouse?.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
