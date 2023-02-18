<template>
    <div class="amazing-wrap" style="width:1200px">
      <el-card>
        <el-form label-width="100px">
          <el-form-item label="原密码">
            <el-input
              v-model="model.password1"
              placeholder="请输入原密码"
              size="mini"
              type="text"
            />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="model.password2"
              placeholder="请输入新密码"
              size="mini"
              type="text"
            />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="model.password3"
              placeholder="请输入确认密码"
              size="mini"
              type="text"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="success" @click="handleConfirm(2)"
              >保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  
  
  export default {
    data() {
      return {
        table: false,
        model: {
          nickname: "",
          sex: "",
          phone: "",
          avatar: "",
          password1: "",
          password3: "",
          password2: "",
        },
      };
    },
    async mounted() {
      this.fetch();
      this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        const { data } = await this.$http.getUserInfo(password1);
        this.userInfo = data;
        this.model = {
          ...data,
          password1: "",
          password3: "",
          password2: "",
        };
      },
      async handleConfirm(type) {
        if (this.model.password1 === "") {
          return this.$message.info("请输入原密码");
        }
        if (this.model.password2 === "") {
          return this.$message.info("请输入新密码");
        }
        if (this.model.password3 === "") {
          return this.$message.info("请输入确认密码");
        }
        if (this.model.password2 !== this.model.password3) {
          return this.$message.info("两次输入密码不一致");
        }
        const { data } = await this.$http.setUserInfoById1(this.model);
        this.$message.success("操作成功！");
        this.fetch();
        this.$router.push('/login')
      },
    }
  };
  </script>
  
  <style></style>
  