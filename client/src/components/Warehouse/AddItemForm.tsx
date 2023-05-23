import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Warehouse } from "../../utilities/agent-service";

type ItemInput = {
  name: string;
  amount: number;
  description?: string;
};

type Props = {
  warehouseId: string | undefined;
  getWarehouseData: () => void;
};

export default function AddItemForm({ warehouseId, getWarehouseData }: Props) {
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemInput>();

  const onSubmit: SubmitHandler<ItemInput> = async (data) => {
    setError(false);
    if (warehouseId === undefined) {
      setError(true);
      return;
    }
    const response = await Warehouse.addItem(warehouseId, data).send();
    // globalstate?.setGlobal?.({ orgId: response.id });
    // redirect on success
    response.error !== undefined ? setError(true) : getWarehouseData();
  };

  return (
    <div className="w-1/4 font-Inter tracking-wide bg-teal-700 p-2 m-2 rounded-md border border-black font-thin text-white min-w-[15rem]">
      <h1>Item add Creation Form</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        Name
        <input
          {...register("name", { required: true })}
          type="text"
          className="bg-teal-800 border border-teal-600 rounded-md"
        />
        Amount
        <input
          {...register("amount", { required: true })}
          type="number"
          className="bg-teal-800 border border-teal-600 rounded-md"
        />
        Description
        <input
          {...register("description")}
          type="text"
          className="bg-teal-800 border border-teal-600 rounded-md"
        />
        {error === true ? <p style={{ color: "red" }}>Invalid Data</p> : null}
        <button
          type="submit"
          disabled={Object.keys(errors).length ? true : false}
        >
          Add item
        </button>
      </form>
    </div>
  );
}
