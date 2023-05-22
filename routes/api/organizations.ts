import express from "express";
const router = express.Router();
import organizationCtrl from "../../controllers/api/organization";

const protectedRoute = require("../../config/ensureLoggedIn.js");

// Route /api/orgs
router.use(protectedRoute);

router.get("/:orgId/getMembers", organizationCtrl.getMembers);

router.post("/:orgId/addMember/", organizationCtrl.addMember);

router.put("/:orgId/changeOwner/", organizationCtrl.changeOwner);

router.post("/", organizationCtrl.newOrganization);

module.exports = router;
