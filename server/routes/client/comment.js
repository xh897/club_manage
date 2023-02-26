const e = require('express')
const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

//根据id获取评论列表
router.get('/comment', async (req, res) => {
  const { sid } = req.query
  const sql = `SELECT * FROM comment WHERE sid  = ${sid} ORDER BY create_time DESC`
  if (sid) {
    ctx.query(sql, function (error, results, fields) {
      return res.send({
        code: 200,
        data: results
      })
    })
  } else {
    return res.send({
      code: 400,
      message: 'id'
    })
  }
})

// 获取所有评论
router.get('/comment_list', async (req, res) => {
  const { page, limit, data } = req.query
  let sql = `SELECT *, comment.create_time FROM comment left join users on users.user_id = comment.user_id `
  if (data) {
    sql += ` where (users.username like '%${data}%' or users.nickname like '%${data}%')`
  }
  sql += ` ORDER BY comment.create_time DESC LIMIT ${(page - 1) *
    limit},${limit} `

  ctx.query(sql, function (error, results, fields) {
    let totalSql = `
            SELECT
            COUNT(*) total
            FROM comment left join users on users.user_id = comment.user_id 
            `
    if (data) {
      totalSql += ` where (users.username like '%${data}%' or users.nickname like '%${data}%')`
    }
    ctx.query(totalSql, function (error, total = [], fields) {
      return res.send({
        code: 200,
        total: (total[0] || {}).total,
        data: results
      })
    })
    // return res.send({
    //   code: 200,
    //   data: results
    // })
  })
  // } else {
  //   return res.send({
  //     code: 400,
  //     message: '广场id'
  //   })
  // }
})
//删除
router.delete('/comment', async (req, res) => {
  const { id } = req.query
  if (id) {
    const sql = `DELETE FROM comment WHERE id in (${id})`
    ctx.query(sql, function (error, results, fields) {
      console.log(results)
      if (!results) {
        return res.send({
          code: 400,
          message: '删除失败！'
        })
      } else {
        return res.send({
          code: 200,
          message: '删除成功！'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '错误'
    })
  }
})

// 删除用户相关申请
router.delete('/deleteByTableAndId', async (req, res) => {
  const { id, table } = req.body
  if (id) {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 400,
          message: '删除失败！'
        })
      } else {
        return res.send({
          code: 200,
          message: '删除成功！'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '错误'
    })
  }
})

// 添加评论
router.post('/comment', async (req, res) => {
  const { avatar, nickname, content, user_id } = req.body
  if (avatar && nickname && content) {
    const sql = `INSERT INTO comment (avatar, nickname, content, user_id) VALUES ('${avatar}','${nickname}','${content}','${user_id}')`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '添加成功'
        })
      } else {
        return res.send({
          code: 400,
          message: '添加错误'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '失败'
    })
  }
})

module.exports = router