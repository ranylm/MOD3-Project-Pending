import express from "express";
const router = express.Router();
import warehouseCtrl from "../../controllers/api/warehouse";

const protectedRoute = require("../../config/ensureLoggedIn.js");

// Route /api/orgs
router.use(protectedRoute);

router.post("/", warehouseCtrl.createWarehouse);

module.exports = router;
