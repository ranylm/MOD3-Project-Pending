import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Org } from "../../utilities/agent-service";
import { StateContext } from "../../App";
type OrganizationInput = {
  name: string;
};

export default function CreateOrgForm() {
  const [error, setError] = useState(false);
  const globalstate = useContext(StateContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationInput>();

  const onSubmit: SubmitHandler<OrganizationInput> = async (data) => {
    setError(false);
    const response = await Org.newOrg(data.name).send();
    globalstate?.setGlobal?.({ orgId: response.id });
    // redirect on success
    response.id === undefined ? setError(true) : navigate("/organization");
  };

  return (
    <div>
      <h1>Organization Creation Form</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        Organization Name
        <input {...register("name", { required: true })} type="text" />
        {error === true ? <p style={{ color: "red" }}>Invalid Data</p> : null}
        <button
          type="submit"
          disabled={Object.keys(errors).length ? true : false}
        >
          Create Org
        </button>
      </form>
    </div>
  );
}
