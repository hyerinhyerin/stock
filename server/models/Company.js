const Sequelize = require("sequelize");

module.exports = class Company extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        companyname: {
          type: Sequelize.STRING(45),
          allowNull: false,
          primaryKey: true,
        },
        companystock: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        stockprice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        num: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Company", // 모델 이름을 설정, 노드 프로젝트에서 사용
        tableName: "gamecompany",
        paranoid: false,
        charset: "utf8", //한글을 입력하기 위한 설정
        collate: "utf8_general_ci", //한글을 입력하기 위한 설정
      }
    );
  }
  // static associate(db) {
  //     db.Comment.belongsTo(db., { foreignKey: 'commenter', targetKey: 'id' });
  // }
};
