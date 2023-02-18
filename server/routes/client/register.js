const express = require("express");
const router = express.Router();
const ctx = require('../../utils/mysql')
const crypto = require("../../utils/crypto");

router.post("/register", async (req, res) => {
  let { username, password, phone, nickname, stuId } = req.body
  const isExits = `SELECT * FROM users WHERE stuId='${stuId}'`
  password = crypto.md5(password)
  const sql = `INSERT INTO users(\`username\`,\`password\`,\`phone\`,\`nickname\`,\`stuId\`)VALUES('${username.trim()}','${password}','${phone}','${nickname}','${stuId}')`
  ctx.query(isExits, function (error, results, fields) {
    if (results.length !== 0) {
      return res.send({
        code: 400,
        message: '该学号已存在'
      })
    }

    ctx.query(sql, function (error, results, fields) {
      if (error) throw error;
      return res.send({
        code: 200,
        message: '注册成功,请登录！'
      })
    })
  })
})

module.exports = router;