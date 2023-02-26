const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')
const crypto = require('../../utils/crypto')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  let { username, password } = req.body
  const isExits = `SELECT * FROM users WHERE \`username\` = '${username}'`
  ctx.query(isExits, function (error, results, fields) {
    if (results.length === 0) {
      return res.send({
        code: 400,
        message: '用户名或密码错误'
      })
    }

    const yourPassword = results[0].password
    const reqPassword = crypto.md5(password)

    const token = jwt.sign({
      username,
      userId: results[0].user_id
    },
      'community', {
      expiresIn: 36000 * 24 * 3
    }
    )
    if (yourPassword === reqPassword) {
      const isOrganizationManager = `SELECT * FROM organization WHERE \`user_id\` = '${results[0].user_id}'`
      ctx.query(isOrganizationManager, function (error, results, fields) {
        return res.send({
          code: 200,
          message: '登录成功！',
          username,
          token,
          organizationManager: results
        })
      })
    } else {
      return res.send({
        code: 400,
        message: '密码错误，请重试'
      })
    }
  })
})

router.post('/adminLogin', async (req, res) => {
  let { username, password, type } = req.body
  const isExits1 = `SELECT * FROM users WHERE \`username\` = '${username}'`
  ctx.query(isExits1, function (error, results1, fields) {
    if (results1.length === 0) {
      return res.send({
        code: 400,
        message: '请先注册用户'
      })
    }
    // 社团管理员
    const yourPassword = (results1[0] || {}).password
    const reqPassword = crypto.md5(password)
    console.log(results1);
    const token = jwt.sign({
      username,
      userId: results1[0].user_id
    },
      'community', {
      expiresIn: 36000 * 24 * 7
    })
    if (yourPassword === reqPassword) {
      const isOrganizationManager = `SELECT * FROM org_info WHERE \`user_id\` = '${results1[0].user_id}'`
      ctx.query(isOrganizationManager, function (error, results, fields) {
        return res.send({
          code: 200,
          message: '登录成功！',
          username,
          token,
          organizationManager: results.length ? results.map(item => item.organization_id).join(',') : ''
        })
      })
    } else {
      return res.send({
        code: 400,
        message: '密码错误，请重试'
      })
    }
  })
  return;

})

module.exports = router