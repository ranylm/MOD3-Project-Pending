"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const router = express.Router();
function createJWT(user) {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });
}
const newUser = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        };
        const user = await User_1.default.create(data);
        // console.log(user);
        // const token = createJWT(user);
        res.status(200).json("success");
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
const login = async (req, res) => {
    try {
        // console.log(req?.user);
        // Query our database to find a user with the email provided
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user)
            throw new Error("User not found.");
        // if we found the email, compare password
        // 1st argument from the credentials that the user typed in
        // 2nd argument what's stored in the database
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match)
            throw new Error("Password Invalid");
        // if everything checks out, create token, login!
        res.json(createJWT(user));
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getOrg = async (req, res) => {
    try {
        const orgList = await User_1.default.findById(req.user._id).populate("organizationList", "name owner");
        res.status(200).json(orgList?.organizationList);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};
const getWarehouseList = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id).populate("warehouseList", "name");
        res.status(200).json(user?.warehouseList);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};
exports.default = { newUser, login, getOrg, getWarehouseList };
