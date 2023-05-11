const express = require("express");
const router = express.Router();
const sequelize = require('../models').sequelize;
const Sequelize = require("sequelize");

const { QueryTypes } = require("sequelize");

var i = 1;
router.get('/', function (req, res, next) {
    try {
        const session = req.session;

        session.nickname = "ovo";
        session.gameDB = "";

        if (session.gameDB) {
            console.log("초기화 후 시작");
            session.gameDB = "";
            console.log(session);
        } else {
            console.log("게임 시작");
            createTable();
        }

        res.send("startGame");

    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

const createTable = async () => { // 테이블 생성
    sequelize.define('GameTable', {
        nickname: { type: Sequelize.STRING(45), allowNull: false, primaryKey: true },
        money: { type: Sequelize.INTEGER, allowNull: false },
        userStock: { type: Sequelize.TEXT },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defalutValue: Sequelize.NOW,
        }
    }, {
        tableName: 'gametable' + i,
        freezeTableName: true,
        timestamps: false,
    });

    await sequelize.sync();
    await createCompanyTable();
    await insertUser();
    //await i++;
}

const deleteTable = async () => { // 테이블 삭제
    var query = 'drop table gametable' + i + '';
    await sequelize.query(query);
}

const createCompanyTable = async () => { // 주식 테이블 복사
    const query = 'create table game' + i + 'Company as select * from gamecompany ';
    await sequelize.query(query);
}

const insertUser = async () => { // 테이블에 user 정보 넣기
    await sequelize.query('insert into gametable' + i + ' (nickname, money, created_at) values ("oo", 100, NOW())');
}




module.exports = router;