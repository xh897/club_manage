<template>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="社团管理员列表" />
      <el-button
        style="margin: 10px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加社团管理员" : "返回" }}
      </el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="社团名称/用户名" style="margin: 0 10px">
          <el-input
            v-model="formInline.data"
            placeholder="社团名称/用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
      <br />
      <el-card style="margin: 0 10px">
        <div v-show="table" class="table">
          <el-button
            style="margin: 10px"
            size="mini"
            type="danger"
            @click="multipleDelete"
            >多选删除
          </el-button>
          <el-table
            v-loading="loading"
            :height="650"
            size="mini"
            stripe
            border
            :data="tableData"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" align="center">
            </el-table-column>
            <el-table-column label="序号" type="index" align="center" />
            <el-table-column
              label="社团名称"
              prop="organization_name"
              align="center"
            />
            <el-table-column label="用户名" prop="username" align="center" />
            <el-table-column label="学院" prop="department_name" align="center" />
            <el-table-column label="专业" prop="major_name" align="center" />
            <el-table-column label="专业" prop="class_name" align="center" />
            <el-table-column label="学号" prop="stuId" align="center" />
            <el-table-column label="手机号" prop="phone" align="center" />
            <el-table-column label="性别" align="center" prop="sex" />
            <el-table-column
              label="用户头像 (点击放大)"
              align="center"
              width="150px">
              <template slot-scope="scope">
                <el-image
                  :src="baseImg + scope.row.avatar"
                  :preview-src-list="[baseImg + scope.row.avatar]"
                  style="width: 40px; height: 40px"
                  fit="cover"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="100px">
              <template slot-scope="scope">
                {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="text-align: center">
            <el-pagination
              background
              :current-page="currentPage"
              :page-sizes="[15, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <el-form v-show="!table" label-width="100px">
          <el-form-item label="选择用户" v-if="!this.editing">
            <el-select
              v-model="model.user_id"
              placeholder="请选择用户"
              size="mini"
              @change="handleChange1"
            >
              <el-option
                v-for="item in userList"
                :key="item.user_id"
                :label="item.username"
                :value="item.user_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择社团" v-if="!this.editing">
            <el-select
              v-model="model.organization_id"
              placeholder="请选择社团"
              size="mini"
            >
              <el-option
                v-for="item in userOrgList"
                :key="item.organization_id"
                :label="item.organization_name"
                :value="item.organization_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" v-if="this.editing">
            <el-input
              v-model="model.username"
              placeholder="请输入用户名"
              size="mini"
              disabled
            />
          </el-form-item>
  
          <el-form-item label="选择学院" v-if="this.editing">
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
          <el-form-item label="选择专业" v-if="this.editing">
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
          <el-form-item label="选择班级" v-if="this.editing">
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
          <el-form-item label="用户昵称" v-if="this.editing">
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
    data() {
      return {
        formInline: {
          data: "",
        },
        tableData: [],
        table: true,
        editing: false,
        currentPage: 1,
        loading: false,
        pageSize: 15,
        total: 0,
        options: [],
        selected: -1,
        searchText: "",
        model: {
          nickname: "",
          sex: "",
          phone: "",
          avatar: "",
        },
        baseImg: process.env.VUE_APP_IMG_URL,
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        userList: [],
        userOrgList: [],
        multipleSelection: [],
      };
    },
    async mounted() {
      this.fetch();
      await this.getUserInfo();
      this.getUserList();
      this.getUserOrg();
      this.bFetch();
      this.bFetch1();
      this.bFetch3();
    },
    methods: {
      handleSelectionChange(val) {
  
        this.multipleSelection = val;
      },
      async multipleDelete() {
        if (!this.multipleSelection.length) {
          return alert("请选择具体一个社团管理员");
        }
        this.handleDelete(
          this.multipleSelection.map((item) => item.id).join(",")
        );
  
      },
      async getUserList() {
  
        const data = await this.$http.getAllUser({
          page: this.currentPage,
          limit: 10000,
        });
  
        if (Array.isArray(data.data)) {
          this.userList = data.data.filter(
            (item) => item.user_id != this.userInfo.user_id
          );
        }
      },
      async getUserOrg() {
        const data = await this.$http.getUserOrg({
          page: this.currentPage,
          limit: 10000,
          user_id: this.userInfo.user_id || this.$store.state.user.name,
        });
        if (Array.isArray(data.data)) {
          this.userOrgList = data.data;
        }
      },
      handleChange(value) {
        this.options2 = this.options1.filter((it) => it.faculty == value);
        this.model.stuMajor = "";
        this.model.stuClass = "";
      },
      handleChange1(value) {
        this.options4 = this.options3.filter((it) => it.major_id == value);
        this.model.stuClass = "";
      },
      async bFetch3() {
        const { data } = await this.$http.getClass({
          page: this.currentPage,
          limit: 10000,
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
        this.model = data;
      },
      handleEdit(data) {
        this.editing = true;
        this.model = data;
        this.table = false;
      },
      async fetch() {
        this.loading = true;
        const data = await this.$http.getAllUser1({
          page: this.currentPage,
          limit: this.pageSize,
          data: this.formInline.data,
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
        this.$confirm("是否删除该社团管理员", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$http.deleteUserOrg({
              id: row,
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
          avatar: "",
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
        if (!this.editing) {
          const { data, code } = await this.$http.postUserOrg(this.model);
          this.$message.success("添加成功");
  
          this.table = true;
          this.fetch();
          return;
        }
        if (this.model.nickname === "") {
          return this.$message.info("请输入用户昵称");
        }
        if (this.isEditing && this.model.avatar === "") {
          return this.$message.info("请上传用户头像");
        }
  
        if (!this.isEditing && this.model.username === "") {
          return this.$message.info("请输入用户名");
        }
        this.model.password="";
  
  
        if (type === 1) {
          await this.$http.register(this.model);
        } else {
          const { data } = await this.$http.setUserInfoById(this.model);
  
        }
        this.$message.success("操作成功！");
        this.table = true;
        this.fetch();
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.fetch();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetch();
      },
      getImg(e) {
        this.model.avatar = e;
      },
      async rank(type, index) {
        if (type === 1) {
          if (index === 0) {
            return;
          }
          await this.$store.dispatch("project/setNews", {
            organization_id: this.tableData[index].organization_id,
            sort: this.tableData[index - 1].sort,
          });
          await this.$store.dispatch("project/setNews", {
            organization_id: this.tableData[index - 1].organization_id,
            sort: this.tableData[index].sort,
          });
        } else {
          if (index === this.tableData.length - 1) {
            return;
          }
          await this.$store.dispatch("project/setNews", {
            organization_id: this.tableData[index].organization_id,
            sort: this.tableData[index + 1].sort,
          });
          await this.$store.dispatch("project/setNews", {
            organization_id: this.tableData[index + 1].organization_id,
            sort: this.tableData[index].sort,
          });
        }
        this.$message.success("修改排序成功！");
        this.fetch();
      },
      goTop(organization_id) {
        this.$confirm("是否将其置顶", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$store.dispatch("project/setNews", {
              organization_id,
              sort: this.max + 1,
            });
            this.$message.success("置顶成功！");
            this.fetch();
          })
          .catch(() => {});
      },
      // 全局推送
      pushs(data) {
        this.$confirm("是否确定推送此消息给app?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$store.dispatch("project/pushs", {
              title: data.title,
              fuTitle: data.fuTitle,
            });
            this.$message({
              type: "success",
              message: "推送成功!",
            });
          })
          .catch(() => {});
      },
      async uploading(e) {
        if (e.target.files.length === 0) {
          return;
        }
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const data = await this.$http.upload(formData);
        this.model.avatar = data.filename;
      },
    },
  };
  </script>
  
  <style></style>
  