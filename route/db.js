const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1016@",
    database: "stockDB",
});

module.exports = db;