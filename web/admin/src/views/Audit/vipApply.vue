<template>
    <div class="amazing-wrap" style="width: 1300px">
      <el-alert title="会员申请列表" />
      <el-button
        style="margin: 10px"
        size="mini"
        type="primary"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <br />
      <el-card>
        <div v-show="table" class="table">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="全部">
              <el-button
                @click="
                  formInline = {};
                  fetch();
                "
                >全部</el-button
              >
            </el-form-item>
            <el-form-item label="用户名">
              <el-input
                v-model="formInline.username"
                placeholder="请输入用户名"
                size="mini"
              />
            </el-form-item>
  
            <el-form-item label="所属院系">
              <el-select
                v-model="formInline.department_id"
                placeholder="所属院系"
              >
                <el-option
                  v-for="item in options"
                  :label="item.department_name"
                  :value="item.department_id"
                  :key="item.department_id"
                  >{{ item.department_name }}</el-option
                >
  
              </el-select>
            </el-form-item>
  
            <el-form-item label="所属专业">
              <el-select
                v-model="formInline.major_id"
                placeholder="所属专业"
              >
                <el-option
                  v-for="item in options1"
                  :label="item.major_name"
                  :value="item.major_id"
                  :key="item.major_id"
                  >{{ item.major_name }}</el-option
                >
  
              </el-select>
            </el-form-item> 
  
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table
            v-loading="loading"
            :height="650"
            size="mini"
            stripe
            border
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
          <el-table-column type="selection" width="40px" align="center">
            </el-table-column>
  
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="54px"
            />
            <el-table-column
              label="学院"
              prop="department_name"
              align="center"
              width="100px"
            />
            <el-table-column
              label="专业"
              prop="major_name"
              align="center"
              width="100px"
            />
            <el-table-column
              label="班级"
              prop="class_name"
              align="center"
              width="50px"
            />
            <el-table-column
              label="学号"
              prop="stuId"
              align="center"
              width="100px"
            />
            <el-table-column
              label="用户名"
              prop="username"
              align="center"
              width="100px"
            />
  
            <el-table-column label="手机号" prop="phone" align="center" />
            <el-table-column
              label="性别"
              align="center"
              prop="sex"
              width="100px"
            />
            <el-table-column
              label="用户头像 (点击放大)"
              align="center"
              width="150px"
            >
              <template slot-scope="scope">
                <el-image
                  :src="baseImg + scope.row.avatar"
                  :preview-src-list="[baseImg + scope.row.avatar]"
                  style="width: 40px; height: 40px"
                  fit="cover"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="申请理由"
              align="center"
              prop="reason"
              width="70px"
          
            >
              <template slot-scope="scope" >
                  <el-button
                  size="mini"
                  type=""
                  @click="handleViewReason( scope.row.reason)"
                  >详情</el-button>
              </template>
            </el-table-column>
  
            <el-table-column
              label="审核状态"
              prop="status"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                {{ statusList[scope.row.status] }}
              </template>
            </el-table-column>
  
            <el-table-column align="center" label="申请时间" width="100px">
              <template slot-scope="scope">
                {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="220px">
              <template slot-scope="scope" >
                <el-button
                v-if="scope.row.status == 0"
                  size="mini"
                  type="success"
                  @click="handleAudit(1, scope.row)"
                  >通过</el-button
                >
                <el-button
                v-if="scope.row.status == 0"
                  size="mini"
                  type="danger"
                  @click="handleAudit(2, scope.row)"
                  >拒绝</el-button
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
              :page-sizes="[20, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  
  
  export default {
    components: {
  
    },
    data() {
      return {
        statusList: ["审核中", "审核通过", "审核不通过"],
        tableData: [],
        table: true,
        editing: false,
        currentPage: 1,
        loading: false,
        pageSize: 20,
        total: 0,
        options: [],
        options1:[],
        selected: -1,
        searchText: "",
        // 审核状态 0未审核 1通过 2拒绝
        status: 0,
        model: {
          title: "",
          content: "",
          organization_id: "",
          icon: "",
        },
        baseImg: process.env.VUE_APP_IMG_URL,
        multipleSelection: [],
        formInline: {
          user: "",
          region: "",
        },
      };
    },
    
    async mounted() {
      this.fetch();
      this.bFetch();
      this.bFetch1();
    },
    methods: {
      async bFetch1() {
        const { data } = await this.$http.getMajor();
        this.options1 = data;
      },
      async bFetch() {
        const { data } = await this.$http.getDepartment();
        this.options = data;
      },
      handleSelectionChange(val) {
  
        this.multipleSelection = val;
      },
      async multipleDelete() {
        if (!this.multipleSelection.length) {
          return alert("请选择具体一个删除");
        }
        this.handleDelete(
          this.multipleSelection.map((item) => item.id).join(",")
        );
  
      },
      onSubmit() {
        this.fetch();
      },
      handleViewReason(val){
        console.log(typeof(val));
        if (val == "" || !val && typeof(val)!="undefined" && val!=0) {
          this.$alert("没有填写申请理由","申请理由")
        }else{
          this.$alert(val,"申请理由")
        }
        
      },
      async fetch() {
        this.loading = true;
        const data = await this.$http.gatOrganizationAudit({
          page: this.currentPage,
          limit: this.pageSize,
          status: this.status,
          ...this.formInline,
          organization_id: this.$store.state.user.organizationManager,
        });
        if (data.length === 0 && this.currentPage !== 1) {
          this.currentPage--;
          this.fetch();
        }
        this.tableData = data.data;
        this.total = data.total;
        this.loading = false;
      },
      handleDelete(id) {
        this.$confirm("是否确定删除该会员申请", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$http.deleteUserDepartment({ department_id:id });
            this.$message.success("删除成功！");
            this.fetch();
          })
          .catch(() => {});
      },
      openAdd() {
        this.model = {
          title: "",
          content: "",
          organization_id: "",
          icon: "",
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
        if (this.model.title === "") {
          return this.$message.info("请输入用户名称");
        }
        if (this.model.icon === "") {
          return this.$message.info("请上传用户logo");
        }
        if (this.model.content === "") {
          return this.$message.info("请输入用户介绍");
        }
        if (type === 1) {
          await this.$http.addSquare(this.model);
        } else {
          await this.$http.setSquare(this.model);
        }
        this.$message.success("操作成功！");
        this.table = true;
        this.fetch();
      },
      handleSearchRadio() {
        this.searchText = "";
        this.currentPage = 1;
        this.fetch();
      },
      handleSearchAll() {
        this.currentPage = 1;
        this.selected = -1;
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
        this.model.icon = e;
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
        this.model.icon = data.filename;
      },
      // 审核
      handleAudit(type, value) {
        this.$confirm("是否继续操作", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$http.setOrganizationAuditById({
              ...value,
              status: type,
            });
            this.$message.success("审核成功！");
            this.fetch();
          })
          .catch(() => {});
      },
    },
  };
  </script>
  
  <style></style>
  