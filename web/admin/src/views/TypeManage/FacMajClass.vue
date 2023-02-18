<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有学院列表" />
      <el-button
        style="margin: 10px 10px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加学院" : "返回" }}
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
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学院名称" style="margin: 0 10px">
          <el-input v-model="formInline.data" placeholder="请输入查找的学院名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin: 0 10px" @click="fetch"
            >点击查找</el-button>
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
              align="center"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              label="学院名称"
              prop="department_name"
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
                  @click="handleDelete(scope.row.department_name, scope.row.department_id)"
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
          <el-form-item label="学院名称">
            <el-input
              v-model="model.department_name"
              placeholder="请输入学院名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加学院
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
      selected: -1,
      searchText: "",
      model: {
        department_name: "",
        introduction: "",
        department_id: "",
        icon: "",
        user_id: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      multipleSelection: [],
      btnstatus: 0,
    };
  },
  async mounted() {
    this.bFetch();
    this.fetch();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return alert("请至少选择一个学院");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.department_name).join(", ")
      );
    },
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      //   console.log(data);
      this.options = data;
    },
    async allSelect() {
      const { data } = await this.$http.getDepartment();
    //   console.log(data);
      this.tableData = data;
      this.formInline.data = '';
      this.table = true
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getDepartment({
        data: this.formInline.data,
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.showData = this.tableData.slice(0, this.pageSize)
      this.total = data.total;
      this.loading = false;
    },
    handleDelete(department_name, department_id) {
      this.$confirm("确定删除：" + department_name, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          await this.$http.deleteDepartment({ department_id: department_id });
          this.$message.success("删除成功！");
          this.fetch();
          this.handleCurrentChange()
        })
        .catch(() => {});
    },
    openAdd() {
      this.model = {
        department_name: "",
        introduction: "",
        department_id: "",
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
      if (this.model.department_name === "") {
        return this.$message.info("请输入您要查找的学院名称");
      }
      if (type === 1) {
        await this.$http.addDepartment(this.model);
      } else {
        await this.$http.setDepartment(this.model);
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
  