import "./App.css";
import React, { useState, createContext } from "react";
import { getUser, logOut } from "./utilities/user-service";
// import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/VerifiedPortal/HomePage";

type GlobalState = {
  orgId?: string;
};
export const StateContext = createContext<{
  global: GlobalState;
  setGlobal: React.Dispatch<React.SetStateAction<GlobalState>> | undefined;
}>({ global: {}, setGlobal: undefined });

function App() {
  const [user, setUser]: [
    null,
    (a: { name: string; email: string } | null) => void
  ] = useState(getUser());

  // Create App state storage and pass to context
  const [global, setGlobal] = useState({} as GlobalState);
  const globalstate = { global: global, setGlobal: setGlobal };

  return (
    <StateContext.Provider value={globalstate}>
      <div className="bg-gradient-to-b from-emerald-500 to-emerald-800 h-full w-full">
        {user ? <HomePage /> : <AuthPage setUser={setUser}></AuthPage>}
      </div>
    </StateContext.Provider>
  );
}

export default App;
