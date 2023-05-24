import express from "express";
const router = express.Router();
import warehouseCtrl from "../../controllers/api/warehouse";

const protectedRoute = require("../../config/ensureLoggedIn.js");

// Route /api/warehouse
router.use(protectedRoute);

router.post("/", warehouseCtrl.createWarehouse);

router.get("/:warehouseId", warehouseCtrl.getWarehouse);

router.put("/:warehouseId", warehouseCtrl.editItem);

router.post("/:warehouseId", warehouseCtrl.addItem);

router.delete("/:warehouseId", warehouseCtrl.removeItem);

module.exports = router;
