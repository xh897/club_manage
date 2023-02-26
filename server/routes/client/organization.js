const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const ctx = require('../../utils/mysql')

//根据社团id获取详细信息
router.get('/getOrganizationById', async (req, res) => {
  const { organization_id } = req.query
  const sql = `SELECT * FROM organization INNER JOIN department WHERE organization.organization_id = ${organization_id} AND organization.department_id = department.department_id`
  if (organization_id) {
    ctx.query(sql, function (error, results, fields) {
      //获取所有部门
      const sql2 = `SELECT * FROM sector_info 
    WHERE organization_id = ${results[0].organization_id}`
      ctx.query(sql2, function (error, total, fields) {
        //获取所有部门
        results[0].sector_info = total;
        return res.send({
          code: 200,
          data: results,
          message: '获取成功'
        })
      })

    })
  } else {
    return res.send({
      code: 500,
      message: '服务器错误'
    })
  }
})

//根据用户id获取社团组织
router.get('/getOrganizationByUserId', async (req, res) => {
  const { userId, status } = req.query
  const sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN user_department 
WHERE
	organization.organization_id = user_department.oid 
	AND user_department.uid = ${userId} AND user_department.status = ${status}
    `
  if (userId) {
    ctx.query(sql, function (error, results, fields) {
      return res.send({
        code: 200,
        data: results
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '没有获取到用户id'
    })
  }
})

// 根据用户id获取用户审核列表
router.get('/organizationAuditById', async (req, res) => {
  const { userId, status, page, limit } = req.query
  let sql
  if (status == -1) {
    sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN user_department 
WHERE
	organization.organization_id = user_department.oid 
	AND user_department.uid = ${userId} LIMIT ${(page - 1) * limit},${limit}`
  } else {
    sql = `
        SELECT
        * 
    FROM
        organization
        INNER JOIN user_department 
    WHERE
        organization.organization_id = user_department.oid 
        AND user_department.uid = ${userId} AND user_department.status = ${status} LIMIT ${(page -
        1) *
      limit},${limit}`
  }
  if (status && userId && page && limit) {
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
router.get('/organizationAuditById1', async (req, res) => {
  const { userId, status, page, limit } = req.query
  let sql
  if (status == -1) {
    sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN user_member 
  LEFT JOIN stuposition on stuposition.posi_id=user_member.memberId 
WHERE 
	organization.organization_id = user_member.organization_id 
	AND user_member.user_id = ${userId} LIMIT ${(page - 1) * limit},${limit}`
  } else {
    sql = `
        SELECT
        * 
    FROM
        organization
        INNER JOIN user_department 
    WHERE
        organization.organization_id = user_department.oid 
        AND user_department.uid = ${userId} AND user_department.status = ${status} LIMIT ${(page -
        1) *
      limit},${limit}`
  }
  if (status && userId && page && limit) {
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
router.get('/organizationAuditById2', async (req, res) => {
  const { userId, status, page, limit } = req.query
  let sql
  if (status == -1) {
    sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN user_member 
WHERE
	organization.organization_id = user_member.organization_id 
	AND user_member.user_id = ${userId} LIMIT ${(page - 1) * limit},${limit}`
  } else {
    sql = `
        SELECT
        * 
    FROM
        organization 
        
    WHERE 
    organization.user_id = ${userId} LIMIT ${(page -
        1) *
      limit},${limit}`
  }
  if (status && userId && page && limit) {
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
// 获取退出社团申请列表
router.get('/getQuitByUserId', async (req, res) => {
  const { userId, status, page, limit } = req.query
  let sql
  if (status == -1) {
    sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN quit_association 
WHERE
	organization.organization_id = quit_association.organization_id 
	AND quit_association.user_id = ${userId} LIMIT ${(page - 1) * limit},${limit}`
  } else {
    sql = `
        SELECT
        * 
    FROM
        organization
        INNER JOIN user_department 
    WHERE
        organization.organization_id = user_department.oid 
        AND user_department.uid = ${userId} AND user_department.status = ${status} LIMIT ${(page -
        1) *
      limit},${limit}`
  }
  if (status && userId && page && limit) {
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

// 获取参加活动申请列表
router.get('/getUserActivityByUserId', async (req, res) => {
  const { userId, status, page, limit } = req.query
  let sql
  if (status == -1) {
    sql = `
    SELECT
    activity.*, user_activity.status
FROM
	activity
	INNER JOIN user_activity 
WHERE
activity.id = user_activity.aid 
	AND user_activity.uid = ${userId} LIMIT ${(page - 1) * limit},${limit}`
  } else {
    sql = `
        SELECT
        * 
    FROM
        organization
        INNER JOIN user_department 
    WHERE
        organization.organization_id = user_department.oid 
        AND user_department.uid = ${userId} AND user_department.status = ${status} LIMIT ${(page -
        1) *
      limit},${limit}`
  }
  if (status && userId && page && limit) {
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

// 获取全部审核列表
router.get('/organizationAudit', async (req, res) => {
  const { status, page, limit, organization_id, department_id, major_id, username } = req.query

  let sql = `
    SELECT
    user_department.status,department.department_name,user_department.reason, major.major_name, class.class_name,users.user_id,users.username,users.nickname,users.avatar,organization.organization_name,users.phone,users.sex,users.stuId,user_department.create_time,user_department.id,user_department.oid
FROM
	organization,user_department,users,department,major,class
WHERE
	organization.organization_id = user_department.oid 
    AND user_department.uid = users.user_id
    AND department.department_id = users.stuFaculty
      AND major.major_id = users.stuMajor
      AND class.class_id = users.stuClass
	`
  if (organization_id) {
    sql += ` and user_department.oid in (${organization_id}) `
  }
  if (department_id) {
    sql += ` and users.stuFaculty in (${department_id}) `
  }
  if (major_id) {
    sql += ` and users.stuMajor in (${major_id}) `
  }
  if (username) {
    sql += ` and users.username='${username}' `
  }

  let sql1 = ` LIMIT ${(page - 1) * limit},${limit}`
  sql += sql1
  if (organization_id) { }
  if (status && page && limit) {
    let totalSql = `
    SELECT
    user_department.status,department.department_name,user_department.reason, major.major_name, class.class_name,users.user_id,users.username,users.nickname,users.avatar,organization.organization_name,users.phone,users.sex,users.stuId,user_department.create_time,user_department.id,user_department.oid
FROM
	organization,user_department,users,department,major,class
WHERE
	organization.organization_id = user_department.oid 
    AND user_department.uid = users.user_id
    AND department.department_id = users.stuFaculty
      AND major.major_id = users.stuMajor
      AND class.class_id = users.stuClass 
    `
    if (organization_id) {
      totalSql += ` and user_department.oid in (${organization_id}) `
    }
    if (department_id) {
      totalSql += ` and users.stuFaculty in (${department_id}) `
    }
    if (major_id) {
      totalSql += ` and users.stuMajor in (${major_id}) `
    }
    if (username) {
      totalSql += ` and users.username='${username}' `
    }
    ctx.query(sql, function (error, results, fields) {
      ctx.query(totalSql, function (error, total, fields) {
        return res.send({
          code: 200,
          message: '获取列表成功！',
          total: total.length,
          data: results
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '获取失败'
    })
  }
})
//删除审核
router.delete('/organizationAudit', async (req, res) => {
  const { department_id } = req.query
  if (department_id) {
    const sql = `DELETE FROM user_department WHERE id in (${department_id})`


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
router.get('/PositionAudit', async (req, res) => {
  const { status, page, limit, organization_id, department_id, major_id, username } = req.query
  let sql = `
    SELECT
    user_member.status,user_member.reason, department.department_name, major.major_name, class.class_name,users.user_id,users.username,users.nickname,users.avatar,users.stuId,organization.organization_name,users.phone,users.sex,user_member.joinTime as createTime,user_member.id,user_member.memberId,user_member.organization_id
FROM
	organization, user_member, users ,department,major,class
WHERE
	organization.organization_id = user_member.organization_id 
    AND user_member.user_id = users.user_id
    AND class.class_id = users.stuClass
    AND department.department_id = users.stuFaculty
      AND major.major_id = users.stuMajor 
	 `
  if (organization_id) {
    sql += ` and user_member.organization_id in (${organization_id}) `
  }
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
  if (page && limit) {
    let totalSql = `
    SELECT
    user_member.status,user_member.reason, department.department_name, major.major_name, class.class_name,users.user_id,users.username,users.nickname,users.avatar,users.stuId,organization.organization_name,users.phone,users.sex,user_member.joinTime as createTime,user_member.id,user_member.memberId,user_member.organization_id
FROM
	organization, user_member, users ,department,major,class
WHERE
	organization.organization_id = user_member.organization_id 
    AND user_member.user_id = users.user_id
    AND class.class_id = users.stuClass
    AND department.department_id = users.stuFaculty
      AND major.major_id = users.stuMajor 
            
    `
    if (organization_id) {
      totalSql += ` and user_member.organization_id in (${organization_id}) `
    }
    if (department_id) {
      totalSql += ` and users.stuFaculty in (${department_id}) `
    }
    if (major_id) {
      totalSql += ` and users.stuMajor in (${major_id}) `
    }
    if (username) {
      totalSql += ` and users.username='${username}' `
    }
    ctx.query(sql, function (error, results, fields) {
      console.error(error, 343)
      ctx.query(totalSql, function (error, total, fields) {
        return res.send({
          code: 200,
          message: '获取列表成功！',
          total: total.length,
          data: results
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '获取失败'
    })
  }
})
//删除审核
router.delete('/PositionAudit', async (req, res) => {
  const { member_id } = req.query
  if (member_id) {
    const sql = `DELETE FROM user_member WHERE id in (${member_id})`
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
router.get('/gatQuitAudit', async (req, res) => {
  const { status, page, limit, organization_id, department_id, major_id, username } = req.query
  let sql = `
    SELECT
	users.user_id,users.username,users.nickname,users.stuId,users.avatar,department.department_name,class.class_name,major.major_name,organization.organization_name,users.phone,users.sex,quit_association.applyTime as createTime,quit_association.id,quit_association.status,quit_association.reason,quit_association.organization_id
FROM
	organization 
	INNER JOIN quit_association INNER JOIN users 
  left join class on class.class_id = users.stuClass 
  left join department on department.department_id = users.stuFaculty 
  left join major on major.major_id = users.stuMajor 
WHERE
	organization.organization_id = quit_association.organization_id 
    AND quit_association.user_id = users.user_id 
	`
  if (organization_id) {
    sql += ` and quit_association.organization_id in (${organization_id}) `
  }
  if (department_id) {
    sql += ` and users.stuFaculty in (${department_id}) `
  }
  if (major_id) {
    sql += ` and users.stuMajor in (${major_id}) `
  }
  if (username) {
    sql += ` and users.username='${username}' `
  }
  let totalSql = sql
  let sql1 = `LIMIT ${(page - 1) * limit},${limit}`
  sql += sql1
  if (status && page && limit) {
    // const totalSql = `
    //     SELECT COUNT(*) total FROM organization INNER JOIN quit_association INNER JOIN users 
    //     WHERE
    //         organization.organization_id = quit_association.organization_id 
    //         AND quit_association.user_id = users.user_id
    //         AND quit_association.status = ${status}
    // `
    ctx.query(sql, function (error, results, fields) {
      console.error(error, 343)
      ctx.query(totalSql, function (error, total, fields) {
        return res.send({
          code: 200,
          message: '获取列表成功！',
          total: total.length,
          data: results
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '获取失败'
    })
  }
})
router.delete('/gatQuitAudit', async (req, res) => {
  const { quit_association_id } = req.query
  if (quit_association_id) {
    const sql = `DELETE FROM quit_association WHERE id in (${quit_association_id})`
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
// 修改审核状态根据中间表id
router.put('/organizationAuditById', async (req, res) => {
  const { id, status, oid, user_id } = req.body
  if (id && status) {
    const sql = `
            UPDATE user_department SET status = ${status} where id = ${id}
        `
    if (user_id && oid && status == "1") {
      await ctx.query(
        `insert into vip_info (user_id, organization_id) values(${user_id}, ${oid})`
      )
    }
    // const sql1 =
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '修改成功！'
        })
      } else {
        return res.send({
          code: 400,
          message: '修改失败'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

// 添加社团会员
router.post('/postVipInfo', async (req, res) => {
  const { organization_id, user_id } = req.body

  if (user_id && organization_id) {
    const sql = `insert into vip_info (user_id, organization_id) values(${user_id}, ${organization_id})`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '添加成功！'
        })
      } else {
        return res.send({
          code: 400,
          message: '添加失败'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '添加失败'
    })
  }
})

// 添加社团成员
router.post('/postMemberInfo', async (req, res) => {
  const { organization_id, user_id, memberId } = req.body

  if (user_id && organization_id) {
    const sql = `insert into member_info (user_id, organization_id, memberId) values(${user_id}, ${organization_id}, ${memberId})`
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '添加成功！'
        })
      } else {
        return res.send({
          code: 400,
          message: '添加失败'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '添加失败'
    })
  }
})

// 修改审核状态根据中间表id
router.put('/PositionAuditById', async (req, res) => {
  const { memberId, status, organization_id, user_id, id } = req.body
  if (id && status) {
    const sql = `
            UPDATE user_member SET status = ${status} where id = ${id}
        `
    if (user_id && organization_id && memberId && status == "1") {
      await ctx.query(
        `insert into member_info (memberId, user_id, organization_id) values(${memberId}, ${user_id}, ${organization_id})`
      )
    }
    // const sql1 =
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '修改成功！'
        })
      } else {
        return res.send({
          code: 400,
          message: '修改失败'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})

// 修改审核状态根据中间表id
router.put('/QuitAuditById', async (req, res) => {
  const { status, organization_id, user_id, quitId } = req.body
  if (quitId && status) {
    const sql = `
          UPDATE quit_association SET status = ${status} where id = ${quitId}
      `
    if (user_id && organization_id && status == 1) {
      await ctx.query(
        `delete from member_info where organization_id = '${organization_id}' and user_id = '${user_id}'`
      )
      await ctx.query(
        `delete from org_info where organization_id = '${organization_id}' and user_id = '${user_id}'`
      )
      await ctx.query(
        `delete from vip_info where organization_id = '${organization_id}' and user_id = '${user_id}'`
      )
    }
    // const sql1 =
    ctx.query(sql, function (error, results, fields) {
      if (results) {
        return res.send({
          code: 200,
          message: '修改成功！'
        })
      } else {
        return res.send({
          code: 400,
          message: '修改失败'
        })
      }
    })
  } else {
    return res.send({
      code: 400,
      message: '传递参数错误'
    })
  }
})
// 获取社团(根据时间)
router.get('/organization', async (req, res) => {
  const {
    page,
    limit,
    organization_name,
    associType,
    department_id,
    organization_id,
    status = ''
  } = req.query
  let sql = `
    SELECT
	organization.*,department.department_name,users.username,users.phone
FROM
	organization LEFT JOIN
    department
ON organization.department_id = department.department_id
LEFT JOIN
  users
ON users.user_id = organization.user_id
`

  sql += ` where 1 = 1 `;
  if (status) {
    sql += ` and status = ${status} `
  }
  if (organization_name) {
    sql += ` and organization.organization_name like '%${organization_name}%' `
  }

  if (associType) {
    sql += ` and organization.associType = '${associType}'`
  }

  if (department_id) {
    sql += ` and organization.department_id = '${department_id}'`
  }

  if (organization_id) {
    sql += ` and organization.organization_id in (${organization_id})`
  }


  if (page && limit) {
    sql += ` ORDER BY organization.create_time DESC LIMIT ${(page - 1) *
      limit},${limit} `
    ctx.query(sql, function (error, results, fields) {
      if (results.length == 0) {
        return res.send({
          code: 200,
          total: 0,
          data: results
        })
      }
      let totalSql = `
            SELECT
            COUNT(*) total
        FROM
            organization
            `
      totalSql += ` where 1 = 1 `;
      if (status) {
        totalSql += ` and status = ${status} `
      }
      if (organization_name) {
        totalSql += ` and organization.organization_name like '%${organization_name}%' `
      }

      if (associType) {
        totalSql += ` and organization.associType = '${associType}'`
      }

      if (department_id) {
        totalSql += ` and organization.department_id = '${department_id}'`
      }

      if (organization_id) {
        totalSql += ` and organization.organization_id in (${organization_id})`
      }
      ctx.query(totalSql, function (error, total, fields) {

        results.forEach((element, index) => {

          ctx.query("SELECT COUNT(*) total FROM vip_info WHERE organization_id=" + element.organization_id, function (_error, total2, fields) {
            element.vip_num = total2[0].total

            ctx.query("SELECT COUNT(*) total FROM member_info WHERE organization_id=" + element.organization_id, function (_error, total3, fields) {
              element.people_num = total3[0].total

              if (results.length - 1 == index) {
                return res.send({
                  code: 200,
                  total: total[0].total,
                  data: results
                })
              }
            });

          });

        });


      })
    })
  } else {
    return res.send({
      code: 400,
      message: '获取失败'
    })
  }
})
// 获取推荐社团(降序)
router.get('/recommendOrganization', async (req, res) => {
  const { page, limit } = req.query
  const sql = `
    SELECT
	* 
FROM
	organization ORDER BY people_num DESC LIMIT ${(page - 1) * limit},${limit} `
  if (page && limit) {
    ctx.query(sql, function (error, results, fields) {
      const totalSql = `
            SELECT
            COUNT(*) total
        FROM
            organization
            `
      ctx.query(totalSql, function (error, total, fields) {
        return res.send({
          code: 200,
          total: total[0].total,
          data: results
        })
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '获取失败'
    })
  }
})
//删除社团
router.delete('/organization', async (req, res) => {
  const { organization_id } = req.query
  if (organization_id) {
    const sql = `DELETE FROM organization WHERE organization_id in (${organization_id})`

    const sql1 = `DELETE FROM org_info where organization_id in (${organization_id})`
    const sql2 = `DELETE FROM member_info where organization_id in (${organization_id})`
    const sql3 = `DELETE FROM vip_info where organization_id in (${organization_id})`
    const sql4 = `DELETE FROM vip_info where organization_id in (${organization_id})`
    ctx.query(sql1)
    ctx.query(sql2)
    ctx.query(sql3)
    ctx.query(sql4)
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
// 添加社团
router.post('/organization', async (req, res) => {
  const {
    organization_name,
    department_id,
    icon,
    introduction,
    user_id,
    tenet,
    brandName,
    brandContent,
    associType
  } = req.body
  if (organization_name && department_id) {
    const isExits = `SELECT 1 FROM \`organization\` WHERE \`organization_name\` = '${organization_name}'`
    const sql = `INSERT INTO \`organization\`(\`organization_name\`,\`department_id\`,\`icon\`,\`introduction\`,\`user_id\`,\`tenet\`,\`brandName\`,\`brandContent\`,\`associType\`) VALUES ('${organization_name}','${department_id}','${icon}','${introduction}','${user_id}','${tenet}','${brandName}','${brandContent}','${associType}')`
    ctx.query(isExits, function (error, results, fields) {
      if (results.length !== 0) {
        return res.send({
          code: 400,
          message: '该社团名称已存在'
        })
      }
      ctx.query(sql, function (error, results1, fields) {
        if (!results1) {
          return res.send({
            code: 500,
            message: '服务器错误'
          })
        }

        return res.send({
          code: 200,
          message: '添加社团成功',
          data: results1
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
//修改社团信息
router.put('/organization', async (req, res) => {
  const {
    organization_id,
    organization_name,
    department_id,
    icon,
    introduction,
    user_id,
    tenet,
    brandName,
    brandContent,
    associType
  } = req.body
  if (organization_id) {
    const sql = `
        UPDATE \`organization\` SET \`associType\` = '${associType}',  \`brandContent\` = '${brandContent}', \`brandName\` = '${brandName}',\`tenet\` = '${tenet}',\`organization_name\` = '${organization_name}',\`department_id\` = '${department_id}',\`icon\` = '${icon}',\`introduction\` = '${introduction}',\`user_id\` = '${user_id}' WHERE \`organization_id\` = ${organization_id}
        `
    ctx.query(sql, function (error, results, fields) {
      if (results.length === 0) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '修改社团信息成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '社团id不存在！'
    })
  }
})

router.put('/organization1', async (req, res) => {
  const { organization_id, status, user_id } = req.body
  if (organization_id && user_id) {
    const sql = `
        UPDATE \`organization\` SET \`status\` = '${status}' WHERE \`organization_id\` = ${organization_id}
        `
    ctx.query(sql, function (error, results, fields) {
      const sql1 = `insert into org_info(user_id, organization_id) values(${user_id}, ${organization_id})`
      ctx.query(sql1)
      if (results.length === 0) {
        return res.send({
          code: 500,
          message: '服务器错误'
        })
      }
      return res.send({
        code: 200,
        message: '修改社团信息成功',
        data: results[0]
      })
    })
  } else {
    return res.send({
      code: 400,
      message: '社团id不存在！'
    })
  }
})

// 条件筛选社团
router.get('/organizationByCondition', async (req, res) => {
  // 0 默认
  // orderWay 1升序 2降序
  const { department_id, orderWay } = req.query
  let sql
  if (department_id == 0) {
    if (orderWay == 0) {
      sql = `SELECT * FROM organization`
    } else {
      sql = `SELECT * FROM organization ORDER BY people_num ${orderWay == 1 ? 'ASC' : 'DESC'
        }`
    }
  } else {
    sql = `SELECT * FROM organization WHERE department_id = ${department_id}`
    if (orderWay == 0) {
      sql = `SELECT * FROM organization WHERE department_id = ${department_id}`
    } else {
      sql = `SELECT * FROM organization WHERE department_id = ${department_id} ORDER BY people_num ${orderWay == 1 ? 'ASC' : 'DESC'
        }`
    }
  }
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
        message: '获取社团信息成功'
      })
    }
  })
})

// 获取社团管理员的审核列表
router.get('/getOrganizationManager', async (req, res) => {
  const { oid, status } = req.query
  let sql = `
    SELECT
	* 
FROM
	organization
	INNER JOIN user_department 
WHERE
	organization.organization_id = user_department.oid 
  AND user_department.oid in ${oid}
  `
  if (status != -1) {
    sql += `AND user_department.status = ${status}`
  }

  ctx.query(sql, function (error, results, fields) {
    return res.send({
      code: 200,
      data: results
    })
  })

})

module.exports = router