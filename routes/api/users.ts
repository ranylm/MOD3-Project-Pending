import express from "express";
const router = express.Router();
import userCtrl from "../../controllers/api/user";

const protectedRoute = require("../../config/ensureLoggedIn.js");

// Route /api/users
router.get("/orgs", protectedRoute, userCtrl.getOrg);

router.post("/login", userCtrl.login);

router.post("/", userCtrl.newUser);

module.exports = router;
