import React, { useEffect, useState, useContext } from "react";
import CreateOrgForm from "../../components/Dashboard/CreateOrgForm";
import { User } from "../../utilities/agent-service";
import { getUser } from "../../utilities/user-service";
import { StateContext } from "../../App";
import { Link } from "react-router-dom";
type Props = {};

export default function Dashboard({}: Props) {
  const [orgs, setOrgs] = useState<
    { name: string; _id: string; owner: string }[]
  >([]);

  const context = useContext(StateContext);

  const user = getUser();

  const getUserOrgs = async () => {
    const orgs = await User.getOrg().send();
    setOrgs(orgs);
    // console.log("Orgs", orgs);
  };

  useEffect(() => {
    getUserOrgs();
  }, []);

  return (
    <div>
      <div>Dashboard</div>
      <CreateOrgForm />
      <ul className="">
        {orgs?.map?.((e) => {
          return (
            <Link
              to="/organization"
              onClick={() => context?.setGlobal?.({ orgId: e._id })}
            >
              <li className="bg-teal-300 h-16 m-2 p-2">
                <div className="flex flex-col">
                  <span>{e.name}</span>
                  {e.owner === user._id ? "Owner" : "Member"}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
