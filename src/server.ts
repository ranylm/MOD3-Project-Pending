// Enviroment Variables
import dotenv from "dotenv";
dotenv.config();

const path = require("path");
// Connect to Databases
import "./config/database";

import express from "express";
import { IUser } from "./models/User";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
const logger = require("morgan");
app.use(logger("dev"));
app.use(express.json());

// Routes

app.use(require("./config/checktoken"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/orgs", require("./routes/api/organizations"));
app.use("/api/warehouse", require("./routes/api/warehouses"));

// Catch all Route to Home
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Listen

app.listen(PORT, () => {
  console.log(`connected on ${PORT}`);
});
