// import React from "react";
import { Org, User } from "../utilities/agent-service";

export default function AdminPage() {
  return (
    <div>
      <h1>AdminPage</h1>
      <h2>User</h2>
      <button
        onClick={async () => {
          console.log(
            await User.newUser({
              email: "qwe2@qwe.com",
              password: "qwe",
              name: "qwe",
            }).send()
          );
        }}
      >
        Create User
      </button>
      <button
        onClick={async () => {
          console.log(
            await User.login({ email: "qwe@qwe.com", password: "qwe" }).send()
          );
        }}
      >
        Login
      </button>
      <h2>Organizations</h2>
      <button
        onClick={async () => {
          console.log(await User.getOrg().send());
        }}
      >
        Get Orgs
      </button>
      <button>Add Member</button>
      <button>Change Owner</button>
    </div>
  );
}
