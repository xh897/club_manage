const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

// 获取班级分类列表
router.get('/class', async (req, res) => {
  const {data, limit, page} = req.query
    let sql = `SELECT *, class.addtime AS create_time FROM class LEFT JOIN department ON department.department_id = class.faculty LEFT JOIN major ON major.major_id = class.major`
    let totalSql = `SELECT *, class.addtime AS create_time FROM class LEFT JOIN department ON department_id = class.faculty LEFT JOIN major ON major.major_id = class.major`
    if (data) {
        sql += ` WHERE (major.major_name like '%${data}%' OR department.department_name LIKE '%${data}%')`
      }
      sql += ` LIMIT ${(page - 1) * limit},${limit} `
      if (data) {
        totalSql += ` WHERE (major.major_name like '%${data}%' OR department.department_name LIKE '%${data}%')`
      }
      ctx.query(sql, function (error, results, fields) {
        // console.error(error, 'hfsdkfhsjkd')
        ctx.query(totalSql, function (error1, total = [], fields) {
          // console.error(error, error1, 3434)
          return res.send({
            code: 200,
            data: results,
            total: total.length
          })
        })
      })
    })

//删除班级
router.delete('/class', async (req, res) => {
    const { class_id } = req.query
    if (class_id) {
        const sql = `DELETE FROM class WHERE class_id IN (${class_id})`
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
            message: '错误'
        })
    }
})

// 添加班级
router.post('/class', async (req, res) => {
    const { class_name, faculty, major } = req.body
    if (class_name) {
      const isExits = `SELECT 1 FROM \`class\` WHERE \`class_name\` = '${class_name}' and faculty=${faculty} and major=${major}`
      const sql = `INSERT INTO \`class\`(\`class_name\`, \`faculty\`, \`major\`) VALUES ('${class_name}', '${faculty}', '${major}')`
      ctx.query(isExits, function (error, results, fields) {
        if (results.length !== 0) {
          return res.send({
            code: 400,
            message: '该班级分类已存在'
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
            message: '添加班级成功',
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

//修改班级名称
router.put('/class', async (req, res) => {
    const { class_name, class_id, faculty, major } = req.body
    console.log(req.body)
    if (class_id) {
        const sql = `
          UPDATE \`class\` SET \`class_name\` = '${class_name}', \`faculty\` = '${faculty}', \`major\` = '${major}' WHERE \`class_id\` = ${class_id}
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
                message: '修改班级成功',
                data: results[0]
            })
        })
    } else {
        return res.send({
            code: 400,
            message: '班级id不存在！'
        })
    }
})

module.exports = router