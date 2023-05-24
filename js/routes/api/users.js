"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../../controllers/api/user"));
const protectedRoute = require("../../config/ensureLoggedIn.js");
// Route /api/users
router.get("/orgs", protectedRoute, user_1.default.getOrg);
router.get("/warehouses", protectedRoute, user_1.default.getWarehouseList);
router.post("/login", user_1.default.login);
router.post("/", user_1.default.newUser);
module.exports = router;
