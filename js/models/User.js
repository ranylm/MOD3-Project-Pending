"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Organization",
    },
    warehouseList: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Warehouse",
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.organizationList;
            return ret;
        },
    },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});
exports.default = (0, mongoose_1.model)("User", userSchema);
