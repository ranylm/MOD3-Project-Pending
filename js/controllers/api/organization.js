"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Organization_1 = __importDefault(require("../../models/Organization"));
const User_1 = __importDefault(require("../../models/User"));
const jwt = require("jsonwebtoken");
// const router = express.Router();
// function createJWT(user: IUser) {
//   return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });
// }
const newOrganization = async (req, res) => {
    try {
        const org = await Organization_1.default.create({
            owner: req.user._id,
            name: req.body.orgName,
            memberList: [req.user._id],
            warehouseList: [],
        });
        await User_1.default.findByIdAndUpdate(req.user._id, {
            $push: { organizationList: org._id },
        });
        console.log(org);
        res.status(200).json({ id: org._id });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
const getOrgData = async (req, res) => {
    try {
        console.log("getting members from", req.params.orgId);
        const org = await Organization_1.default.findById(req.params.orgId)
            .populate("memberList")
            .populate("warehouseList", "name");
        console.log(org);
        res
            .status(200)
            .json({
            members: org?.memberList,
            owner: org?.owner,
            warehouses: org?.warehouseList,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// const getMembers: RequestHandler = async (req, res) => {
//   try {
//     console.log("getting members from", req.params.orgId);
//     const org = await Organization.findById(req.params.orgId)
//       .populate("memberList")
//       .populate("warehouseList");
//     console.log(org);
//     res.status(200).json({ owner: org?.owner, memberList: org?.memberList });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };
const changeOwner = async (req, res) => {
    try {
        const org = await Organization_1.default.findById(req.params.orgId);
        if (!org)
            throw new Error("Organization Not Found");
        // If [user] is owner and promoted [id] member of Org, change [owner]
        if (req.user._id?.toString() === org.owner.toString() &&
            org.memberList.find((e) => e.toString() === req.body.id.toString())) {
            await Organization_1.default.findByIdAndUpdate(req.params.orgId, {
                $set: { owner: req.body.id },
            });
        }
        else {
            throw new Error("User is not a member");
        }
        res.status(200).send("Owner changed");
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
const addMember = async (req, res) => {
    try {
        const org = await Organization_1.default.findById(req.params.orgId);
        if (!org)
            throw new Error("Organization Not Found");
        console.log(req.user._id?.toString() === org.owner.toString());
        // Check if user is owner before adding new member
        if (req.user._id?.toString() === org.owner.toString()) {
            await Organization_1.default.findByIdAndUpdate(req.params.orgId, {
                $addToSet: { memberList: req.body.id },
            });
            await User_1.default.findByIdAndUpdate(req.body.id, {
                $addToSet: { organizationList: req.params.orgId },
            });
        }
        else {
            throw new Error("You do not have permission.");
        }
        res.status(200).json({ id: req.body.id });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
// const getOwnedWarehouses: RequestHandler = async (req, res) => {
//   try {
//     const warehouse = await Organization.findById(req.body.orgId).populate(
//       "warehouseList",
//       "name"
//     );
//     res.status(200).json({ warehouse: warehouse });
//   } catch (error: any) {
//     res.status(400).json({ error: error });
//   }
// };
exports.default = {
    newOrganization,
    changeOwner,
    addMember,
    getOrgData,
    // getMembers,
    // getOwnedWarehouses,
};
