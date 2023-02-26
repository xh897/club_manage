<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有班级列表" />
      <el-button
        style="margin: 10px 10px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加班级" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px 0"
        size="mini"
        type="primary"
        @click="allSelect"
        >点击刷新</el-button>
      <el-button
        style="margin: 10px 10px"
        size="mini"
        type="danger"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin: 0 10px">
        <el-form-item label="学院或专业名称">
          <el-input
            v-model="formInline.data"
            placeholder="请输入学院或专业名称"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-card style="margin: 0 10px">
        <div v-show="table" class="table">
          <el-table
            v-loading="loading"
            :height="650"
            size="mini"
            stripe
            border
            :data="showData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" align="center">
            </el-table-column>
            <el-table-column
              type="index"
              width="55"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="专业名称"
              prop="major_name"
              align="center"
            />
            <el-table-column
              label="学院名称"
              prop="department_name"
              align="center"
            />
            <el-table-column
              label="班级名称"
              prop="class_name"
              align="center"
            />
            <el-table-column align="center" label="创建时间" width="200px">
              <template slot-scope="scope">
                {{
                  $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss")
                }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              prop="title"
              width="300px"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goEdit(scope.row)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.class_id)"
                  >删除
                </el-button>
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
          <el-form-item label="选择学院">
            <el-select
              v-model="model.faculty"
              placeholder="请选择学院"
              size="mini"

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
              v-model="model.major"
              placeholder="请选择专业"
              size="mini"
            >
              <el-option
                v-for="item in options1"
                :key="item.major_id"
                :label="item.major_name"
                :value="item.major_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-input
              v-model="model.class_name"
              placeholder="请输入班级名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加班级
            </el-button>
            <el-button
              v-else
              size="mini"
              type="success"
              @click="handleConfirm(2)"
              >保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
      showData: [],
      table: true,
      editing: false,
      currentPage: 1,
      loading: false,
      pageSize: 15,
      total: 0,
      options: [],
      options1: [],
      department: "",
      major: "",
      class: "",
      selected: -1,
      searchText: "",
      model: {
        major_name: "",
        class_name: "",
        introduction: "",
        department_id: "",
        icon: "",
        user_id: "",
        faculty: "",
        marjor: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      multipleSelection: [],
    };
  },
  async mounted() {
    this.bFetch();
    this.bFetch1();
    this.fetch();
  },
  // 监听学院、专业变化
  watch: {
    "model.faculty": function (val, oldVal) {
      this.model.major = "";
      this.model.class_name = "";
    },
    "model.major": function (val, oldVal) {
      this.model.class_name = "";
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return alert("请选择具体一个班级");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.class_id).join(",")
      );
    },
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      this.options = data;
    },
    async bFetch1() {
      const { data } = await this.$http.getMajor();
      this.options1 = data;
      
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getClass({
        page: this.currentPage,
        limit: this.pageSize,
        data: this.formInline.data,
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.showData = this.tableData.slice(0, this.pageSize);
      this.total = data.total;
      this.loading = false;
    },
    async allSelect() {
      const { data } = await this.$http.getClass();
      this.tableData = data;
      this.formInline.data = "";
      this.table = true;
    },
    handleDelete(class_id) {
      this.$confirm("是否删除该班级", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteClass({ class_id });
          this.$message.success("删除成功！");
          this.fetch();
        })
        .catch(() => {});
    },
    openAdd() {
      this.model = {
        major_name: "",
        class_name: "",
        introduction: "",
        department_id: "",
        icon: "",
        major: "",
        faculty: "",
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
      if (this.model.class_name === "") {
        return this.$message.info("请输入班级名称");
      }
      if (this.model.faculty === "") {
        return this.$message.info("请输入学院名称");
      }
      if (this.model.major === "") {
        return this.$message.info("请输入专业名称");
      }
      if (type === 1) {
        await this.$http.addClass(this.model);
      } else {
        await this.$http.setClass(this.model);
      }
      this.$message.success("操作成功！");
      this.table = true;
      this.fetch();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.showData = this.tableData.slice(0, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showData = this.tableData.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
  },
};
</script>

<style></style>
