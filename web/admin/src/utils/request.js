import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || window.location.origin,
  timeout: 300000
})
//请求拦截器：携带的token字段
service.interceptors.request.use(
  config => {
    // config.headers['token'] = 'Bearer ' + getToken()
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      return (location.href = "/login");
    }
    const res = response.data;
    if (!res.code) {
      return res;
    }
    if (res.code !== 200) {
      if (res.code === 205) {
        return res;
      }
      Message({
        message: res.message || "错误，请重试！",
        type: "error",
        duration: 5 * 1000
      });
      if (res.code === 401) {
        store.dispatch("user/logout").then(r =>
          Message({
            message: res.message
          })
        );
      }
      // store.dispatch("status/setLoading", false);
      return Promise.reject(new Error(res.message || "错误"));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    // store.dispatch("status/setLoading", false);
    return Promise.reject(error);
  }
);


class Request {
  // 管理员登录
  login(data) {
    return service({
      url: "/adminLogin",
      method: "post",
      data
    });
  };
  // 文件上传 
  upload(data) {
    return service({
      url: "/uploads/images",
      method: "post",
      data,
      timeout: 15000
    });
  }
  // 获取用户列表
  getAllUser(data) {
    return service({
      url: "/getAllUser",
      method: "get",
      params: data
    });
  }
  getUserInfo() {
    return service({
      url: "/getUserInfo",
      method: "get"
    });
  }
  // 获取社团会员列表
  getAllVip(data) {
    return service({
      url: "/getAllVip",
      method: "get",
      params: data
    });
  }
  // 获取社团成员列表
  getAllMember(data) {
    return service({
      url: "/getAllMember",
      method: "get",
      params: data
    });
  }
  // 获取用户列表
  getAllUser1(data) {
    return service({
      url: "/getAllUser1",
      method: "get",
      params: data
    });
  }
  // 获取用户列表
  getUserOrg(data) {
    return service({
      url: "/getUserOrg",
      method: "get",
      params: data
    });
  }
  postUserOrg(data) {
    return service({
      url: "/postUserOrg",
      method: "post",
      data
    });
  }
  deleteUserOrg(data) {
    return service({
      url: "/deleteUserOrg",
      method: "delete",
      data
    });
  }
  // 学院列表
  getDepartment(data) {
    return service({
      url: "/department",
      method: "get",
      params: data,
    });
  }
  addDepartment(data) {
    return service({
      url: "/department",
      method: "post",
      data
    });
  }
  setDepartment(data) {
    return service({
      url: "/department",
      method: "put",
      data
    });
  }
  deleteDepartment(data) {
    return service({
      url: "/department",
      method: "delete",
      params: data,
    });
  }
  // 专业列表
  getMajor(data) {
    return service({
      url: "/major",
      method: "get",
      params: data,
    })
  }
  addMajor(data) {
    return service({
      url: "/major",
      method: "post",
      data
    });
  }
  setMajor(data) {
    return service({
      url: "/major",
      method: "put",
      data
    });
  }
  deleteMajor(data) {
    return service({
      url: "/major",
      method: "delete",
      params: data
    });
  }
  // 班级
  getClass(data) {
    return service({
      url: "/class",
      method: "get",
      params: data
    });
  }
  addClass(data) {
    return service({
      url: "/class",
      method: "post",
      data
    });
  }
  setClass(data) {
    return service({
      url: "/class",
      method: "put",
      data
    });
  }
  deleteClass(data) {
    return service({
      url: "/class",
      method: "delete",
      params: data
    });
  };
  // 社团类别
  getClubType(data) {
    return service({
      url: "/club_type",
      method: "get",
      params: data
    });
  }
  addClubType(data) {
    return service({
      url: "/club_type",
      method: "post",
      data
    });
  }
  setClubType(data) {
    return service({
      url: "/club_type",
      method: "put",
      data
    });
  }
  deleteClubType(data) {
    return service({
      url: "/club_type",
      method: "delete",
      params: data
    });
  }
  // 部门类别
  getSectorInfo(data) {
    return service({
      url: "/sector_info",
      method: "get",
      params: data,
    });
  }
  addSectorInfo(data) {
    return service({
      url: "/sector_info",
      method: "post",
      data
    });
  }
  setSectorInfo(data) {
    return service({
      url: "/sector_info",
      method: "put",
      data
    });
  }
  deleteSectorInfo(data) {
    return service({
      url: "/sector_info",
      method: "delete",
      params: data
    });
  }

  // 职位类别
  getStuposition(data) {
    return service({
      url: "/stuposition",
      method: "get",
      params: data,
    });
  }
  addStuposition(data) {
    return service({
      url: "/stuposition",
      method: "post",
      data
    });
  }
  setStuposition(data) {
    return service({
      url: "/stuposition",
      method: "put",
      data
    });
  }
  deleteStuposition(data) {
    return service({
      url: "/stuposition",
      method: "delete",
      params: data
    });
  }

  // 获取用户列表
  getAllUser(data) {
    return service({
      url: "/getAllUser",
      method: "get",
      params: data
    });
  }
  // 管理员修改密码
  setUserInfoById1(data) {
    return service({
      url: "/setUserInfoById1",
      method: "put",
      data
    });
  }
  // 根据用户id修改用户信息
  setUserInfoById(data) {
    return service({
      url: "/setUserInfoById",
      method: "put",
      data
    });
  }
  setUserInfoById1(data) {
    return service({
      url: "/setUserInfoById1",
      method: "put",
      data
    });
  }
  // 添加用户
  register(data) {
    return service({
      url: "/register",
      method: "post",
      data
    });
  }
  // 添加社团会员
  postVipInfo(data) {
    return service({
      url: "/postVipInfo",
      method: "post",
      data
    });
  }
  // 添加社团成员
  postMemberInfo(data) {
    return service({
      url: "/postMemberInfo",
      method: "post",
      data
    });
  }
  // 根据用户id修改用户信息
  deleteUserInfoById(data) {
    return service({
      url: "/deleteUserInfoById",
      method: "put",
      data
    });
  }
  deleteVipById(data) {
    return service({
      url: "/deleteVipById",
      method: "put",
      data
    });
  }
  deleteMemberById(data) {
    return service({
      url: "/deleteMemberById",
      method: "put",
      data
    });
  }
  // 社团公告
  getOrgAfficheInfo(data) {
    return service({
      url: "/org_affiche_info",
      method: "get",
      params: data
    });
  }
  // 系统公告
  getAfficheInfo(data) {
    return service({
      url: "/affiche_info",
      method: "get",
      params: data
    });
  }
  addAfficheInfo(data) {
    return service({
      url: "/affiche_info",
      method: "post",
      data
    });
  }
  setAfficheInfo(data) {
    return service({
      url: "/affiche_info",
      method: "put",
      data
    });
  }
  deleteAfficheInfo(data) {
    return service({
      url: "/affiche_info",
      method: "delete",
      params: data
    });
  }

  // 社团
  getOrganization(data) {
    return service({
      url: "/organization",
      method: "get",
      params: data
    });
  }
  addOrganization(data) {
    return service({
      url: "/organization",
      method: "post",
      data
    });
  }
  setOrganization(data) {
    return service({
      url: "/organization",
      method: "put",
      data
    });
  }
  setOrganization1(data) {
    return service({
      url: "/organization1",
      method: "put",
      data
    });
  }
  deleteOrganization(data) {
    return service({
      url: "/organization",
      method: "delete",
      params: data
    });
  }
  // 活动
  getActivity(data) {
    return service({
      url: "/activity",
      method: "get",
      params: data
    });
  }
  addActivity(data) {
    return service({
      url: "/activity",
      method: "post",
      data
    });
  }
  setActivity(data) {
    return service({
      url: "/activity",
      method: "put",
      data
    });
  }
  deleteActivity(data) {
    return service({
      url: "/activity",
      method: "delete",
      params: data
    });
  }
  // 审批用户参加活动
  updateActivityStatus(data) {
    return service({
      url: "/activityStatus",
      method: "put",
      data
    });
  }

  // 留言
  getCommentList(data) {
    return service({
      url: "/comment_list",
      method: "get",
      params: data
    });
  }
  deleteCommentById(data) {
    return service({
      url: "/comment",
      method: "delete",
      params: data
    });
  }
  // 获取社团审核列表
  gatOrganizationAudit(data) {
    return service({
      url: "/organizationAudit",
      method: "get",
      params: data
    });
  }
  // 获取职位申请审核列表
  gatPositionAudit(data) {
    return service({
      url: "/PositionAudit",
      method: "get",
      params: data
    });
  }
  // 删除职位审核列表
  deletePositionAudit(data) {
    return service({
      url: "/PositionAudit",
      method: "delete",
      params: data
    });
  }
  gatQuitAudit(data) {
    return service({
      url: "/gatQuitAudit",
      method: "get",
      params: data
    });
  }
  // 审核用户
  setOrganizationAuditById(data) {
    return service({
      url: "/organizationAuditById",
      method: "put",
      data
    });
  }
  setPositionAuditById(data) {
    return service({
      url: "/PositionAuditById",
      method: "put",
      data
    });
  }
  // 审核退出社团
  setQuitAuditById(data) {
    return service({
      url: "/QuitAuditById",
      method: "put",
      data
    });
  }
  // 获取对应社团的活动申请
  getOrgActivity(data) {
    return service({
      url: "/orgActivity",
      method: "get",
      params: data
    });
  }
  // 删除对应社团的活动申请
  deleteOrgActivity(data) {
    return service({
      url: "/orgActivity",
      method: "delete",
      params: data
    });
  }
  // 审批用户参加活动
  updateActivityStatus(data) {
    return service({
      url: "/activityStatus",
      method: "put",
      data
    });
  }
  // 删除退出社团申请
  deleteUserquit_association_id(data) {
    return service({
      url: "/gatQuitAudit",
      method: "delete",
      params: data,
    });
  }
}

export default new Request
