import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IItem } from "../../../../models/Item";
import { Warehouse } from "../../utilities/agent-service";
import { useParams } from "react-router-dom";

type ItemInput = {
  name: string;
  amount: number;
  description: string;
};

type Props = {
  item: IItem | null;
  getWarehouseData: () => void;
};

export default function EditItemForm({ item, getWarehouseData }: Props) {
  const [error, setError] = useState(false);
  const { warehouseId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ItemInput>();

  console.log("EDITING THIS", item);

  const onSubmit: SubmitHandler<ItemInput> = async (data) => {
    if (warehouseId === undefined) {
      setError(true);
      return;
    }
    setError(false);
    const response = await Warehouse.editItem(warehouseId, {
      ...item,
      ...data,
    }).send();
    // globalstate?.setGlobal?.({ orgId: response.id });
    // reload warehouse data on success
    response.error !== undefined ? setError(true) : getWarehouseData();
  };
  useEffect(() => {
    item?.name && setValue("name", item?.name);

    item?.amount && setValue("amount", item?.amount);

    item?.description && setValue("description", item?.description);
  }, [item]);
  return (
    <>
      <div className="w-1/4 font-Inter tracking-wide bg-teal-700 p-2 m-2 rounded-md border border-black font-thin text-white min-w-[15rem]">
        <h1>Item Edit Creation Form</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          Name
          <input
            {...register("name", { required: true })}
            type="text"
            className="bg-teal-800 border border-teal-600 rounded-md"
          />
          Amount
          <input
            {...register("amount", {
              required: true,
              min: 0,
            })}
            type="number"
            className="bg-teal-800 border border-teal-600 rounded-md"
          />
          Description
          <input
            {...register("description", {})}
            type="text"
            className="bg-teal-800 border border-teal-600 rounded-md"
          />
          {error === true ? <p style={{ color: "red" }}>Invalid Data</p> : null}
          <button type="submit" disabled={isValid === false}>
            Edit item
          </button>
        </form>
      </div>
    </>
  );
}
