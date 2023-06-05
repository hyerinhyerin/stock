const Sequelize = require("sequelize");

module.exports = class UserFindPw extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                    unique: true
                },
                email: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                code: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                    primaryKey: true,
                    unique: true
                },
                createdAt: {
                    type: Sequelize.DATE,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: "UserFindPw", // 모델 이름을 설정, 노드 프로젝트에서 사용
                tableName: "user_findpw",
                paranoid: true,
                charset: "utf8", //한글을 입력하기 위한 설정
                collate: "utf8_general_ci", //한글을 입력하기 위한 설정
            }
        );
    }
    // static associate(db) {
    //     db.Comment.belongsTo(db., { foreignKey: 'commenter', targetKey: 'id' });
    // }
}