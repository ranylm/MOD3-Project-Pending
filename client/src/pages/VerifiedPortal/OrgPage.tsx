import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../App";
import AddMemberForm from "../../components/OrgPage/AddMemberForm";
import CreateOwnWarehouse from "../../components/Dashboard/CreateOwnWarehouse";
import { Org } from "../../utilities/agent-service";
import { getUser } from "../../utilities/user-service";
import { Link } from "react-router-dom";

export default function OrgPage() {
  const { global } = useContext(StateContext);

  const [members, setMembers] =
    useState<{ _id: string; name: string; email: string }[]>();
  const [warehouses, setWarehouses] =
    useState<{ _id: string; name: string; email: string }[]>();

  const [owner, setOwner] = useState("");

  useEffect(() => {
    const fetchOrgData = async () => {
      if (global?.orgId === undefined) return;
      const data = await Org.getOrgData(global?.orgId).send();
      console.log("Test", data);
      setOwner(data.owner);
      setMembers(data.members);
      setWarehouses(data.warehouses);
    };
    fetchOrgData();
  }, [global.orgId]);

  return (
    <div>
      <h1>Organization</h1>
      <AddMemberForm />
      {/* if not owner cannot add warehouse */}
      {owner == getUser()._id && <CreateOwnWarehouse type="organization" />}
      {members?.map?.((member) => {
        return (
          <p className="text-teal-300 capitalize shadow-lg rounded-lg flex flex-col bg-teal-800 m-2 p-2 min-w-[15rem] border border-teal-500">
            {member.name}
          </p>
        );
      })}
      <h1>Warehouses</h1>
      {warehouses?.map?.((warehouse) => {
        return (
          <Link to={`/warehouse/${warehouse._id}`}>
            <p className="text-teal-300 capitalize shadow-lg rounded-lg flex flex-col bg-teal-800 m-2 p-2 min-w-[15rem] border border-teal-500">
              {warehouse.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
