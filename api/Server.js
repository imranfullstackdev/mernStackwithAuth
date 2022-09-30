const express = require("express");
const app = express();
const port = 8000;
const dotenv = require("dotenv").config();
const user = require("./userschema/userSchema");
const cors=require('cors')
const jwt = require("jsonwebtoken");
const parser=require('cookie-parser')
app.use(cors())
app.use(parser())
// app.use(express.json())
require("./db/conn");
const mongoose = require("mongoose");
const db = process.env.DATABASE;

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })
require("./router/auth");
app.use(express.json());
app.use("/", require("./router/auth"));

app.listen(port, () => console.log(`app is listening on port ${port}!`));
