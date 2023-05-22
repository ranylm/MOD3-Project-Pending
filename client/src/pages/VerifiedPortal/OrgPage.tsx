import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../App";
import AddMemberForm from "../../components/OrgPage/AddMemberForm";
import { Org } from "../../utilities/agent-service";

export default function OrgPage() {
  const { global } = useContext(StateContext);

  const [orgMembers, setOrgMembers] =
    useState<{ _id: string; name: string; email: string }[]>();

  useEffect(() => {
    const fetchOrgData = async () => {
      if (global?.orgId === undefined) return;
      const data = await Org.getMembers(global?.orgId).send();
      console.log("Test", global?.orgId, data);
      setOrgMembers(data);
    };
    fetchOrgData();
  }, [global.orgId]);

  return (
    <div>
      <h1>Organization</h1>
      <AddMemberForm />
      {orgMembers?.map?.((member) => {
        return <p>{member.name}</p>;
      })}
    </div>
  );
}
