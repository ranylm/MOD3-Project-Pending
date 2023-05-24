import { RequestHandler } from "express";
import { IItem } from "../../models/Item";
import Organization, { IOrganization } from "../../models/Organization";
import User from "../../models/User";
import Warehouse, { IWarehouse } from "../../models/Warehouse";
import user from "./user";

const createWarehouse: RequestHandler = async (req, res) => {
  try {
    // If owner of warehouse will be owner set to [user] else to [body._id]
    const ownerId = req.user._id === req.body._id ? req.user._id : req.body._id;
    // If not [user] consider a [organization]
    const ownerType = req.user._id === req.body._id ? "User" : "Organization";
    if (ownerType === "Organization") {
      const member = await Organization.find({
        _id: req.body._id,
        owner: req.user._id,
      });
      // If [user] does not own [organization] deny or [ID] is not a [organization]
      // does not verify type of ObjectID
      if (member.length === 0) throw new Error("Permission Denied");
    }

    // Create [Warehouse]
    const warehouse = await Warehouse.create({
      owner: ownerId,
      ownerType: ownerType,
      name: req.body.name,
      contents: [],
    });

    // Add [Warehouse] to Owner[User/Organization]
    if (ownerType === "User") {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { warehouseList: warehouse._id },
      });
    } else {
      await Organization.findByIdAndUpdate(req.body._id, {
        $addToSet: { warehouseList: warehouse._id },
      });
    }

    res.status(200).json(warehouse);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getWarehouse: RequestHandler = async (req, res) => {
  try {
    // Verify access
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (warehouse === null) throw new Error("Warehouse Not Found");
    const userData = await User.findById(req.user._id);
    if (userData === null) throw new Error("User Not Found");
    // Check if warehouse owner is [User] or is a [Organization] under user
    if (
      warehouse.owner.toString() === req.user._id?.toString() ||
      (await User.findOne({
        _id: req.user._id,
        organizationList: warehouse.owner,
      }))
    ) {
      res.status(200).json({ warehouse });
    } else {
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const addItem: RequestHandler = async (req, res) => {
  try {
    // Verify access
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (warehouse === null) throw new Error("Warehouse Not Found");
    const userData = await User.findById(req.user._id);
    if (userData === null) throw new Error("User Not Found");
    // Check if warehouse owner is [User] or is a [Organization] under user
    if (
      warehouse.owner.toString() === req.user._id?.toString() ||
      (await User.findOne({
        _id: req.user._id,
        organizationList: warehouse.owner,
      }))
    ) {
      const storage = warehouse.storage;
      // If item storage increment otherwise push
      const item = storage.find((item) => item.name === req.body.name);
      if (item) {
        item.amount += +req.body.amount;
      } else {
        storage.push(req.body);
      }
      await warehouse.save();

      res.status(200).send({ message: "Item Added" });
    } else {
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const removeItem: RequestHandler = async (req, res) => {
  try {
    // Verify access
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (warehouse === null) throw new Error("Warehouse Not Found");
    const userData = await User.findById(req.user._id);
    if (userData === null) throw new Error("User Not Found");
    // Check if warehouse owner is [User] or is a [Organization] under user
    if (
      warehouse.owner.toString() === req.user._id?.toString() ||
      (await User.findOne({
        _id: req.user._id,
        organizationList: warehouse.owner,
      }))
    ) {
      warehouse.storage.pull(req.body._id);
      await warehouse.save();
      res.status(200).send({ message: "Item Removed" });
    } else {
      throw new Error("Access Denied");
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const editItem: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    // Verify access
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (warehouse === null) throw new Error("Warehouse Not Found");
    const userData = await User.findById(req.user._id);
    if (userData === null) throw new Error("User Not Found");
    // Check if warehouse owner is [User] or is a [Organization] under user
    if (
      warehouse.owner.toString() === req.user._id?.toString() ||
      (await User.findOne({
        _id: req.user._id,
        organizationList: warehouse.owner,
      }))
    ) {
      warehouse.storage.id(req.body._id)?.set(req.body);
      await warehouse.save();
      res.status(200).send({ message: "Item Editted" });
    } else {
      throw new Error("Access Denied");
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { createWarehouse, getWarehouse, addItem, removeItem, editItem };
