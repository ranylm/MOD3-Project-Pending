import "./App.css";
import React, { useState } from "react";
import { getUser } from "./utilities/user-service";
import AdminPage from "./pages/AdminPage";
function App() {
  const [user, setUser]: [
    null,
    (a: { username: string; email: string } | null) => void
  ] = useState(getUser());

  return (
    <div>
      <h1>Testing 1 2 3</h1>

      <AdminPage />
    </div>
  );
}

export default App;
