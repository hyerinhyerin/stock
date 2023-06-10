const Sequelize = require("sequelize");

// 닉네임, 아이디, 비밀번호, 이메일, snsId, 돈
module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        id: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        pw: {
          type: Sequelize.STRING(100),
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        money: {
          type: Sequelize.INTEGER(),
          allowNull: false,
          defaultValue: 1000000,
        },
        snsId: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        provider: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        img: {
          type: Sequelize.INTEGER()
        }
      },
      {
        sequelize,
        timestamps: false, // createdAt와 updatedAt 컬럼 생성, 데이터가 생성 수정되는 시간을 나타내는 옵션
        underscored: false, // 시퀄라이즈는 기본적을 테이블명 컬럼명 캐멀케이스로 만듬, 이 옵션 true면 이름을 스네이크 형식으로 바꿔줌
        modelName: "User", // 모델 이름 설정
        tableName: "User",
        paranoid: false, // deleteAt라는 컬럼 추가되는 옵션 데이터 삭제하라는 쿼리 들어왔을 때 데이터 삭제 안하고 삭제되는 시점을 등록
        charset: "utf8", // 한글을 입력하기 위한 설정
        collate: "utf8_general_ci", // 한글을 입력하기 위한 설정
      }
    );
  }

  //   static associate(db) {
  // User가 다른 모델과의 관계를 정의하는게 필요해지면 씀
  //   }

  //   User.hasMany(Post);
  // Post.belongsTo(User);
};
