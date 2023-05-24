"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const warehouse_1 = __importDefault(require("../../controllers/api/warehouse"));
const protectedRoute = require("../../config/ensureLoggedIn.js");
// Route /api/warehouse
router.use(protectedRoute);
router.post("/", warehouse_1.default.createWarehouse);
router.get("/:warehouseId", warehouse_1.default.getWarehouse);
router.put("/:warehouseId", warehouse_1.default.editItem);
router.post("/:warehouseId", warehouse_1.default.addItem);
router.delete("/:warehouseId", warehouse_1.default.removeItem);
module.exports = router;
