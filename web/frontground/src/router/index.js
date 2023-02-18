import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    name:'Home',
    component: () =>import ('@/views/Home')
  },
  {
    path: '/organization',
    name: 'Organization',
    component: () =>
      import ('@/views/Organization')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import ('@/views/Login'),
    meta: {isPublic: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import ('@/views/Register')
  },
  {
    path: '/activityList',
    name: 'ActivityList',
    component: () =>
      import ('@/views/ActivityList')
  },
  {
    path: '/comment',
    name: 'Comment',
    props: true,
    component: () =>
      import ('@/views/Comment')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () =>
      import ('@/views/Personal')
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () =>
      import ('@/views/PersonalInfo')
  }
]

const router = new VueRouter({
  routes
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if(!to.meta.isPublic && !localStorage.token) {
    return next('./login')
  }
  document.documentElement.scrollTop = 0
  next()
})


export default router
