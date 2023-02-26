const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

//获取部门类别分类
router.get('/sector_info', async (req, res) => {
  const { page, limit, organization_id } = req.query || {}
  let sql = `SELECT * FROM sector_info where 1 = 1`
  if (organization_id) {
    sql += ` and sector_info.organization_id in (${organization_id}) `
  }
  let sql1 = ` LIMIT ${(page - 1) * limit},${limit} `
  sql += sql1
  const totalSql = `
        SELECT COUNT(*) total FROM sector_info 
        WHERE 
        organization_id='${organization_id}' 
    `
  ctx.query(sql, function (error, results, fields) {

    ctx.query(totalSql, function (error, total, fields) {
      return res.send({
        code: 200,
        message: '获取列表成功！',
        total: total[0].total,
        data: results
      })
    })

  })
})
router.get('/getVipNum', async (req, res) => {
  const { organization_id } = req.query || {}
  let sql = `SELECT count(vip_info.id) as total FROM vip_info where organization_id = '${organization_id}'`

  ctx.query(sql, function (error, results, fields) {

    return res.send({
      code: 200,
      data: results
    })
  })
})


//删除部门类别
router.delete('/sector_info', async (req, res) => {
  const { sec_id } = req.query
  if (sec_id) {
    const sql = `DELETE FROM sector_info WHERE sec_id in (${sec_id})`
    ctx.query(sql, function (error, results, fields) {
      // console.log(results, error, fields)
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

// 添加部门类别
router.post('/sector_info', async (req, res) => {
  const { sector_name, sector_duty, organization_id = 0 } = req.body
  if (sector_name) {
    const isExits = `SELECT 1 FROM \`sector_info\` WHERE \`sector_name\` = '${sector_name}'`
    const sql = `INSERT INTO \`sector_info\`(\`sector_name\`, \`sector_duty\`, \`organization_id\`) VALUES ('${sector_name}', '${sector_duty}', '${organization_id}')`
    ctx.query(isExits, function (error, results, fields) {

      ctx.query(sql, function (error, results, fields) {
        if (!results) {
          return res.send({
            code: 500,
            message: '服务器错误'
          })
        }
        return res.send({
          code: 200,
          message: '添加部门类别成功',
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

//修改部门类别名称
router.put('/sector_info', async (req, res) => {
  const { sector_name, sec_id, sector_duty } = req.body
  console.log(req.body)
  if (sec_id) {
    const sql = `
        UPDATE \`sector_info\` SET \`sector_name\` = '${sector_name}', \`sector_duty\` = '${sector_duty}' WHERE \`sec_id\` = ${sec_id}
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
        message: '修改部门类别成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '部门类别id不存在！'
    })
  }
})

module.exports = router

