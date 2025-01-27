const express = require("express");
const path = require("path");
const app = express(),
  bodyParser = require("body-parser");
var CryptoJS = require("crypto-js");
const cors = require("cors");
const mongoose = require("mongoose");
const Context = require("./Models/Context");
port = 3080;

var uri =
  "mongodb+srv://selva:selva@cluster0.v0faz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

// place holder for the data
const users = [];

const apps = [
  {
    name: "HomeLoan",
    host: "http://localhost:3001",
    role: ["DPMT_Read", "DPMT_Write"],
  },
  {
    name: "NetBank",
    host: "http://localhost:3001",
    role: ["DPMT_Read", "DPMT_Write"],
  },
  {
    name: "DashBoard",
    host: "http://localhost:3001",
    role: ["Admin_Read", "Admin_Write"],
  },
];
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../my-app/build")));

app.get("/api/users", (req, res) => {
  console.log("api/users called!");
  res.json(users);
});

app.post("/api/user", (req, res) => {
  const user = req.body.user;
  console.log("Adding user:::::", user);
  users.push(user);
  res.json("user addedd");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-app/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

app.post("/apps", (req, res) => {
  var bytes = CryptoJS.AES.decrypt(
    req.body.ciphertext,
    "SecreyKey_1342523%&##cba"
  );
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  var newArray = apps.filter((app) => {
    return app.role.includes(decryptedData.role);
  });

  res.json(newArray);
});

app.post("/createContext",async (req, res) => {
 try {
    console.log(req.body);
    const newProduct = await new Context(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
});
