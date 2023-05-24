import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Warehouse } from "../../utilities/agent-service";
import { StateContext } from "../../App";
import { getUser } from "../../utilities/user-service";

type WarehouseInput = {
  name: string;
  id: string;
};

export default function CreateOrgForm({ type }) {
  const [, setError] = useState(false);
  const globalstate = useContext(StateContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<WarehouseInput>();

  const onSubmit: SubmitHandler<WarehouseInput> = async (data) => {
    setError(false);
    const targetId = type === "User" ? getUser()._id : globalstate.global.orgId;
    const response = await Warehouse.newWarehouse(targetId, data.name).send();
    globalstate?.setGlobal?.({
      ...globalstate.global,
      warehouseId: response.id,
    });
    // redirect on success
    response._id === undefined
      ? setError(true)
      : navigate(`/warehouse/${response._id}`);
  };

  return (
    <div className="w-1/4 font-Inter tracking-wide bg-teal-700 p-2 m-2 rounded-md border border-black font-thin text-neutral-100 min-w-[15rem]">
      <form className="flex flex-col m-2" onSubmit={handleSubmit(onSubmit)}>
        Warehouse Name
        <input
          {...register("name", { required: true })}
          type="text"
          className="bg-teal-800 border border-teal-600 rounded-md"
        />
        {isValid === false ? (
          <p style={{ color: "red" }}>Invalid Data</p>
        ) : null}
        {/* Owner ID (User or Organization)
        <input {...register("id", { required: true })} type="text" />
        {error === true ? <p style={{ color: "red" }}>Invalid Data</p> : null} */}
        <button type="submit" disabled={isValid === false}>
          Add Warehouse
        </button>
      </form>
    </div>
  );
}
