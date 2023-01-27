const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                nickname: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    unique: true,
                },
                id: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                pw: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                money: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Uesr", // 모델 이름을 설정, 노드 프로젝트에서 사용
                tableName: "uesr",
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