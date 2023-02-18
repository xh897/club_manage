const express = require('express')
const router = express.Router()
const ctx = require('../../utils/mysql')
// 1.导入jsonwebtoken生成 jwt 字符串的包
const jwt = require('jsonwebtoken')
const crypto = require('../../utils/crypto')
const { listen } = require('express/lib/application')

//获取用户列表
router.get('/getAllUser', async (req, res) => {
  const { limit, page, data } = req.query
  let sql = `
        SELECT *,users.create_time FROM users
        LEFT JOIN major ON major.major_id = users.stuMajor 
        LEFT JOIN department ON department.department_id = users.stuFaculty  
        LEFT JOIN class ON class.class_id = users.stuClass  
        WHERE user_id > 0 `
  if (data) {
    sql += `AND (major.major_name like '%${data}%' OR department.department_name LIKE '%${data}%' OR users.nickname LIKE '%${data}%' ) `
  }
  sql += ` LIMIT ${(page - 1) * limit},${limit} `
  const totalSql = `
        SELECT * FROM users WHERE user_id > 0`
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {
      ctx.query(totalSql, function (error1, total, fields) {
        console.log(results)
        // total.forEach((element,index) => {
        //   results[index].create_time = element.create_time
        // });
        return res.send({
          code: 200,
          data: results,
          total: total.length,
          message: '获取用户列表成功'
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

// 获取所有社团会员列表
router.get('/getAllVip', async (req, res) => {
  const { limit, page, organization_id, department_id, major_id, username } = req.query
  // const sql = `
  //       SELECT users.*,vip_info.organization_id,vip_info.id FROM users LEFT JOIN vip_info on vip_info.user_id = users.user_id WHERE vip_info.organization_id in (${organization_id}) and users.user_id > 0 LIMIT ${(page -
  //     1) *
  //   limit},${limit}
  //   `
  let sql = `
        SELECT users.*,vip_info.*,class.class_name,department.department_name,major.major_name,organization.organization_name FROM vip_info 
        LEFT JOIN users ON users.user_id = vip_info.user_id 
        LEFT JOIN class ON class.class_id = users.stuClass 
        LEFT JOIN department ON department.department_id = users.stuFaculty 
        LEFT JOIN major ON major.major_id = users.stuMajor 
        LEFT JOIN organization ON organization.organization_id = vip_info.organization_id 
        EHERE vip_info.organization_id='${organization_id}' 
    `
  if (department_id) {
    sql += ` AND users.stuFaculty in (${department_id}) `
  }
  if (major_id) {
    sql += ` AND users.stuMajor in (${major_id}) `
  }
  if (username) {
    sql += ` AND users.username='${username}' `
  }
  sql += ` LIMIT ${(page - 1) * limit},${limit} `
  let totalSql = `
  SELECT users.*,vip_info.*,class.class_name,department.department_name,major.major_name,organization.organization_name FROM vip_info 
        LEFT JOIN users on users.user_id = vip_info.user_id 
        LEFT JOIN class on class.class_id = users.stuClass 
        LEFT JOIN department on department.department_id = users.stuFaculty 
        LEFT JOIN major on major.major_id = users.stuMajor 
        LEFT JOIN organization on organization.organization_id = vip_info.organization_id 
        where vip_info.organization_id='${organization_id}'     `
  if (department_id) {
    totalSql += ` and users.stuFaculty in (${department_id}) `
  }
  if (major_id) {
    totalSql += ` and users.stuMajor in (${major_id}) `
  }
  if (username) {
    stotalSqlql += ` and users.username='${username}' `
  }
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {
      ctx.query(totalSql, function (error, total = [], fields) {
        return res.send({
          code: 200,
          data: results,
          total: total.length,
          message: '获取用户列表成功'
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

// 获取所有社团成员列表
router.get('/getAllMember', async (req, res) => {
  const { limit, page, organization_id, department_id, major_id, username } = req.query
  let sql = `
        SELECT users.*,member_info.*,class.class_name,department.department_name,major.major_name,stuposition.stu_position,organization.organization_name FROM member_info 
        LEFT JOIN users on users.user_id = member_info.user_id 
        LEFT JOIN class on class.class_id = users.stuClass 
        LEFT JOIN department on department.department_id = users.stuFaculty 
        LEFT JOIN major on major.major_id = users.stuMajor 
        LEFT JOIN stuposition on stuposition.posi_id = member_info.memberId 
        LEFT JOIN organization on organization.organization_id = member_info.organization_id 
        where member_info.organization_id='${organization_id}' `
  if (department_id) {
    sql += ` and users.stuFaculty in (${department_id}) `
  }
  if (major_id) {
    sql += ` and users.stuMajor in (${major_id}) `
  }
  if (username) {
    sql += ` and users.username='${username}' `
  }
  let sql1 = ` LIMIT ${(page - 1) * limit},${limit} `
  sql += sql1
  const totalSql = `
  SELECT * FROM member_info where organization_id='${organization_id}'`
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {
      ctx.query(totalSql, function (error, total = [], fields) {
        return res.send({
          code: 200,
          data: results,
          total: total.length,
          message: '获取用户列表成功'
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

//获取用户列表
router.get('/getAllUser1', async (req, res) => {
  const { limit, page, organization_id, data } = req.query
  let sql = `
        SELECT org_info.*,users.*,major.major_name, department.department_name,organization.organization_name, class.class_name FROM org_info 
        LEFT JOIN users on users.user_id = org_info.user_id 
        LEFT JOIN organization on organization.organization_id = org_info.organization_id 
        LEFT JOIN major on major.major_id = users.stuMajor 
        LEFT JOIN department on department.department_id = users.stuFaculty 
        LEFT JOIN class on class.class_id = users.stuClass 
        `
  if (organization_id) {
    sql += `where org_info.organization_id in (${organization_id}) `
  }

  if (data) {
    sql += `where users.username like '%${data}%' or users.nickname like '%${data}%' or organization.organization_name like '%${data}%' `
  }
  const totalSql = sql
  sql += ` LIMIT ${(page - 1) * limit},${limit}
    `

  console.error(sql, 3434)
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {
      ctx.query(totalSql, function (error1, total = [], fields) {
        console.error(error1, 'fjdskfjl')
        return res.send({
          code: 200,
          data: results,
          total: total.length,
          message: '获取用户列表成功'
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

//获取社团管理员用户列表
router.get('/org_info_huizhang', async (req, res) => {
  const { id: organization_id, limit, page } = req.query
  const sql = ` SELECT users.*, '社团管理员' as stu_position FROM users INNER JOIN org_info on org_info.user_id = users.user_id WHERE users.user_id > 0 and org_info.organization_id = ${organization_id} LIMIT ${(page -1) * limit},${limit}`
  const sql1 = `select users.*, stuposition.stu_position from member_info LEFT JOIN users on users.user_id = member_info.user_id LEFT JOIN stuposition on stuposition.posi_id = member_info.memberId where organization_id = '${organization_id}'`
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {
      ctx.query(sql1, function (error, results1 = [], fields) {
        return res.send({
          code: 200,
          data: results.concat(results1),
          message: '获取用户列表成功'
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

router.get('/getUserOrg', async (req, res) => {
  const { limit, page, user_id } = req.query
  let sql = `
        SELECT org_info.id, organization.* FROM organization INNER JOIN org_info on org_info.organization_id = organization.organization_id `

  if (user_id != '112') sql += ` WHERE org_info.user_id = '${user_id}' `
  sql += ` LIMIT ${(page - 1) * limit},${limit} 
    `
  const totalSql = `
        SELECT COUNT(org_info.user_id) total FROM users INNER JOIN org_info on org_info.user_id = users.user_id WHERE users.user_id > 0
    `
  if (limit && page) {
    ctx.query(sql, function (error, results, fields) {

      return res.send({
        code: 200,
        data: results,

        message: '获取用户社团列表成功'
      })

    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

router.post('/postUserOrg', async (req, res) => {
  const { organization_id, user_id } = req.body
  const sql = `
        INSERT INTO org_info (organization_id, user_id) values ('${organization_id}', '${user_id}')`
  if (organization_id && user_id) {
    ctx.query(sql, function (error, results, fields) {
      return res.send({
        code: 200,
        data: results,
        message: '添加用户社团列表成功'
      })

    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

router.delete('/deleteUserOrg', async (req, res) => {
  const { id } = req.body
  const sql = `
        DELETE FROM org_info where id in (${id})`
  if (id) {
    ctx.query(sql, function (error, results, fields) {
      return res.send({
        code: 200,
        data: results,
        message: '删除成功'
      })

    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

router.get('/getUserInfo', async (req, res) => {
  const token = req.headers.token
  if (token) {
    const userInfo = jwt.decode(token)
    // console.log(userInfo);
    const getUserSql = `SELECT * FROM users WHERE \`user_id\` = '${userInfo.userId}'`
    ctx.query(getUserSql, function (error, results, fields) {
      if (results.length === 0) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      const isOrganizationManager = `SELECT * FROM organization WHERE \`user_id\` = '${results[0].user_id}'`
      ctx.query(isOrganizationManager, function (error, results1, fields) {
        return res.send({
          code: 200,
          message: '获取用户信息成功！',
          data: {
            ...results[0],
            organizationManager: results1 || []
          }
        })
      })

    })
  } else {
    return res.send({
      code: 401,
      message: '没有登录'
    })
  }
})
router.get('/getUserInfoById', async (req, res) => {
  const { id } = req.query
  if (id) {
    const userSql = `SELECT * FROM users WHERE \`user_id\` = '${id}'`
    ctx.query(userSql, function (error, results, fields) {
      if (results.length === 0) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '获取用户信息成功！',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 500,
      message: '没有获取到用户id'
    })
  }
})
router.put('/setUserInfoById', async (req, res) => {
  let {
    user_id,
    nickname,
    username,
    password,
    phone,
    avatar,
    sex,
    stuFaculty,
    stuMajor,
    stuClass
  } = req.body
  if (String(user_id)) {
    const isExits = `SELECT * FROM users WHERE username='${username}' AND user_id != ${user_id}`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '该用户名已存在'
        })
      }
      if (password !== "") {
        if (password.length >= 6 && password.length <= 16) {
          password = crypto.md5(password)
          var sql = `update users set username='${username}',password='${password}',stuFaculty='${stuFaculty}',stuMajor='${stuMajor}',stuClass='${stuClass}',nickname='${nickname}',phone='${phone}',avatar='${avatar}',sex='${sex}' where user_id = ${user_id}`
        } else {
          return res.send({
            code: 400,
            message: '密码格式不正确（字符6-16位）'
          })
        }
      } else {
        var sql = `update users set username='${username}',stuFaculty='${stuFaculty}',stuMajor='${stuMajor}',stuClass='${stuClass}',nickname='${nickname}',phone='${phone}',avatar='${avatar}',sex='${sex}' where user_id = ${user_id}`
      }
      ctx.query(sql, function (error, results, fields) {
        if (results) {
          return res.send({
            code: 200,
            message: '修改用户信息成功！'
          })
        }
      })
    })
  } else {
    return res.send({
      code: 400,
      massage: '没有获取到用户id'
    })
  }
})

router.put('/setUserInfoById1', async (req, res) => {
  const { user_id, stuId, password2, password } = req.body
  const reqPassword = crypto.md5(stuId)
  const reqPassword2 = crypto.md5(password2)
  if (user_id) {
    const sql1 = `select * from users where user_id = '${user_id}' and stuId = '${stuId}'`
    const sql = `update users set password='${reqPassword2}' where user_id = ${user_id}`
    ctx.query(sql1, function (error, results, fields) {
      if (results.length) {
        ctx.query(sql, function (error, results, fields) {
          if (results) {
            return res.send({
              code: 200,
              message: '修改用户信息成功！'
            })
          }
          return res.send({
            code: 401,
            message: '修改用户信息失败！'
          })
        })
        return
      }
      return res.send({
        code: 400,
        massage: '原密码错误'
      })
    })
  } else {
    return res.send({
      code: 400,
      massage: '没有获取到用户id'
    })
  }
})

router.put('/deleteUserInfoById', async (req, res) => {
  const { user_id } = req.body
  if (user_id) {
    const sql = `delete from users where user_id in (${user_id});`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '删除成功！'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      massage: '没有获取到用户id'
    })
  }
})

router.put('/deleteVipById', async (req, res) => {
  const { id } = req.body
  if (id) {
    const sql = `delete from vip_info where id='${id}';`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '删除成功！'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      massage: '没有获取到会员id'
    })
  }
})

router.put('/deleteMemberById', async (req, res) => {
  const { id } = req.body
  if (id) {
    const sql = `delete from member_info where id in (${id});`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '删除成功！'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      massage: '没有获取到成员id'
    })
  }
})

// 用户加入社团
router.post('/join', async (req, res) => {
  const {
    user_id: userId,
    organization_id: organizationId,
    status,
    reason
  } = req.body
  if (userId && organizationId) {
    const sql = `INSERT INTO user_department (uid,oid,status,reason) values (${userId},${organizationId},0,'${reason}')`
    const isExits = `SELECT 1 FROM user_department where uid = ${userId} AND oid=${organizationId}`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '您已申请过该社团'
        })
      } else {
        ctx.query(sql, function (error, results, fields) {
          if (results) {

            return res.send({
              code: 200,
              message: '申请加入社团成功'
            })

          } else {
            return res.send({
              code: 400,
              message: '操作失败'
            })
          }
        })
      }
    })
  } else {
    res.send({
      code: 400,
      message: '错误，没有传id！'
    })
  }
})

// 用户申请参加职位
router.post('/join1', async (req, res) => {
  const {
    user_id: userId,
    organization_id: organizationId,
    memberId,
    status,
    reason
  } = req.body
  if (userId && organizationId && memberId) {
    const sql = `INSERT INTO user_member (user_id,organization_id,memberId,status,reason) values (${userId},${organizationId},${memberId},0,'${reason}')`
    const isExits = `SELECT 1 FROM user_member where user_id = ${userId} AND organization_id=${organizationId} AND memberId=${memberId}`

    ctx.query(isExits, function (error, results = [], fields) {
      if (results && results.length !== 0) {
        return res.send({
          code: 400,
          message: '您已申请过该职位'
        })
      } else {
        ctx.query(sql, function (error, results, fields) {
          if (results) {

            return res.send({
              code: 200,
              message: '申请加入职位成功'
            })

          } else {
            return res.send({
              code: 400,
              message: '操作失败'
            })
          }
        })
      }
    })
  } else {
    res.send({
      code: 400,
      message: '错误，没有传id！'
    })
  }
})

// 用户参加活动
router.post('/joinAtivityById', async (req, res) => {
  const { id, aid } = req.body
  const isExits = `SELECT 1 FROM user_activity where uid = ${id} AND aid=${aid}`
  const sql = `
        INSERT INTO user_activity (uid,aid) VALUES ('${id}','${aid}')`
  ctx.query(isExits, function (error, results, fields) {
    if (results.length !== 0) {
      return res.send({
        code: 400,
        message: '您已申请过该活动'
      })
    } else {
      ctx.query(sql, function (error, results, fields) {
        if (results) {
          return res.send({
            code: 200,
            message: '申请加入活动成功，待管理员审核！'
          })
        }
      })
    }
  })
})

// 用户退出社团申请
router.post('/logoutOrg', async (req, res) => {
  const { user_id, organization_id, reason } = req.body
  const isExits = `SELECT 1 FROM quit_association where user_id = ${user_id} AND organization_id=${organization_id}`
  const sql = `
        INSERT INTO quit_association (user_id,organization_id,reason) VALUES ('${user_id}','${organization_id}','${reason}')
    `
  ctx.query(isExits, function (error, results, fields) {
    if (results.length !== 0) {
      return res.send({
        code: 400,
        message: '您已申请过退出社团'
      })
    } else {
      ctx.query(sql, function (error, results, fields) {
        if (results) {
          return res.send({
            code: 200,
            message: '申请退出社团成功！'
          })
        }
      })
    }
  })
})

module.exports = router