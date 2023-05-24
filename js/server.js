"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Enviroment Variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path = require("path");
// Connect to Databases
require("./config/database");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
const logger = require("morgan");
app.use(logger("dev"));
app.use(express_1.default.json());
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
