const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

//获取学院分类列表
router.get('/department', async (req, res) => {
  let sql = ` SELECT * FROM department `
  const { data } = req.query || {}
  if (data) {
    sql += ` WHERE department_name LIKE '%${data}%' `
  }
  ctx.query(sql, function (error, results, fields) {
        return res.send({
          code: 200,
          data: results,
          total: results.length
        })
  })
})

//删除学院
router.delete('/department', async (req, res) => {
  const { department_id } = req.query
  if (department_id) {
    const sql = `DELETE FROM department WHERE department_id IN (${department_id})`
    ctx.query(sql, function (error, results, fields) {
      console.log(results, error, fields)
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
      message: '发生错误'
    })
  }
})

// 添加学院
router.post('/department', async (req, res) => {
  const { department_name } = req.body
  if (department_name) {
    const isExits = `SELECT 1 FROM \`department\` WHERE \`department_name\` = '${department_name}'`
    const sql = `INSERT INTO \`department\`(\`department_name\`) VALUES ('${department_name}')`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '该学院已存在'
        })
      }
      ctx.query(sql, function (error, results, fields) {
        if (!results) {
          return res.send({
            code: 500,
            message: '服务器错误'
          })
        }
        return res.send({
          code: 200,
          message: '添加学院成功',
          data: results[0]
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '失败'
    })
  }
})
//修改学院名称
router.put('/department', async (req, res) => {
  const { department_name, department_id } = req.body
//   console.log(req.body)
  if (department_id) {
    const sql = `
        UPDATE \`department\` SET \`department_name\` = '${department_name}' WHERE \`department_id\` = ${department_id}
        `
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '修改成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '学院id不存在！'
    })
  }
})

module.exports = router