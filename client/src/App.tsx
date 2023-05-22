import "./App.css";
import { useState } from "react";
import { getUser } from "./utilities/user-service";
// import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";

import HomePage from "./pages/VerifiedPortal/HomePage";
function App() {
  const [user, setUser]: [
    null,
    (a: { username: string; email: string } | null) => void
  ] = useState(getUser());

  return (
    <div>
      <h1>Home</h1>
      {user ? <HomePage /> : <AuthPage setUser={setUser}></AuthPage>}
    </div>
  );
}

export default App;
