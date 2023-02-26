const express = require("express");
const router = express.Router();
const ctx = require("../../utils/mysql")

//获取职位类别列表
router.get("/stuposition", async (req, res) => {
  const { limit, page } = req.query
  let sql = `SELECT * FROM stuposition`
  let totalSql = `SELECT * FROM stuposition`
  sql += ` LIMIT ${(page - 1) * limit},${limit} `
  ctx.query(sql, function (error, results, fields) {
    ctx.query(totalSql, function (error1, total = [], fields) {
      return res.send({
        code: 200,
        data: results,
        total: results.length
      })
    })
  })
})
//删除职位类别
router.delete('/stuposition', async (req, res) => {
  const { posi_id } = req.query
  if (posi_id) {
    const sql = `DELETE FROM stuposition WHERE posi_id in (${posi_id})`
    ctx.query(sql, function (error, results, fields) {
      console.log(results, error, fields);
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
// 添加职位类别
router.post("/stuposition", async (req, res) => {
  const { stu_position } = req.body
  if (stu_position) {
    const isExits = `SELECT 1 FROM \`stuposition\` WHERE \`stu_position\` = '${stu_position}'`
    const sql = `INSERT INTO \`stuposition\`(\`stu_position\`) VALUES ('${stu_position}')`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '该职位类别分类已存在'
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
          message: '添加职位类别成功',
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
});
//修改职位类别名称
router.put("/stuposition", async (req, res) => {
  const { stu_position, posi_id } = req.body
  console.log(req.body);
  if (posi_id) {
    const sql = `
        UPDATE \`stuposition\` SET \`stu_position\` = '${stu_position}' WHERE \`posi_id\` = ${posi_id}
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
        message: '修改职位类别成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '职位类别id不存在！'
    })
  }
});

module.exports = router;