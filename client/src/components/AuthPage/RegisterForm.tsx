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
    formState: { errors, isValid },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    setError(false);
    // redirect on success
    (await User.newUser(data).send()) ? true : setError(true);
  };

  return (
    <div>
      <h1>New User? Register Here!</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        Username
        <input {...register("name", { required: true })} />
        Email
        <input {...register("email", { required: true })} type="email" />
        Password
        <input
          type="password"
          {...register("password", { required: true, minLength: 3 })}
        />
        Verify Password
        <input
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
          Register
        </button>
      </form>
      <Link to="/">Existing User? Enter here.</Link>
    </div>
  );
}
