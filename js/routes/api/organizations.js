"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const organization_1 = __importDefault(require("../../controllers/api/organization"));
const protectedRoute = require("../../config/ensureLoggedIn.js");
// Route /api/orgs
router.use(protectedRoute);
router.get("/:orgId/", organization_1.default.getOrgData);
// router.get("/:orgId/getMembers", organizationCtrl.getMembers);
// router.get("/:orgId/getWarehouses", organizationCtrl.getOwnedWarehouses);
router.post("/:orgId/addMember/", organization_1.default.addMember);
router.put("/:orgId/changeOwner/", organization_1.default.changeOwner);
router.post("/", organization_1.default.newOrganization);
module.exports = router;
