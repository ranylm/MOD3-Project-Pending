import { RequestHandler } from "express";
import Organization, { IOrganization } from "../../models/Organization";
import User from "../../models/User";
import Warehouse, { IWarehouse } from "../../models/Warehouse";

const createWarehouse: RequestHandler = async (req, res) => {
  try {
    // If owner of warehouse will be owner set to [user] else to [body._id]
    const ownerId = req.user._id === req.body._id ? req.user._id : req.body._id;
    // If not [user] consider a [organization]
    const ownerType = req.user._id === req.body._id ? "User" : "Organization";
    if (ownerType === "Organization") {
      const member = await Organization.find<IOrganization>({
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

    res.status(200).json({ message: "Warehouse Created" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { createWarehouse };
