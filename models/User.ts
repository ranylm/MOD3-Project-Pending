import { Schema, model, Types } from "mongoose";

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  organizationList?: Types.Array<Types.ObjectId>;
  warehouseList?: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    organizationList: {
      type: [Schema.Types.ObjectId],
      ref: "Organization",
    },
    warehouseList: {
      type: [Schema.Types.ObjectId],
      ref: "Warehouse",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.organizationList;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (this, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

export default model("User", userSchema);
