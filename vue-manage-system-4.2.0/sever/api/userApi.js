// 测试用 api 实例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败',
        });
    } else {
        res.json(ret);
    }
};

router.get('/getCompany', (req, res) => {
    let sql = $sql.company.get;
    let params = req.query;
    console.log(params);
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/searchCompany', (req, res) => {
    let sql = $sql.company.search;
    let params = req.body;
    console.log(params);

    conn.query(sql,[params.name], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addCompany', (req, res) => {
    let sql = $sql.company.add;
    let params = req.body;
    console.log(params);

    conn.query(sql,[params.time_zz,params.qqname,params.sjh,params.yx,params.qyyx,params.dlr,params.lxfs,params.qqdq,params.tag], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/getUser', (req, res) => {
    let sql = $sql.user.get;
    let params = req.body;
    console.log(params);

    conn.query(sql,[params.user], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/getRank', (req, res) => {
    let sql = $sql.rank.get;
    let params = req.body;
    console.log(params);

    conn.query(sql,[params.qqname], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

module.exports = router;
