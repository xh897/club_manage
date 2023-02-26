<template>
  <div
    class="amazing-wrap"
    style="width: 85%; margin: 0 auto; margin-bottom: 20px">
    <br />
    <el-card>
      <el-form v-show="!table" label-width="100px">
        <el-form-item label="学号" v-if="this.editing" style="width: 295px">
          <el-input
            v-model="model.stuId"
            placeholder="请输入学号"
            size="mini"
            disabled
          />
        </el-form-item>

        <el-form-item label="用户名" v-if="this.editing" style="width: 295px">
          <el-input
            v-model="model.username"
            placeholder="请输入用户名"
            size="mini"
            disabled
          />
        </el-form-item>

        <el-form-item label="用户密码" style="width: 295px">
          <el-input
            v-model="model.password"
            placeholder="不修改密码请填空"
            size="mini"
            type="password"
          />
        </el-form-item>

        <el-form-item label="选择学院">
          <el-select
            v-model="model.stuFaculty"
            placeholder="请选择学院"
            size="mini"
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择专业">
          <el-select
            v-model="model.stuMajor"
            placeholder="请选择专业"
            size="mini"
            @change="handleChange1"
          >
            <el-option
              v-for="item in options2"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择班级">
          <el-select
            v-model="model.stuClass"
            placeholder="请选择班级"
            size="mini"
          >
            <el-option
              v-for="item in options4"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" v-if="this.editing" style="width: 295px">
          <el-input
            v-model="model.phone"
            placeholder="请输入手机号"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="用户昵称" v-if="this.editing" style="width: 295px">
          <el-input
            v-model="model.nickname"
            placeholder="请输入用户昵称"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="用户性别" v-if="this.editing">
          <el-radio-group v-model="model.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传用户头像" v-if="this.editing">
          <input type="file" accept="image/*" @change="uploading" />
        </el-form-item>
        <el-form-item label="头像预览" v-if="this.editing">
          <el-image
            :src="baseImg + model.avatar"
            style="width: 100px; height: 100px"
            fit="cover"
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
  components: {},
  data() {
    return {
      table: false,
      editing: true,
      currentPage: 1,
      loading: false,
      pageSize: 20,
      total: 0,
      options: [],
      selected: -1,
      searchText: "",
      //用户提交信息
      model: {
        nickname: "",
        sex: "",
        phone: "",
        avatar: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL ,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
    };
  },
  async mounted() {
    //初始化用户信息
    this.getUserInfo();
    this.bFetch();
    this.bFetch1();
    this.bFetch3();
  },
  watch: {},
  methods: {
    //学院切换
    handleChange(value) {
      this.options2 = this.options1.filter((it) => it.faculty == value);
      this.model.stuMajor = "";
      this.model.stuClass = "";
    },
    //专业切换
    handleChange1(value) {
      this.options4 = this.options3.filter((it) => it.major_id == value);
      this.model.stuClass = "";
    },
    //获取班级
    async bFetch3() {
      const { data } = await this.$http.getClass({
        page: 1,
        limit: 10000,
      });
      this.options3 = data.data;
      this.options4 = data.data;
    },
    //获取专业
    async bFetch1() {
      const { data } = await this.$http.getMajor();
      this.options1 = data.data;
      this.options2 = data.data;
    },
    //获取学院
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      this.options = data.data;
    },
    //获取用户信息
    async getUserInfo() {
      const { data } = await this.$http.getUserInfo();
      this.userInfo = data.data;
      this.model = data.data;
      this.model = data.data;
      this.model.password = "";
    },
    //提交保存用户信息
    async handleConfirm(type) {
      if (this.model.nickname === "") {
        return this.$message.info("请输入用户昵称");
      }
      if (this.isEditing && this.model.avatar === "") {
        return this.$message.info("请上传用户头像");
      }

      if (!this.isEditing && this.model.username === "") {
        return this.$message.info("请输入用户名");
      }

      const { data, code } = await this.$http.setUserInfoById(this.model);
      if (data.code === 400) {
        return this.$message.error(data.message);
      }

      this.$message.success("保存成功！");
      this.$router.push("/home")
      location.reload();
    },
    // 上传图片
    async uploading(e) {
      if (e.target.files.length === 0) {
        return;
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const data = await this.$http.upload(formData);
      this.model.avatar = data.data.filename;
    },
  },
};
</script>

<style></style>
