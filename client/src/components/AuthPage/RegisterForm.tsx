import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { User } from "../../utilities/agent-service";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  verify: string;
};
export default function RegisterForm() {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    setError(false);
    // redirect on success
    (await User.newUser(data).send()) ? true : setError(true);
  };

  return (
    <div className="text-lg tracking-widest text-teal-300 font-Inter">
      <h1 className="text-xl">Register</h1>
      <form className="flex flex-col m-2" onSubmit={handleSubmit(onSubmit)}>
        <span className="mx-2 my-1">Username</span>
        <input
          className="text-black p-1"
          {...register("name", { required: true })}
        />
        <span className="mx-2 my-1">Email</span>
        <input
          className="text-black p-1"
          {...register("email", { required: true })}
          type="email"
        />
        <span className="mx-2 my-1">Password</span>
        <input
          className="text-black p-1"
          type="password"
          {...register("password", { required: true, minLength: 3 })}
        />
        <span className="mx-2 my-1">Verify Password</span>
        <input
          className="text-black p-1"
          type="password"
          {...register("verify", {
            required: true,
            minLength: 3,
            validate: {
              match: (value) => {
                return value === watch("password");
              },
            },
          })}
        />
        {error === true ? <p style={{ color: "red" }}>Error</p> : null}
        <button type="submit" disabled={isValid === false}>
          <span className="mx-2 my-1">Register</span>
        </button>
      </form>
      <Link to="/">Existing User? Enter here.</Link>
    </div>
  );
}
