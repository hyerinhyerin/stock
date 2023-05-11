const Sequelize = require("sequelize");

module.exports = class Situation extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                num: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                situation: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
                upcompany: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                downcompany: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                updown: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                downup: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },

            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Situation", // 모델 이름을 설정, 노드 프로젝트에서 사용
                tableName: "situation",
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