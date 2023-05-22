import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { User } from "../../utilities/agent-service";

export default function HomePage() {
  const [orgs, setOrgs] = useState<{ name: string; _id: string }[]>([]);
  const getUserOrgs = async () => {
    const orgs = await User.getOrg().send();
    setOrgs(orgs);
    // console.log("Orgs", orgs);
  };
  useEffect(() => {
    getUserOrgs();
  }, []);
  return (
    <div className="flex flex-row">
      <NavBar />
      <Routes>
        <Route path="/dashboard" />
        <Route path="/organization" />
        <Route path="/warehouse" />
      </Routes>
      <ul className="">
        {orgs?.map((e) => {
          return <li className="bg-teal-300 h-16 m-2 p-2">{e.name}</li>;
        })}
      </ul>
    </div>
  );
}
