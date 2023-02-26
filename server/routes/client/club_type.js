const express = require("express");
const router = express.Router();
const ctx = require("../../utils/mysql")

//获取社团类别分类
router.get('/club_type', async (req, res) => {
    const { data } = req.query;
    let sql = `SELECT * FROM club_type`;
    const totalSql = `SELECT COUNT(*) total FROM  club_type`
    // if (limit && page) {
    //     sql += `LIMIT ${page - 1 * limit}, ${limit}`
    // }
    ctx.query(sql, function (error, results, field) {
        ctx.query(totalSql, function (error, total, fields) {
            return res.send({
                code: 200,
                total: results.length,
                data: results
            })
        })
    })
})

// // 获取社团部门
// router.get("/getOrgBranch", async (req, res) => {
//     // const { organization_id } = req.body;
//     const sql = `SELECT * FROM sector_info WHERE sector_info.organization_id IN ${organization_id}`
//     ctx.query(sql, function (error, results, fields) {
//         return res.send({
//             code: 200,
//             data: results
//         })
//     })
// })

//删除社团类别
router.delete('/club_type', async (req, res) => {
    const { type_id } = req.query
    if (type_id) {
        const sql = `DELETE FROM club_type WHERE type_id IN (${type_id})`
        ctx.query(sql, function (error, results, fields) {
            // console.log(results, error, fields);
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

// 添加社团类别
router.post("/club_type", async (req, res) => {
    const { type_name } = req.body;
    if (type_name) {
        const isExits = `SELECT 1 FROM \`club_type\` WHERE \`type_name\` = '${type_name}'`
        const sql = `INSERT INTO \`club_type\` (\`type_name\`) VALUES ('${type_name}')`
        ctx.query(isExits, function (error, results, fields) {
            if (results.length !== 0) {
                return res.send({
                    code: 400,
                    message: '该社团类别分类已存在'
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
                    message: '添加社团类别成功',
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

//修改社团类别名称
router.put("/club_type", async (req, res) => {
    const { type_name, type_id } = req.body
    console.log(req.body);
    if (type_id) {
      const sql = `UPDATE club_type SET \`type_name\` = '${type_name}' WHERE \`type_id\` = ${type_id}`
      ctx.query(sql, function (error, results, fields) {
        if (!results) {
          return res.send({
            code: 500,
            message: '服务器错误'
          })
        }
        return res.send({
          code: 200,
          message: '修改社团类别成功',
          data: results[0]
        })
      })
    } else {
      return res.send({
        code: 400,
        message: '社团类别id不存在！'
      })
    }
  });

module.exports = router;