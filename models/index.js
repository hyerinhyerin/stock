const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.json')[env];

const User = require("./User");
const Company = require("./Company");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,

);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Company = Company;
User.init(sequelize);
Company.init(sequelize);

// User.associate(db);

module.exports = db;
