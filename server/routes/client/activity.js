const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')
const jwt = require('jsonwebtoken')

//获取活动列表
router.get('/activity', async (req, res) => {
    const { page, limit, title, organization_id, activityObj } = req.query
    let sql = `SELECT activity.*, organization.organization_name, activity.id FROM activity LEFT JOIN organization ON activity.organization_id = organization.organization_id WHERE 1 = 1 `
    if (organization_id) {
        sql += ` AND organization.organization_id IN (${organization_id}) `
    }
    if (title) {
        sql += ` AND activity.title LIKE '%${title}%' `
    }
    if (activityObj) {
        sql += ` AND activity.activityObj = '${activityObj}' `
    }
    sql += ` ORDER BY id DESC `
    const totalSql = sql;
    sql += ` LIMIT ${(page - 1) * limit},${limit} `
    ctx.query(sql, function (error, results, fields) {
        ctx.query(totalSql, function (error, total = [], fields) {
            return res.send({
                code: 200,
                total: total.length,
                data: results
            })
        })
    })
})

router.get('/getMyOrg', async (req, res) => {
    const { page, limit, title, activityObj, user_id } = req.query
    let sql = `SELECT organization.*,org_info.user_id FROM organization INNER JOIN org_info ON organization.organization_id = org_info.organization_id WHERE organization.status = 1 AND org_info.user_id = '${user_id}' `
    let sql1 = `SELECT organization.*,member_info.user_id FROM organization INNER JOIN member_info ON organization.organization_id = member_info.organization_id WHERE organization.status = 1 AND member_info.user_id = '${user_id}' `

    let sql2 = `SELECT organization.*,vip_info.user_id FROM organization INNER JOIN vip_info ON organization.organization_id = vip_info.organization_id WHERE organization.status = 1 AND vip_info.user_id = '${user_id}' `
    if (title) {
        sql += ` AND activity.title LIKE '%${title}%' `
    }
    if (activityObj) {
        sql += ` AND activity.activityObj = '${activityObj}' `
    }
    if (title) {
        sql += ` AND activity.title = '%${title}%' `
    }

    sql += ` LIMIT ${(page - 1) * limit},${limit}`
    const totalSql = `SELECT COUNT(*) total FROM activity`

    ctx.query(sql, function (error, results, fields) {
        ctx.query(totalSql, function (error, total, fields) {
            ctx.query(sql1, function (error, results1 = [], fields) {
                ctx.query(sql2, function (error, results2 = [], fields) {
                    return res.send({
                        code: 200,
                        total: total[0].total,
                        data: results.concat(results1).concat(results2)
                    })
                })
            })
        })
    })
})

//删除
router.delete('/orgActivity', async (req, res) => {
    const { activity_id } = req.query
    if (activity_id) {
        const sql = `DELETE FROM user_activity WHERE id IN (${activity_id})`
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

router.get('/orgActivity', async (req, res) => {
    let { oid, status, page, limit, department_id, major_id, username } = req.query
    let sql = ` SELECT users.user_id,users.username,users.nickname,users.stuId,users.avatar,department.department_name,class.class_name,major.major_name,users.phone,users.sex,activity.title,user_activity.id,user_activity.status,user_activity.uid,user_activity.create_time FROM 
  user_activity 
  LEFT JOIN users on users.user_id = user_activity.uid 
  LEFT JOIN class on class.class_id = users.stuClass 
  LEFT JOIN department on department.department_id = users.stuFaculty 
  LEFT JOIN major on major.major_id = users.stuMajor 
  LEFT JOIN activity on activity.id = user_activity.aid 
 `
    var sql2 = "";
    if (oid) {
        if (sql2 == "") {
            sql2 += ` WHERE activity.organization_id IN (${oid}) `
        } else {
            sql2 += ` AND activity.organization_id IN (${oid}) `
        }

    }
    if (department_id) {
        if (sql2 == "") {
            sql2 += ` WHERE users.stuFaculty in (${department_id}) `
        } else {
            sql2 += ` AND users.stuFaculty in (${department_id}) `
        }

    }
    if (major_id) {
        if (sql2 == "") {
            sql2 += ` WHERE users.stuMajor in (${major_id}) `
        } else {
            sql2 += ` AND users.stuMajor in (${major_id}) `
        }

    }
    if (username) {
        if (sql2 == "") {
            sql2 += ` WHERE users.username='${username}' `
        } else {
            sql2 += ` AND users.username='${username}' `
        }

    }
    sql += sql2
    const totalSql = sql
    let sql1 = `ORDER BY id DESC LIMIT ${(page - 1) * limit},${limit} `
    sql += sql1
    // const totalSql = `SELECT 
    // * FROM user_activity`
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

//获取活动id查询活动内容
router.get('/activityById', async (req, res) => {
    const { id } = req.query
    const sql = `SELECT activity.*,organization.organization_name,sector_info.sector_name,sector_info.sector_duty FROM activity 
  LEFT join organization on organization.organization_id=activity.organization_id 
  LEFT join sector_info on sector_info.organization_id=activity.organization_id 
  WHERE id = ${id}`
    ctx.query(sql, function (error, results, fields) {
        //获取所有部门
        const sql2 = `SELECT * FROM sector_info 
    WHERE organization_id = ${results[0].organization_id}`
        ctx.query(sql2, function (error, total, fields) {
            //获取所有部门
            results[0].sector_info = total;
            return res.send({
                code: 200,
                data: results
            })
        })

    })
})
//删除活动
router.delete('/activity', async (req, res) => {
    const { id } = req.query
    if (id) {
        const sql = `DELETE FROM activity WHERE id in (${id})`
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
// 添加活动
router.post('/activity', async (req, res) => {
    const {
        title,
        content,
        icon,
        organization_id,
        activityObj,
        activityObjtext,
        timeStart,
        timeEnd,
        host,
        activityPlace
    } = req.body
    if (title && content && icon && organization_id) {
        const isExits = `SELECT 1 FROM activity WHERE title = '${title}'`
        const sql = `INSERT INTO activity (title,content,icon,organization_id, activityObj, activityObjtext, timeStart, timeEnd, host, activityPlace) VALUES ('${title}','${content}','${icon}','${organization_id}', '${activityObj}', '${activityObjtext}', '${timeStart}', '${timeEnd}', '${host}', '${activityPlace}')`
        console.log(sql)
        ctx.query(isExits, function (error, results, fields) {
            // if (results.length !== 0) {
            //   return res.send({
            //     code: 400,
            //     message: '该活动名称已存在'
            //   })
            // }
            ctx.query(sql, function (error, results, fields) {
                if (results) {
                    return res.send({
                        code: 200,
                        message: '添加成功'
                    })
                } else {
                    console.error(error, 343)
                    return res.send({
                        code: 400,
                        message: '添加错误'
                    })
                }
            })
        })
    } else {
        return res.send({
            code: 400,
            message: '失败'
        })
    }
})
//修改活动内容
router.put('/activity', async (req, res) => {
    let {
        id,
        title,
        content,
        icon,
        activityObj,
        activityObjtext,
        organization_id,
        timeStart,
        timeEnd,
        host,
        activityPlace
    } = req.body

    if (id) {
        const sql = `
        UPDATE activity SET host='${host}',activityPlace='${activityPlace}',timeEnd='${timeEnd}',timeStart='${timeStart}',organization_id='${organization_id}',activityObj='${activityObj}',activityObjtext='${activityObjtext}',title='${title}',content='${content}',icon='${icon}' WHERE id=${id}
        `
        ctx.query(sql, function (error, results, fields) {
            if (!results) {
                return res.send({
                    code: 500,
                    message: '服务器错误' + error
                })
            }
            return res.send({
                code: 200,
                message: '修改活动成功'
            })
        })
    } else {
        return res.send({
            code: 400,
            message: 'id不存在！'
        })
    }
})
//修改活动内容
router.put('/activityStatus', async (req, res) => {
    const { id, status } = req.body
    if (id) {
        const sql = `
      UPDATE user_activity SET status = '${status}' WHERE id = ${id}
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
                message: '修改活动成功'
            })
        })
    } else {
        return res.send({
            code: 400,
            message: 'id不存在！'
        })
    }
})

// 根据用户id获取用户参加的活动
router.get('/selectActivityByUserId', async (req, res) => {
    const { id, page, limit } = req.query
    const sql = `SELECT * FROM activity INNER JOIN user_activity WHERE activity.id = user_activity.aid 
	AND user_activity.uid = ${id} LIMIT ${(page - 1) * limit},${limit}`
    if (id && page && limit) {
        ctx.query(sql, function (error, results, fields) {
            return res.send({
                code: 200,
                message: '获取列表成功！',
                data: results
            })
        })
    } else {
        return res.send({
            code: 400,
            message: '获取失败'
        })
    }
})

// 根据token查询用户参加的活动
router.get('/getMyActivityByToken', async (req, res) => {
    const { token } = req.headers
    const { userId } = jwt.decode(token)
    const sql = `SELECT * FROM user_activity INNER JOIN activity WHERE user_activity.uid = ${userId}
	AND user_activity.aid = activity.id
    AND user_activity.status = 1 `
    ctx.query(sql, function (error, results, fields) {
        if (!results) {
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        } else {
            return res.send({
                code: 200,
                data: results,
                message: '获取用户社团信息成功'
            })
        }
    })
})

module.exports = router