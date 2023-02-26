<template>
    <div class="amazing-wrap" style="width:1200px">
      <el-card>
        <el-form v-show="!table" label-width="100px">
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
    components: {
  
    },
    data() {
      return {
        tableData: [],
        table: false,
        editing: true,
        currentPage: 1,
        loading: false,
        pageSize: 20,
        total: 0,
        options: [],
        selected: -1,
        searchText: "",
        model: {
          nickname: "",
          sex: "",
          phone: "",
          avatar: "",
          password1: "",
          password3: "",
          password2: "",
        },
        baseImg: process.env.VUE_APP_IMG_URL,
        options1: [],
        options2: [],
        options3: [],
        options4: []
      };
    },
    async mounted() {
      this.fetch();
      this.getUserInfo();
      this.bFetch();
      this.bFetch1();
      this.bFetch3();
    },
    watch: {
      "model.stuFaculty"(newVal, oldVal) {
        this.options2 = this.options1.filter(it => it.faculty == newVal);
  
      },
      "model.stuMajor"(newVal, oldVal) {
        this.options4 = this.options3.filter(it => it.major_id == newVal);
  
      }
    },
    methods: {
      handleChange(value) {
        this.options2 = this.options1.filter(it => it.faculty == value);
        this.model.stuMajor = "";
        this.model.stuClass = "";
      },
      handleChange1(value) {
        this.options4 = this.options3.filter(it => it.major_id == value);
        this.model.stuClass = "";
      },
      async bFetch3() {
        const { data } = await this.$http.getClass({
          page: this.currentPage,
          limit: 10000
        });
        this.options3 = data;
        this.options4 = data;
      },
      async bFetch1() {
        const { data } = await this.$http.getMajor();
        this.options1 = data;
        this.options2 = data;
      },
      async bFetch() {
        const { data } = await this.$http.getDepartment();
        this.options = data;
      },
      async getUserInfo() {
        const { data } = await this.$http.getUserInfo();
        this.userInfo = data;
        this.model = {
          ...data,
          password1: "",
          password3: "",
          password2: "",
        };
      },
      handleEdit(data) {
        this.editing = true;
        this.model = data;
        this.table = false;
      },
      async fetch() {
        this.loading = true;
        const data = await this.$http.getAllUser({
          page: this.currentPage,
          limit: this.pageSize
        });
        if (data.length === 0 && this.currentPage !== 1) {
          this.currentPage--;
          this.fetch();
        }
        this.tableData = data.data;
        this.total = data.total;
        this.loading = false;
      },
      handleDelete(row) {
        this.$confirm("是否确定删除该用户", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.$http.deleteUserInfoById({
              user_id: row.user_id
            });
  
            this.$message.success("删除成功！");
            this.fetch();
          })
          .catch(() => {});
      },
      openAdd() {
        this.model = {
          nickname: "",
          sex: "",
          phone: "",
          avatar: ""
        };
  
        this.editing = false;
        this.table = !this.table;
      },
      goEdit(data) {
        this.editing = true;
        this.model = data;
  
        this.table = false;
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
      handleSearchRadio() {
        this.searchText = "";
        this.currentPage = 1;
        this.fetch();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetch();
      },
      async uploading(e) {
        if (e.target.files.length === 0) {
          return;
        }
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const data = await this.$http.upload(formData);
        this.model.avatar = data.filename;
      }
    }
  };
  </script>
  
  <style></style>
  