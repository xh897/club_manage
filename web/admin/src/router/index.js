import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  // 社团管理
  {
    path: '/organization',
    component: Layout,
    redirect: "/organization/list",
    meta: {
      title: "社团管理",
      icon: "el-icon-setting"
    },
    children: [{
      path: "/organization/list",
      component: () =>
        import("@/views/organization/list"),
      meta: {
        title: "社团列表",
        icon: "el-icon-document"
      }
    },
    {
      path: "/organization/orgInfo",
      component: () =>
        import("@/views/organization/OrgInfo"),
      meta: {
        title: "社团信息",
        icon: "el-icon-more-outline",
        shetuan: true
      }
    }],

  },
  // 权限管理
  {
    path: '/permission',
    component: Layout,
    meta: {
      title: "权限管理",
      icon: "el-icon-lock"
    },
    children: [
      {
        path: "/Permission/ChangePassword",
        component: () =>
          import("@/views/Permission/changePassword"),
        meta: {
          title: "修改密码",
          icon: "el-icon-edit"
        }
      },
      {
        path: "/Permission/list",
        component: () =>
          import("@/views/Permission/list"),
        meta: {
          title: "社团管理员管理",
          icon: "el-icon-user",
          shetuan: true
        }
      },
      {
        path: "/Permission/list1",
        component: () =>
          import("@/views/Permission/list1"),
        meta: {
          title: "社团管理员管理",
          icon: "el-icon-user"
        }
      }
    ],
  },
  // 用户管理
  {
    path: '/userManage',
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "el-icon-user"
    },
    children: [{
      path: "/userManage/list",
      component: () =>
        import("@/views/userManage/list"),
      meta: {
        title: "所有用户信息",
        icon: "el-icon-user"
      }
    },
    //  {
    //   path: "/userManage/memberInfo",
    //   component: () =>
    //     import("@/views/userManage/memberInfo"),
    //   meta: {
    //     title: "社团成员信息",
    //     icon: "el-icon-user",
    //     shetuan: true,
    //   }
    // },
     {
      path: "/userManage/vipInfo",
      component: () =>
        import("@/views/userManage/vipInfo"),
      meta: {
        title: "社团成员信息",
        icon: "el-icon-user",
        shetuan: true,
      }
    }],
  },
  // 发布管理
  {
    path: "/announceManage",
    component: Layout,
    meta: {
      title: "发布管理",
      icon: "el-icon-s-promotion"
    },
    children: [{
      path: '/announceManage/clubRecuit',
      component: () => import('@/views/AnnounceManage/clubRecuit'),
      meta: {
        title: "社团招新",
        icon: "el-icon-tickets",
        shetuan: true
      },
    }, {
      path: '/announceManage/clubActivityManage',
      component: () => import('@/views/AnnounceManage/clubActivityManage'),
      meta: {
        title: "社团活动",
        icon: "el-icon-tickets",
        shetuan: true
      }
    }, {
      path: '/announceManage/clubAnnouceManage',
      component: () => import('@/views/AnnounceManage/clubAnnouceManage'),
      meta: {
        title: "社团公告",
        icon: "el-icon-tickets",
        shetuan: true
      }
    }, {
      path: '/announceManage/sysAnnounceManage',
      component: () => import('@/views/AnnounceManage/sysAnnounceManage'),
      meta: {
        title: "系统公告",
        icon: "el-icon-tickets",
      }
    }]
  },
  // 留言管理
  {
    path: '/comment/list',
    component: Layout,
    meta: {
      title: '留言管理',
      icon: 'el-icon-date'
    },
    children: [{
      path: '/comment/list',
      component: () => import('@/views/Comment/list'),
      meta: {
        title: '留言列表',
        icon: 'el-icon-date'
      },
    }]
  },
  // 审核管理
  {
    path: "/audit",
    component: Layout,
    meta: {
      title: "审核管理",
      icon: "el-icon-s-check"
    },
    children: [{
      path: "/audit/orgApply",
      component: () =>
        import("@/views/Audit/clubApply"),
      meta: {
        title: "新社团创建申请",
        icon: "el-icon-user"
      }
    },
    {
      path: "/audit/vipApply",
      component: () =>
        import("@/views/Audit/vipApply"),
      meta: {
        title: "会员申请",
        icon: "el-icon-setting",
        shetuan: true,
      },
    },
    {
      path: "/audit/positionApply",
      component: () =>
        import("@/views/Audit/positionApply"),
      meta: {
        title: "职位申请",
        icon: "el-icon-setting",
        shetuan: true,
      },
    },
    {
      path: "/audit/quitApply",
      component: () =>
        import("@/views/Audit/quitApply"),
      meta: {
        title: "退出社团申请",
        icon: "el-icon-setting",
        shetuan: true,
      },
    },
    {
      path: "/audit/activityApply",
      component: () =>
        import("@/views/Audit/activityApply"),
      meta: {
        title: "参加活动申请",
        icon: "el-icon-setting",
        shetuan: true,
      },
    },
    ],
    
  },
  // 类别管理
  {
    path: "/classification",
    component: Layout,
    redirect: "/typeManage/branchtype",
    meta: {
      title: "类别管理",
      icon: "el-icon-house"
    },
    children: [
      {
        path: "/typeManage/facMajclass",
        component: () =>
          import("@/views/TypeManage/FacMajClass"),
        meta: {
          title: "学院",
          icon: "el-icon-office-building"
        }
      },
      {
        path: "/typeManage/major",
        component: () => import("@/views/TypeManage/Major"),
        meta: {
          title: '专业',
          icon: 'el-icon-office-building'
        }
      },
      {
        path: "/typeManage/class",
        component: () => import("@/views/TypeManage/Class"),
        meta: {
          title: '班级',
          icon: 'el-icon-office-building'
        }
      },
      {
        path: "/typeManage/clubtype",
        component: () =>
          import("@/views/TypeManage/clubType"),
        meta: {
          title: "社团类别",
          icon: "el-icon-office-building",
          shetuan: true
        }
      },
      {
        path: "/typeManage/branchtype",
        component: () =>
          import("@/views/TypeManage/BranchType"),
        meta: {
          title: "部门类别",
          icon: "el-icon-office-building",
          shetuan: true
        }
      },
      {
        path: "/typeManage/jobType",
        component: () =>
          import("@/views/TypeManage/jobType"),
        meta: {
          title: "职位类别",
          icon: "el-icon-office-building",
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: "/",
    redirect: "/organization/list"
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
/**
 * vue-router 注册的路由信息都是存放在matcher之中的，所以当我们想清空路由的时候，
 *  我们只要新建一个空的Router实例，将它的matcher重新赋值给我们之前定义的路由就可以了。巧妙的实现了动态路由的清除。
 *  现在我们只需要调用resetRouter，就能得到一个空的路有实例，之后你就可以重新addRoutes你想要的路由了
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
