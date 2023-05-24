"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Organization_1 = __importDefault(require("../../models/Organization"));
const User_1 = __importDefault(require("../../models/User"));
const Warehouse_1 = __importDefault(require("../../models/Warehouse"));
const createWarehouse = async (req, res) => {
    try {
        // If owner of warehouse will be owner set to [user] else to [body._id]
        const ownerId = req.user._id === req.body._id ? req.user._id : req.body._id;
        // If not [user] consider a [organization]
        const ownerType = req.user._id === req.body._id ? "User" : "Organization";
        if (ownerType === "Organization") {
            const member = await Organization_1.default.find({
                _id: req.body._id,
                owner: req.user._id,
            });
            // If [user] does not own [organization] deny or [ID] is not a [organization]
            // does not verify type of ObjectID
            if (member.length === 0)
                throw new Error("Permission Denied");
        }
        // Create [Warehouse]
        const warehouse = await Warehouse_1.default.create({
            owner: ownerId,
            ownerType: ownerType,
            name: req.body.name,
            contents: [],
        });
        // Add [Warehouse] to Owner[User/Organization]
        if (ownerType === "User") {
            await User_1.default.findByIdAndUpdate(req.user._id, {
                $addToSet: { warehouseList: warehouse._id },
            });
        }
        else {
            await Organization_1.default.findByIdAndUpdate(req.body._id, {
                $addToSet: { warehouseList: warehouse._id },
            });
        }
        res.status(200).json(warehouse);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getWarehouse = async (req, res) => {
    try {
        // Verify access
        const warehouse = await Warehouse_1.default.findById(req.params.warehouseId);
        if (warehouse === null)
            throw new Error("Warehouse Not Found");
        const userData = await User_1.default.findById(req.user._id);
        if (userData === null)
            throw new Error("User Not Found");
        // Check if warehouse owner is [User] or is a [Organization] under user
        if (warehouse.owner.toString() === req.user._id?.toString() ||
            (await User_1.default.findOne({
                _id: req.user._id,
                organizationList: warehouse.owner,
            }))) {
            res.status(200).json({ warehouse });
        }
        else {
            throw new Error("Access Denied");
        }
        // if (
        //   req.body._id === req.user._id ||
        //   userData?.organizationList?.find((e) => {
        //     return e.toString() === warehouse.owner.toString();
        //   })
        // ) {
        //   res.status(200).json({ data: warehouse });
        // } else {
        //   throw new Error("Access Denied");
        // }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const addItem = async (req, res) => {
    try {
        // Verify access
        const warehouse = await Warehouse_1.default.findById(req.params.warehouseId);
        if (warehouse === null)
            throw new Error("Warehouse Not Found");
        const userData = await User_1.default.findById(req.user._id);
        if (userData === null)
            throw new Error("User Not Found");
        // Check if warehouse owner is [User] or is a [Organization] under user
        if (warehouse.owner.toString() === req.user._id?.toString() ||
            (await User_1.default.findOne({
                _id: req.user._id,
                organizationList: warehouse.owner,
            }))) {
            const storage = warehouse.storage;
            // If item storage increment otherwise push
            const item = storage.find((item) => item.name === req.body.name);
            if (item) {
                item.amount += +req.body.amount;
            }
            else {
                storage.push(req.body);
            }
            await warehouse.save();
            res.status(200).send({ message: "Item Added" });
        }
        else {
            throw new Error("Access Denied");
        }
        // if (
        //   req.body._id === req.user._id ||
        //   userData?.organizationList?.find((e) => {
        //     return e.toString() === warehouse.owner.toString();
        //   })
        // ) {
        //   res.status(200).json({ data: warehouse });
        // } else {
        //   throw new Error("Access Denied");
        // }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const removeItem = async (req, res) => {
    try {
        // Verify access
        const warehouse = await Warehouse_1.default.findById(req.params.warehouseId);
        if (warehouse === null)
            throw new Error("Warehouse Not Found");
        const userData = await User_1.default.findById(req.user._id);
        if (userData === null)
            throw new Error("User Not Found");
        // Check if warehouse owner is [User] or is a [Organization] under user
        if (warehouse.owner.toString() === req.user._id?.toString() ||
            (await User_1.default.findOne({
                _id: req.user._id,
                organizationList: warehouse.owner,
            }))) {
            warehouse.storage.pull(req.body._id);
            await warehouse.save();
            res.status(200).send({ message: "Item Removed" });
        }
        else {
            throw new Error("Access Denied");
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const editItem = async (req, res) => {
    try {
        console.log(req.body);
        // Verify access
        const warehouse = await Warehouse_1.default.findById(req.params.warehouseId);
        if (warehouse === null)
            throw new Error("Warehouse Not Found");
        const userData = await User_1.default.findById(req.user._id);
        if (userData === null)
            throw new Error("User Not Found");
        // Check if warehouse owner is [User] or is a [Organization] under user
        if (warehouse.owner.toString() === req.user._id?.toString() ||
            (await User_1.default.findOne({
                _id: req.user._id,
                organizationList: warehouse.owner,
            }))) {
            warehouse.storage.id(req.body._id)?.set(req.body);
            await warehouse.save();
            res.status(200).send({ message: "Item Editted" });
        }
        else {
            throw new Error("Access Denied");
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.default = { createWarehouse, getWarehouse, addItem, removeItem, editItem };
