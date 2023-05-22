import { RequestHandler, Request, Response } from "express";
import User, { IUser } from "../../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const router = express.Router();

function createJWT(user: IUser) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

const newUser: RequestHandler = async (req, res) => {
  try {
    const data: IUser = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    const user = await User.create(data);
    // console.log(user);
    // const token = createJWT(user);

    res.status(200).json("success");
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    // console.log(req?.user);
    // Query our database to find a user with the email provided
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found.");
    // if we found the email, compare password
    // 1st argument from the credentials that the user typed in
    // 2nd argument what's stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Password Invalid");
    // if everything checks out, create token, login!
    res.json(createJWT(user));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getOrg: RequestHandler = async (req, res) => {
  try {
    const orgList = await User.findById(req.user._id).populate(
      "organizationList",
      "name"
    );
    console.log(orgList);
    res.status(200).json(orgList?.organizationList);
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

export default { newUser, login, getOrg };
