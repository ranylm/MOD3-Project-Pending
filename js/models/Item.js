"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, default: 0 },
    description: { type: String, default: "This is an Item Description" },
});
exports.default = itemSchema;
