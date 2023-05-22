import { Schema, Types, Document, model } from "mongoose";

export interface IWarehouse {
  _id?: Types.ObjectId;
  owner: Types.ObjectId;
  ownerType: "User" | "Organization";
}

const warehouseSchema = new Schema<IWarehouse>({
  _id: { type: Types.ObjectId, auto: true },
  owner: { type: Schema.Types.ObjectId, refPath: "ownerType", required: true },
  ownerType: {
    type: String,
    required: true,
    enum: ["User", "Organization"],
  },
});

export default model("Warehouse", warehouseSchema);
