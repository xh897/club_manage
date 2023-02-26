import axios from "axios";

// const baseApi = 'http://localhost:3000/api';
const baseApi = process.env.VUE_APP_BASE_API || window.location.origin;

const service = axios.create({
  baseURL: baseApi,
  timeout: 15000
});
service.interceptors.request.use(
  config => {
    if (localStorage.communityToken) {
      config.headers.token = localStorage.getItem("communityToken");
    }
    return config;
  },
  error => Promise.reject(error)
);
service.interceptors.response.use(
  response => {
    const res = response;
    if (!res.data.code) {
      return res;
    }
    if (res.data.code !== 200) {
      if (res.data.code === 205) {
        return res;
      }
      if (res.data.code === 400) {
        return res;
      }
      return res;
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

class Request {
  // 登录接口
  login(data) {
    return service({
      url: "/login",
      method: "post",
      data
    });
  }
  // 注册用户
  register(data) {
    return service({
      url: "/register",
      method: "post",
      data
    });
  }
  // 根据token获取用户个人信息
  getUserInfo() {
    return service({
      url: "/getUserInfo",
      method: "get"
    });
  }
  // 根据用户id获取个人信息
  getUserInfoById(data) {
    return service({
      url: "/getUserInfoById",
      method: "get",
      params: data
    });
  }
  // 上传图片接口
  uploadImage(data) {
    return service({
      url: "/uploads/images",
      method: "post",
      data,
      timeout: 15000
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
  // 获取首页轮播图
  getFirstBanner() {
    return service({
      url: "/banner",
      method: "get"
    });
  }
  // 获取推荐社团
  getRecommend(data) {
    return service({
      url: "/recommendOrganization",
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
  // 社团公告
  getOrgAfficheInfo(data) {
    return service({
      url: "/org_affiche_info",
      method: "get",
      params: data
    });
  }
  // 获取最新活动
  getActivity(data) {
    return service({
      url: "/activity",
      method: "get",
      params: data
    });
  }
  // getActivity(data) {
  //   return service({
  //     url: '/activity',
  //     method: 'get',
  //     params: data
  //   })
  // }
  //获取我的社团
  getMyOrg(data) {
    return service({
      url: "/getMyOrg",
      method: "get",
      params: data
    });
  }
  // 获取部门分类
  getDepartment() {
    return service({
      url: "/department",
      method: "get"
    });
  }
  // 条件筛选社团
  getOrganizationByCondition(data) {
    return service({
      url: "/organizationByCondition",
      method: "get",
      params: data
    });
  }
  getOrganizationById(data) {
    return service({
      url: "/getOrganizationById",
      method: "get",
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
  getAfficheInfoById(data) {
    return service({
      url: "/affiche_info/" + data,
      method: "get"
      // params: data
    });
  }
  // 用户加入社团
  joinOrganization(data) {
    return service({
      url: "/join",
      method: "post",
      data
    });
  }
  // 用户加入社团
  joinOrganization1(data) {
    return service({
      url: "/join1",
      method: "post",
      data
    });
  }
  // 获取活动文章详情
  getActivityById(data) {
    return service({
      url: "/activityById",
      method: "get",
      params: data
    });
  }
  // 用户参加活动
  userJoinActivity(data) {
    return service({
      url: "/joinAtivityById",
      method: "post",
      data
    });
  }
  // 退出社团申请
  logoutOrg(data) {
    return service({
      url: "/logoutOrg",
      method: "post",
      data
    });
  }
  // 获取广场的数据
  getSquare(data) {
    return service({
      url: "/square",
      method: "get",
      params: data
    });
  }
  // 根据id获取广场内容
  getSquareById(data) {
    return service({
      url: "/squareById",
      method: "get",
      params: data
    });
  }
  // 根据广场id获取评论列
  getComment(data) {
    return service({
      url: "/comment",
      method: "get",
      params: data
    });
  }
  // 获取所有评论
  getCommentList(data) {
    return service({
      url: "/comment_list",
      method: "get",
      params: data
    });
  }
  // 用户发布评论
  sendMessage(data) {
    return service({
      url: "/comment",
      method: "post",
      data
    });
  }
  // 用户删除发布评论
  deleteComment(data) {
    return service({
      url: "/comment",
      method: "delete",
      data,
      params: data
    });
  }
  // 删除自己的申请
  deleteByTableAndId(data) {
    return service({
      url: "/deleteByTableAndId",
      method: "delete",
      data,
    });
  }
  
  // 获取审核列表
  getOrganizationAuditById(data) {
    return service({
      url: "/organizationAuditById",
      method: "get",
      params: data
    });
  }
  // 获取审核列表
  getOrganizationAuditById1(data) {
    return service({
      url: "/organizationAuditById1",
      method: "get",
      params: data
    });
  }
   // 获取审核列表
   getOrganizationAuditById2(data) {
    return service({
      url: "/organizationAuditById2",
      method: "get",
      params: data
    });
  }
  // 获取退出社团申请列表
  getQuitByUserId(data) {
    return service({
      url: "/getQuitByUserId",
      method: "get",
      params: data
    });
  }
  // 参加活动申请
  getUserActivityByUserId(data) {
    return service({
      url: "/getUserActivityByUserId",
      method: "get",
      params: data
    });
  }

  getOrganizationManager(data) {
    return service({
      url: "/getOrganizationManager",
      method: "get",
      params: data
    });
  }
  // getOrganization(data) {
  //     return service({
  //       url: '/organization',
  //       method: 'get',
  //       params: data
  //     })
  //   }
  // 根据token获取我的活动
  getMyActivityByToken() {
    return service({
      url: "/getMyActivityByToken",
      method: "get"
    });
  }
  addActivity(data) {
    return service({
      url: "/activity",
      method: "post",
      data
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
  // 职位类别
  getStuposition(data) {
    return service({
      url: "/stuposition",
      method: "get",
      params: data
    });
  }

  // 获取最新活动
  getOrgActivity(data) {
    return service({
      url: "/orgActivity",
      method: "get",
      params: data
    });
  }

  // 用户参加活动
  updateActivityStatus(data) {
    return service({
      url: "/activityStatus",
      method: "put",
      data
    });
  }
  // 社团类别
  getClubType() {
    return service({
      url: "/club_type",
      method: "get"
    });
  }
  // 获取社团部门
  getOrgBranch(data) {
    return service({
      url: "/getOrgBranch",
      method: "get",
      params: data,
    });
  }
  // 社团类别
  getHuizhang(data) {
    return service({
      url: "/org_info_huizhang",
      method: "get",
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
  addOrganization(data) {
    return service({
      url: "/organization",
      method: "post",
      data
    });
  }
  // 文件上传
  upload(data) {
    return service({
      url: "/uploads/images",
      method: "post",
      data,
      timeout: 15000
    });
  }
  // 专业
  getMajor() {
    return service({
      url: '/major',
      method: 'get'
    })
  }
  // 班级
  getClass(data) {
    return service({
      url: '/class',
      method: 'get',
      params: data,
    })
  }
  // 部门类别
  getSectorInfo(data) {
    return service({
      url: "/sector_info",
      method: "get",
      params: data,
    });
  }
  getVipNum(data) {
    return service({
      url: "/getVipNum",
      method: "get",
      params: data,
    });
  }
  //删除创建社团申请
  deleteOrganization(data) {
    return service({
      url: "/organization",
      method: "delete",
      params: data
    });
  }
}
export default new Request();
