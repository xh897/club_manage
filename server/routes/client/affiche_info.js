const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')

//获取系统公告分类
router.get('/affiche_info', async (req, res) => {
  const { page, limit, data } = req.query
  let sql = `SELECT * FROM affiche_info where organization_id = 0`
  if (data) {
    sql += ` and afficheTheme like '%${data}%' `
  }
  let totalSql = `SELECT COUNT(*) total FROM affiche_info where organization_id=0`
  if (data) {
    totalSql += ` and afficheTheme like '%${data}%' `
  }
  sql += ` order by afficheId desc LIMIT ${(page - 1) * limit},${limit} `
  ctx.query(sql, function (error, results, fields) {
    ctx.query(totalSql, function (error, total, fields) {
      return res.send({
        code: 200,
        total: total[0].total,
        data: results
      })
    })
  })
})

router.get('/org_affiche_info', async (req, res) => {
  const { page, limit, status, organization_id } = req.query
  let sql = `SELECT * FROM affiche_info WHERE organization_id <> 0 `
  if (organization_id) {
    sql += ` AND organization_id IN (${organization_id}) `
  }
  let totalSql = sql
  sql += ` ORDER BY afficheId DESC LIMIT ${(page - 1) * limit}, ${limit}`
  ctx.query(sql, function (error, results, fields) {
    ctx.query(totalSql, function (error, total, fields) {
      return res.send({
        code: 200,
        total: total.length,
        data: results
      })
    })
  })
})


router.get('/affiche_info/:id', async (req, res) => {
  const { id } = req.params
  const totalSql = `SELECT * FROM affiche_info where afficheId = '${id}'`
  ctx.query(totalSql, function (error, results, fields) {
    return res.send({
      code: 200,
      data: results
    })
  })

})

//删除系统公告
router.delete('/affiche_info', async (req, res) => {
  const { afficheId } = req.query
  if (afficheId) {
    const sql = `DELETE FROM affiche_info WHERE afficheId in (${afficheId})`
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

// 添加系统公告
router.post('/affiche_info', async (req, res) => {
  const {
    afficheTheme,
    affichePlace,
    icon,
    afficheTime,
    afficheContent,
    organization_id = 0
  } = req.body
  if (afficheTheme) {
    const isExits = `SELECT 1 FROM \`affiche_info\` WHERE \`afficheTheme\` = '${afficheTheme}'`
    const sql = `INSERT INTO \`affiche_info\`(\`afficheTheme\`, \`affichePlace\`, \`icon\`, \`afficheTime\`, \`afficheContent\`, \`organization_id\`) VALUES ('${afficheTheme}', '${affichePlace}', '${icon}', '${afficheTime}', '${afficheContent}', '${organization_id}')`
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
          message: '添加系统公告成功',
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
//修改系统公告名称
router.put('/affiche_info', async (req, res) => {
  const {
    afficheTheme,
    affichePlace,
    icon,
    afficheTime,
    afficheContent,
    afficheId
  } = req.body
  if (afficheId) {
    const sql = `UPDATE \`affiche_info\` SET \`afficheTheme\` = '${afficheTheme}', \`affichePlace\` = '${affichePlace}', \`icon\` = '${icon}', \`afficheTime\` = '${afficheTime}', \`afficheContent\` = '${afficheContent}' WHERE \`afficheId\` = ${afficheId}`
    ctx.query(sql, function (error, results, fields) {
      if (!results) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '修改系统公告成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '系统公告id不存在！'
    })
  }
})

module.exports = router