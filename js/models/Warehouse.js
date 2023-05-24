"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Item_1 = __importDefault(require("./Item"));
const warehouseSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "ownerType",
        required: true,
    },
    ownerType: {
        type: String,
        required: true,
        enum: ["User", "Organization"],
    },
    storage: [Item_1.default],
});
exports.default = (0, mongoose_1.model)("Warehouse", warehouseSchema);
