import LoginForm from "../components/AuthPage/LoginForm";
import RegisterForm from "../components/AuthPage/RegisterForm";

export default function AuthPage({ setUser }) {
  return (
    <div>
      <h1>Auth page</h1>
      <LoginForm setUser={setUser} />
      <RegisterForm />
    </div>
  );
}
