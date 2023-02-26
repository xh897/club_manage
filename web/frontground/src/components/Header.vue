<template>
  <div class="wrap">
    <div class="head-box">
      <p style="flex: 1">中南林业科技大学涉外学院学生社团</p>
      <div style="margin-right: 50px; ">
        <el-button v-if="!userInfo.username"  @click="resgPage">注册</el-button>
        <el-button v-if="!userInfo.username" @click="loginPage">登录 </el-button>
      </div>
    </div>
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgb(0,115,170)"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :router="true">
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/organization">
          <i class="el-icon-menu"></i>
          <span slot="title">社团介绍</span>
        </el-menu-item>
        <el-menu-item index="/activityList">
          <i class="el-icon-document"></i>
          <span slot="title">社团活动</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-date"></i>
          <span slot="title">留言板</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <i class="el-icon-setting"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="/personalInfo" class="user-box">
          <img style="width: 50px; height: 50px; border-radius: 50%"
          :src="userInfo.avatar ? imgUrl + userInfo.avatar : default_img" alt=""/>
          <span class="username-box">{{ userInfo.username }}</span>
          <span class="quit-box" @click="handleLogout">退出</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: this.activeIndex,
      userInfo: {},
      imgUrl: process.env.VUE_APP_IMG_URL,
      default_img: require('../assets/images/head.png')
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    // 注册
    resgPage() {
      this.$router.push('/register')
    },
    // 登录
    loginPage() {
      this.$router.push("/login");
    },
    // 退出
    handleLogout() {
      this.$store.dispatch("logout")
      this.$router.push('/home')
      this.$message.success("成功退出登录")
      location.reload()
    },

    async getUserInfo() {
    const { data = {} } = await this.$http.getUserInfo()
    if (this.$route.path == "/personal") {
        if (data.code == 401) {
          this.$message.error("您未登录，请登录后查看");
          this.$router.push(`/login`);
          return;
        }
      }
      this.userInfo = data.data || {}
  }
  },
  
}
</script>

<style lang="scss" scoped>
.wrap {
  .head-box {
    align-items: center;
    display: flex;
    font-size: 30px;
    width: 100%;
    height: 100px;
    text-align: center;
    margin: 0 auto;
    background: url(../assets/images/bg1.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    color: rgb(0, 115, 170);
    font-weight: bold;
    font-family: cursive;
  }
  .el-col {
    .el-menu-vertical-demo {
      padding-left: 7.5%;
      .user-box:hover {
        background-color: rgb(0, 115, 170) !important;
      }
      .user-box {
        float: right;
        margin-right: 12%;
        .username-box {
          margin: auto 5px;
          font-size: 17px;
        }
        .username-box:hover,
        .quit-box:hover {
          color: rgb(255, 208, 75);
        }
        .quit-box {
          margin-left: 10px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>