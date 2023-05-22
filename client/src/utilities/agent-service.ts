import api from "./api-service";
import { IUser } from "../../../models/User";

export const User = {
  newUser: (data: IUser) => {
    return api.post("/api/users").body(data);
  },
  // Delete User
  login: (data: { email: string; password: string }) => {
    return api.post("/api/users/login").body(data);
  },
  getOrg: () => {
    return api.get("/api/users/orgs").auth();
  },
};

// import { IOrganization } from "../../../models/Organization";
export const Org = {
  newOrg: (orgName: string) => {
    return api.post("/api/orgs/").body({ orgName: orgName }).auth();
  },
  addMember: (orgId: string, UserID: string) => {
    return api.post(`/api/orgs/${orgId}/addMember`).body({ id: UserID }).auth();
  },
  changeOwner: (orgId: string, UserID: string) => {
    return api.put(`/api/orgs/${orgId}/changeOwner`).body({ id: UserID });
  },
  getMembers: (orgId: string) => {
    return api.get(`/api/orgs/${orgId}/getMembers`).auth();
  },
  // Delete organziation
};
