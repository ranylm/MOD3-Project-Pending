import { Schema, Types, model } from "mongoose";

export interface IOrganization {
  _id?: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  memberList: Types.Array<Types.ObjectId>;
  warehouseList: Types.Array<Types.ObjectId>;
}

const organizationSchema = new Schema<IOrganization>({
  _id: { type: Types.ObjectId, auto: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  memberList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  warehouseList: [{ type: Schema.Types.ObjectId, ref: "Warehouse" }],
});

export default model("Organization", organizationSchema);
