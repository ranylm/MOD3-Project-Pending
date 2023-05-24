"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    memberList: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    warehouseList: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Warehouse" }],
});
exports.default = (0, mongoose_1.model)("Organization", organizationSchema);
