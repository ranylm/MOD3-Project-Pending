import { Schema, Types, Document, model } from "mongoose";
import itemSchema, { IItem } from "./Item";

export interface IWarehouse {
  _id?: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;
  ownerType: "User" | "Organization";
  storage: Types.Array<IItem>;
}

const warehouseSchema = new Schema<IWarehouse>({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    refPath: "ownerType",
    required: true,
  },
  ownerType: {
    type: String,
    required: true,
    enum: ["User", "Organization"],
  },
  storage: [itemSchema],
});

export default model("Warehouse", warehouseSchema);
