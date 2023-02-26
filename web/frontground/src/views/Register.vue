<template>
  <div class="boxall">
    <div>
      <el-card class="login_form">
        <el-form>
          <el-form-item>
            <span slot="label">
              <span style="color: rgb(5, 49, 72)">用户名</span>
            </span>
            <el-input
              v-model="registerForm.username"
              label="输入用户名："
              placeholder="请输入用户名"
              required
            />
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <span style="color: rgb(5, 49, 72)">学号</span>
            </span>
            <el-input
              v-model="registerForm.stuId"
              label="输入学号："
              placeholder="请输入学号"
              required
            />
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <span style="color: rgb(5, 49, 72)">密码</span>
            </span>
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              required
            />
          </el-form-item>
          <el-form-item>
            <span slot="label">
              <span style="color: rgb(5, 49, 72)">确认密码</span>
            </span>
            <el-input
              type="password"
              v-model="registerForm.newpassword"
              placeholder="请再次确认密码"
              required
            />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button @click="coonfirmRegister">注册</el-button>
          <el-button @click="goLogin">返回登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // showRegister: true,
      // disabled: false,
      // codeActive: false,
      //注册信息
      registerForm: {
        username: "",
        nickname: "",
        phone: "",
        password: "",
        newpassword: "",
      },
    };
  },
  methods: {
    //点击返回时
    goLogin() {
      this.$router.push("/login");
    },
    //   用户注册
    async coonfirmRegister() {
      if (
        this.registerForm.username === "" ||
        this.registerForm.stuId === "" ||
        this.registerForm.password === "" ||
        this.registerForm.newpassword === ""
      ) {
        this.$message.error("请输入完整的注册信息");
        return;
      }

      if (
        this.registerForm.password === "" &&
        this.registerForm.newpassword === ""
      ) {
        this.$message.error("请输入完整的注册信息");
        return;
      }

      if (
        this.registerForm.password !== this.registerForm.newpassword &&
        this.registerForm.password !== "" &&
        this.registerForm.newpassword !== ""
      ) {
        this.$message.error("两次输入的密码不一致");
        return;
      }

      if (
        this.registerForm.username !== "" &&
        this.registerForm.stuId !== "" &&
        this.registerForm.password !== "" &&
        this.registerForm.newpassword !== ""
      ) {
        const { data: res } = await this.$http.register(this.registerForm);
        // console.log(res);
        if (res.code === 400) {
          this.$message.error(res.message);
          return;
        }
        if (res.code === 200) {
          this.$message.success(res.message);
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style lang="scss" scope>
.boxall {
  height: 520px;
  min-height: 450px;
  margin: 0 auto;
  background: url(../assets/images/bg2.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.login_form {
  padding: 0.5rem;
  font-size: 0.7rem;
  width: 40%;
  margin: 2rem auto;
  color: rgb(5, 49, 72);

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
// .mine {
//   .top {
//     width: 100%;
//     height: 7rem;
//     position: relative;
//     overflow: hidden;
//     &:before {
//       position: absolute;
//       content: " ";
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       filter: blur(0.2rem);
//       background-repeat: no-repeat;
//       background-size: 100%;
//       transform: scale(1.2);
//     }
//     .user {
//       position: absolute;
//       top: 30%;
//       left: 50%;
//       transform: translateX(-50%);
//       display: flex;
//       align-items: center;
//       flex-direction: column;
//       .avatar {
//         overflow: hidden;
//         width: 2rem;
//         border-radius: 1rem;
//         height: 2rem;
//         img {
//           width: 100%;
//         }
//       }
//       .userinfo {
//         text-align: center;
//         color: #fff;
//         .username {
//           font-size: 0.4rem;
//           margin: 0.2rem;
//         }
//         .userinfo_detail {
//           font-size: 0.3rem;
//           span {
//             padding: 0 0.3rem;
//             background-color: #dd2a3b;
//             border-radius: 0.1rem;
//             margin-right: 0.3rem;
//           }
//         }
//       }
//     }
//   }
//   .bottom {
//     hr {
//       border-top: 0;
//     }
//     padding: 0.3rem;
//     background-color: #f9f9f9;
//     .info_item {
//       padding: 0.5rem;
//       margin-bottom: 0.2rem;
//       background-color: #fff;
//       border-radius: 0.2rem;
//       .info_top,
//       .info_center,
//       .info_bottom {
//         display: flex;
//         flex-direction: row;
//       }
//       .left {
//         font-size: 0.4rem;
//       }
//       .right {
//         font-size: 0.35rem;
//         color: #aaa;
//         margin-left: auto;
//       }
//     }
//   }
// }
</style>
