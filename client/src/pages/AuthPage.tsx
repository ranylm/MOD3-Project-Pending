import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/AuthPage/LoginForm";
import RegisterForm from "../components/AuthPage/RegisterForm";

export default function AuthPage({ setUser }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* <h1>Auth page</h1> */}
      <div className="w-72">
        <Routes>
          <Route path="/" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </div>
  );
}
