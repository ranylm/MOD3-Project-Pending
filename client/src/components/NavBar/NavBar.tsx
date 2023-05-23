import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../../utilities/agent-service";
import { StateContext } from "../../App";
import { getUser, logOut } from "../../utilities/user-service";
import { useNavigate } from "react-router-dom";

type Props = {
  setUser: (a) => void;
};

export default function NavBar({ setUser }: Props) {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState<{ name: string; _id: string }[]>([]);

  const context = useContext(StateContext);

  const getUserOrgs = async () => {
    const orgs = await User.getOrg().send();
    setOrgs(orgs);
  };

  function logout() {
    logOut();
    setUser(null);
    navigate("/");
  }
  useEffect(() => {
    getUserOrgs();
  }, [context?.global?.orgId]);

  return (
    <nav className="shadow-xl bg-gradient-to-b from-slate-700 to-neutral-900 border border-gray-500 rounded-lg flex flex-col w-56 min-h-[50vh] py-2 m-8 px-6">
      <span className="text-emerald-400 my-2 text-xl font-Inter tracking-wider">
        {" "}
        {getUser().name}
      </span>
      <span
        className="text-emerald-400 my-2 text-xl font-Inter tracking-wider"
        onClick={logout}
      >
        Log Out
      </span>
      <Link
        to="/"
        className="text-emerald-400 my-2 text-xl font-Inter tracking-wider"
      >
        Home
      </Link>
      <Link
        to="/organization"
        className=" my-2 text-xl font-Inter tracking-wider text-emerald-400"
      >
        Organizations
      </Link>
      {orgs?.map?.((e) => {
        return (
          <Link
            onClick={() => context?.setGlobal?.({ orgId: e._id })}
            to={`organization/`}
            className="text-emerald-400 my-1 mx-3 text-base font-thin font-Inter  tracking-widest"
          >
            {e.name}
          </Link>
        );
      })}
    </nav>
  );
}
