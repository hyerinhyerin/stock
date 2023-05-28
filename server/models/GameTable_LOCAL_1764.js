const Sequelize = require("sequelize");

module.exports = class Company extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                usernickname: {
                    type: Sequelize.STRING(45),
                    primaryKey: true,
                    allowNull: false,
                },
                money: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                havestock: {
                    type: Sequelize.JSON,
                },
                created_at: {
                    type: Sequelize.DATE,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "GameTable", // 모델 이름을 설정, 노드 프로젝트에서 사용
                tableName: "gametable",
                paranoid: false,
                charset: "utf8", //한글을 입력하기 위한 설정
                collate: "utf8_general_ci", //한글을 입력하기 위한 설정
            }
        );
    }
    // static associate(db) {
    //     db.Comment.belongsTo(db., { foreignKey: 'commenter', targetKey: 'id' });
    // }
}