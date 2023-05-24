import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Org } from "../../utilities/agent-service";
import { StateContext } from "../../App";

type MemberInput = {
  id: string;
};

export default function AddMemberForm() {
  const [error, setError] = useState(false);
  const globalstate = useContext(StateContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MemberInput>();

  const onSubmit: SubmitHandler<MemberInput> = async (data) => {
    setError(false);
    if (globalstate?.global?.orgId === undefined) {
      setError(true);
      return;
    }
    const response = await Org.addMember(
      globalstate?.global?.orgId,
      data.id
    ).send();
    // globalstate?.setGlobal?.({ orgId: response.id });
    // redirect on success
    response.id === undefined ? setError(true) : navigate("/organization");
  };

  return (
    <div className="w-1/4 font-Inter tracking-wide bg-teal-700 p-2 m-2 rounded-md border border-black font-thin text-neutral-100 min-w-[15rem] ">
      <form className="flex flex-col m-2" onSubmit={handleSubmit(onSubmit)}>
        Add User to Organization
        <input
          {...register("id", { required: true })}
          type="text"
          className="bg-teal-800 border border-teal-600 rounded-md w-full"
        />
        {error === true ? <p style={{ color: "red" }}>Invalid Data</p> : null}
        <button type="submit" disabled={isValid === false}>
          Add Member
        </button>
      </form>
    </div>
  );
}
