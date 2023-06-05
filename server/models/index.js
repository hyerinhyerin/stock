const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Company = require("./Company");
const User = require("./User");
const Situation = require("./Situation");

const UserFindPw = require("./UserFindPw");
const GameTable = require("./GameTable");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Company = Company;
db.Situation = Situation;
db.UserFindPw = UserFindPw;
db.GameTable = GameTable;

User.init(sequelize);
Company.init(sequelize);
Situation.init(sequelize);
UserFindPw.init(sequelize);
GameTable.init(sequelize);

// User.associate(db);

module.exports = db;
