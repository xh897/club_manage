const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

// 获取专业列表
router.get('/major', async (req, res) => {
  const { data } = req.query
  let sql = `SELECT *, major.create_time FROM major LEFT JOIN department ON department.department_id = major.faculty`
  // let totalSql = `SELECT count(*) total FROM major LEFT JOIN department ON  department.department_id = major.faculty`
  if (data) {
    sql += ` WHERE (major.major_name LIKE '%${data}%') OR (department.department_name like '%${data}%')`
  }
  ctx.query(sql, function (error, results, fields) {
    // ctx.query(totalSql, function (error, results1, fields) {
      return res.send({
        code: 200,
        data: results,
        total: results.length
      })
    })
  // })
})


// 删除专业
router.delete('/major', async (req, res) => {
  const { major_id } = req.query
  if (major_id) {
    const sql = `DELETE FROM major WHERE major_id = ${major_id}`
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 400,
          message: '删除失败'
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
      message: '发生错误'
    })
  }
})

// 添加专业
router.post('/major', async (req, res) => {
  const { major_name, faculty } = req.body
  if (major_name) {
    const isExits = `SELECT 1 FROM major WHERE major_name = '${major_name}'`
    const sql = `INSERT INTO \`major\` (\`major_name\`, \`faculty\`) VALUES ('${major_name}', '${faculty}')`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '该专业已存在'
        })
      }
    })
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '添加专业成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '失败'
    })
  }
})

//修改专业名称
router.put('/major', async (req, res) => {
  const { major_name, major_id, faculty } = req.body
  console.log(req.body)
  if (major_id) {
    const sql = `UPDATE \`major\` SET \`major_name\` = '${major_name}', \`faculty\` = '${faculty}' WHERE \`major_id\` = ${major_id}`
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '修改专业成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '专业不存在！'
    })
  }
})

module.exports = router