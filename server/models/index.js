const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./User");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

// User.associate(db); // 관계 정의가 필요하면 사용

module.exports = db;
