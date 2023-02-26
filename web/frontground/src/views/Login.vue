<template>
  <div class="boxall">
    <div v-if="showLogin">
      <el-card class="login_form">
        <div class="title" style="font-size: 30px">用户登录</div>
        <el-form>
          <el-form-item>
            <span slot="label">
              <span style="color: #fff">用户名</span>
            </span>
            <el-input
              v-model="loginForm.username"
              label="用户名："
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <span style="color: #fff">密码</span>
            </span>
            <el-input
              v-model="loginForm.password"
              label="密码："
              placeholder="请输入密码"
              type="password"
            />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button @click="login">登 录</el-button>
          <el-button @click="goRegister">注册账号</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      //显示登录窗口
      showLogin: true,
      disabled: false,
      codeActive: false,
      //提交登录信息
      loginForm: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    //点击注册时
    goRegister() {
      this.$router.push("/register");
    },
    //点击登录时
    goLogin() {
      this.showRegister = false;
      this.showLogin = true;
    },
    //用户登录
    async login() {
      if (this.loginForm.username === "" ) {
        this.$message.error("请输入用户名");
      }
      if (this.loginForm.username === "" && this.loginForm.password !== "") {
        this.$message.error("请输入用户名");
      }
      if (this.loginForm.username !== "" && this.loginForm.password === "") {
        this.$message.error("请输入密码");
      }
      const { data: data } = await this.$http.login(this.loginForm);
      // console.log(data);
      if (data.code === 400) {
        this.$message.error(data.message);
        return;
      }
      this.$message.success(data.message);
      this.$store.dispatch("setUser", data);
      this.$router.push("/personalInfo");
    },
  },
};
</script>
  <style lang="scss" scope>
.boxall {
  height: 500px;
  min-height: 450px;
  background: url(../assets/images/bg2.png) no-repeat;
  background-size: 100% 100%;
}

.login_form {
  padding: 0.5rem;
  font-size: 0.7rem;
  width: 40%;
  margin: 2rem auto;
  color: #fff;

  .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    height: 65px;
  }

  .btn {
    text-align: center;
    .el-button {
      cursor: pointer;
      background: rgb(0, 115, 170);
      border: 1px solid #dcdfe6;
      color: #fff;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .el-button:last-child {
      background-color: #fff;
      color: #000;
    }
  }
}
form {
  margin-top: 1rem;
  input {
    width: 8rem;
    height: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.45rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
  }
}
.mine {
  .top {
    width: 100%;
    height: 7rem;
    position: relative;
    overflow: hidden;
    &:before {
      position: absolute;
      content: " ";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(0.2rem);
      background-repeat: no-repeat;
      background-size: 100%;
      transform: scale(1.2);
    }
    .user {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      flex-direction: column;
      .avatar {
        overflow: hidden;
        width: 2rem;
        border-radius: 1rem;
        height: 2rem;
        img {
          width: 100%;
        }
      }
      .userinfo {
        text-align: center;
        color: #fff;
        .username {
          font-size: 0.4rem;
          margin: 0.2rem;
        }
        .userinfo_detail {
          font-size: 0.3rem;
          span {
            padding: 0 0.3rem;
            background-color: #dd2a3b;
            border-radius: 0.1rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
  .bottom {
    hr {
      border-top: 0;
    }
    padding: 0.3rem;
    background-color: #f9f9f9;
    .info_item {
      padding: 0.5rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      border-radius: 0.2rem;
      .info_top,
      .info_center,
      .info_bottom {
        display: flex;
        flex-direction: row;
      }
      .left {
        font-size: 0.4rem;
      }
      .right {
        font-size: 0.35rem;
        color: #aaa;
        margin-left: auto;
      }
    }
  }
}
</style>