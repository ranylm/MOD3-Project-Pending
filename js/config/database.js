"use strict";
const mongoose = require("mongoose");
console.log("connecting to DB");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("connected", () => {
    console.log(`connected to ${db.name}`);
});
