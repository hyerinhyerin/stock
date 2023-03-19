const express = require("express");
const router = express.Router();
const sequelize = require('../models').sequelize;
const Sequelize = require("sequelize");

var se_nickname = "";
var se_gameDB = "";
router.get('/', async function (req, res, next) {
    try {
        // const session = req.session;

        // session.nickname = "ovo";
        // session.gameDB = "1";

        // se_nickname = session.nickname;
        // se_gameDB = session.gameDB;

        //createTable();

        res.send("startGame");

    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

const createTable = async () => { // 테이블 생성
    var i = 1;

    sequelize.define('GameTable', {
        nickname: { type: Sequelize.STRING(45), allowNull: false, primaryKey: true },
        money: { type: Sequelize.INTEGER, allowNull: false },
        userStock: { type: Sequelize.JSON },
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
    await createCompanyTable(i);
    await insertUser(i);
    //await i++;
}

const deleteTable = async (i) => { // 테이블 삭제
    var query = 'drop table gametable' + i + '';
    var query2 = 'drop table gamestock' + i + '';
    await sequelize.query(query);
    await sequelize.query(query2);
}

const createCompanyTable = async (i) => { // 주식 테이블 복사
    const query = 'create table gamestock' + i + ' as select * from gamecompany ';
    await sequelize.query(query);
}

const insertUser = async (i) => { // 테이블에 user 정보 넣기
    await sequelize.query('insert into gametable' + i + '(nickname, money, created_at) values (?, ?, NOW())', [se_nickname, se_gameDB]);
}




module.exports = router;