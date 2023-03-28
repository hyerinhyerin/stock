const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Company = require("./Company");
const User = require("./User");
const Situation = require("./Situation");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Company = Company;
db.Situation = Situation;

User.init(sequelize);
Company.init(sequelize);
Situation.init(sequelize);

// User.associate(db); // 관계 정의가 필요하면 사용

module.exports = db;
