import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { User } from "../../utilities/agent-service";

type LoginInput = {
  email: string;
  password: string;
};
export default function LoginForm({ setUser }) {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setError(false);
    const user = await User.login(data).send();
    // redirect on success
    console.log(user);
    if (user.error) {
      setError(true);
    } else {
      setUser(user);

      localStorage.setItem("token", user);
    }
  };

  return (
    <div>
      <h1>Welcome! Please Login to Continue</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        Email
        <input {...register("email", { required: true })} type="email" />
        Password
        <input
          type="password"
          {...register("password", { required: true, minLength: 3 })}
        />
        {error === true ? (
          <p style={{ color: "red" }}>Invalid Username /Password</p>
        ) : null}
        <button type="submit" disabled={isValid === false}>
          Login
        </button>
        <Link to="/register">Don't Have A Account? Register Here!</Link>
      </form>
    </div>
  );
}
