import { Schema, Types, Document, model } from "mongoose";

export interface IItem {
  _id?: Types.ObjectId;
  name: string;
  amount: number;
  description?: string;
}

const itemSchema = new Schema<IItem>({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true },
  amount: { type: Number, required: true, default: 0 },
  description: { type: String, default: "This is an Item Description" },
});

export default itemSchema;
