import api from "./api-service";
import { IUser } from "../../../models/User";
import { IItem } from "../../../models/Item";

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
  getWareHouseList: () => {
    return api.get("/api/users/warehouses").auth();
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
  getOrgData: (orgId: string) => {
    return api.get(`/api/orgs/${orgId}/`).auth();
  },
  // getMembers: (orgId: string) => {
  //   return api.get(`/api/orgs/${orgId}/getMembers`).auth();
  // },
  // getWarehouses: (orgId: string) => {
  //   return api.get(`/api/orgs/${orgId}/getWarehouses`).auth();
  // },
  // Delete organziation
};

export const Warehouse = {
  // pass self id to make for self, organization id for organization
  newWarehouse: (id: string, name: string) => {
    return api.post(`/api/warehouse`).body({ _id: id, name: name }).auth();
  },
  getWarehouse: (id: string) => {
    return api.get(`/api/warehouse/${id}`).auth();
  },
  addItem: (id: string, item: IItem) => {
    if (item.description === "") delete item.description;
    return api.post(`/api/warehouse/${id}`).body(item).auth();
  },
  editItem: (warehouseId: string, item: IItem) => {
    if (item.description === "") delete item.description;
    return api.put(`/api/warehouse/${warehouseId}`).body(item).auth();
  },
};
